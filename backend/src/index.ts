import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import session, { Session } from 'express-session';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { router } from './routes';

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
app.use(cors());

app.use('/api', router);

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
  cors: { origin: '*' },
});

// Add session info to sockets
io.use((socket, next) => {
  sessionMiddleware(socket.request as Request, {} as Response, next as NextFunction);
});

import { tableManager } from './TableManager';
import Player from './Player';

tableManager.setIoServer(io);

// New client connected
io.on('connection', (socket) => {
  // Send a hello to the client after receiving a hello from it

  socket.emit('foo', 'bar');
  socket.emit('foo', 'bazz');
  socket.on('hello_from_client', () => {
    console.log('hello from client');
    socket.emit('hello_from_server');
  });

  socket.on('create_something', () => {
    console.log('create something');
  });
  //
  // Incoming events
  //
  socket.on('onPlayerView', () => {
    console.log(`player ${socket.id} is viewing table`);

    // Join the table to start receiving events
    socket.join('table-1');
  });

  socket.on('onPlayerSit', (seatNumber) => {
    console.log(`player sits at ${seatNumber}`);

    const player = new Player(socket.id, socket.id);
    const table = tableManager.getTable('table-1');

    table.addPlayer(seatNumber, player);

    // Let the table know that someone has seated
    tableManager.emitToTable('table-1', 'player_sits', { seatNumber: seatNumber });
  });

  socket.on('onPlayerStand', (seatNumber) => {
    console.log(`player stands from ${seatNumber}`);

    // Let the table know that someone has left their seat
    io.to('table-1').emit('player_stands', seatNumber);
  });

  socket.on('onPlayerFold', () => {
    console.log(`${socket.id} folds`);
  });

  socket.on('onPlayerCheck', () => {
    console.log(`${socket.id} checks`);
  });

  socket.on('onPlayerCall', () => {
    console.log(`${socket.id} calls`);
  });

  socket.on('onPlayerRaise', () => {
    console.log(`${socket.id} raises`);
  });
});

httpServer.listen(3000);
