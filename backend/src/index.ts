import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import session, { Session } from 'express-session';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { ServerToClientEvents, ClientToServerEvents } from './shared/WebSocketEvents';

declare module 'http' {
  interface IncomingMessage {
    session: Session & {
      authenticated: boolean;
      playerId: string;
    };
  }
}

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../frontend/public')));

const sessionMiddleware = session({
  secret: 'changeit',
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

// Authenticate the session (just hit /login)
app.post('/login', (req, res) => {
  req.session.authenticated = true;
  res.redirect('/');
});

// Create the socket server with the event types for typing
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  /* options */
});

// Add session info to sockets
io.use((socket, next) => {
  sessionMiddleware(socket.request as Request, {} as Response, next as NextFunction);
});

// Create a table
import TableManager from './TableManager';
const tableManager = new TableManager();
tableManager.createTable('table-1', 2);

import Player from './Player';
import Game from './Game';
import Dealer from './Dealer';

// New client connected
io.on('connection', (socket) => {
  // Send a hello to the client after receiving a hello from it
  socket.on('hello_from_client', () => {
    console.log('hello from client');
    socket.emit('hello_from_server');
  });

  //
  // Incoming events
  //
  socket.on('player_viewing', () => {
    console.log(`player ${socket.id} is viewing table`);

    // Join the table to start receiving events
    socket.join('table-1');
  });

  socket.on('player_sits', (seatNumber) => {
    console.log(`player sits at ${seatNumber}`);

    const player = new Player(socket.id, socket.id);
    const table = tableManager.getTable('table-1');

    table.addPlayer(seatNumber, player);

    // Let the table know that someone has seated
    io.to('table-1').emit('player_sits', seatNumber);
  });

  socket.on('player_stands', (seatNumber) => {
    console.log(`player stands from ${seatNumber}`);

    // Let the table know that someone has left their seat
    io.to('table-1').emit('player_stands', seatNumber);
  });

  socket.on('player_ready', (tableName) => {
    const table = tableManager.getTable(tableName);
    const player = table.getPlayer(socket.id);

    if (player) {
      player.setReady(true);
    }

    // Start game if 2 or more people are ready to play
    // Should be on a pub sub / internal event emitter
    if (table.isReadyToPlay()) {
      Dealer.startGame(io, table);
    }
  });

  socket.on('player_folds', () => {
    console.log(`${socket.id} folds`);
  });

  socket.on('player_checks', () => {
    console.log(`${socket.id} checks`);
  });

  socket.on('player_calls', () => {
    console.log(`${socket.id} calls`);
  });

  socket.on('player_raises', () => {
    console.log(`${socket.id} raises`);
  });
});

httpServer.listen(3000);
