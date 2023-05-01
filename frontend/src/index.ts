import { io, Socket } from 'socket.io-client';
import { showAvatar } from './animation/showAvatar';
import { removeAvatar } from './animation/removeAvatar';
import { ServerToClientEvents, ClientToServerEvents } from '../../backend/src/shared/WebSocketEvents';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

// Send a hello to the server
socket.emit('hello_from_client');

socket.on('hello_from_server', () => {
  console.log('hello from server');
});

// TODO: Hardcoded for now
// Will remove once we have a table and seat concept on the backend
let seatNumber: string;

//
// Add a click event listener to each seat element to enable players to take a seat
//
document.querySelectorAll('.seat').forEach((seat) => {
  seat.addEventListener('click', function (this: Element) {
    if (seatNumber) {
      return alert('Already seated');
    }

    const selectedSeatNumber = this.id;

    // Set seatNumber
    seatNumber = selectedSeatNumber;

    // Send event to server that the player has taken a seat
    socket.emit('player_sits', selectedSeatNumber);
  });
});

// Add button event listeners for each action
document.getElementById('leave-table-button')?.addEventListener('click', function () {
  socket.emit('player_stands', seatNumber);
});

document.getElementById('im-ready-button')?.addEventListener('click', function () {
  socket.emit('player_ready');
});

document.getElementById('fold-action-button')?.addEventListener('click', function () {
  socket.emit('player_folds');
});

document.getElementById('check-action-button')?.addEventListener('click', function () {
  socket.emit('player_checks');
});

document.getElementById('call-action-button')?.addEventListener('click', function () {
  socket.emit('player_calls');
});

document.getElementById('raise-action-button')?.addEventListener('click', function () {
  socket.emit('player_raises');
});

//
// Incoming events
//
socket.on('player_sits', (seatNumber) => {
  showAvatar(seatNumber);
});

socket.on('player_stands', (seatNumber) => {
  removeAvatar(seatNumber);
});

socket.on('player_folds', (seatNumber) => {
  console.log(`${seatNumber} folds`);
});

socket.on('player_checks', (seatNumber) => {
  console.log(`${seatNumber} folds`);
});

socket.on('player_calls', (seatNumber) => {
  console.log(`${seatNumber} calls`);
});

socket.on('player_raises', (seatNumber) => {
  console.log(`${seatNumber} raises`);
});

// Send upon viewing the table (opening the page)
socket.emit('player_viewing');
