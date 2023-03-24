import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import session, { Session } from 'express-session';
import { createServer } from 'http';
import { Server } from 'socket.io';

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

// Create the socket server

const io = new Server(httpServer, {
  /* options */
});

// Add session info to sockets
io.use((socket, next) => {
  sessionMiddleware(socket.request as Request, {} as Response, next as NextFunction);
});

// New client connected
io.on('connection', (socket) => {
  // ...
  console.log('connected');
});

httpServer.listen(3000);
