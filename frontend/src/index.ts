import { io, Socket } from 'socket.io-client';
import FetchFasade from './FetchFasade';
import { showAvatar } from './animation/showAvatar';
import { removeAvatar } from './animation/removeAvatar';
import { dealCards } from './animation/dealCards';
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
    socket.emit('onPlayerSit', selectedSeatNumber);
  });
});

// Add button event listeners for each action
document.getElementById('leave-table-button')?.addEventListener('click', function () {
  socket.emit('onPlayerStand', seatNumber);
});

async function playerReady(table: string, socketId: any): Promise<void> {
  const payload = { table, socketId };
  const result = await FetchFasade.post('/api/playerReady', payload);
  if (result.ok) {
    console.log(result.getPayload());
  } else {
    console.log('error', result.errorMessage);
  }
}

document.getElementById('im-ready-button')?.addEventListener('click', () => {
  // socket.emit('onPlayerReady', 'table-1');
  playerReady('table-1', socket.id); // Don't await it here
});

document.getElementById('fold-action-button')?.addEventListener('click', function () {
  socket.emit('onPlayerFold');
});

document.getElementById('check-action-button')?.addEventListener('click', function () {
  socket.emit('onPlayerCheck');
});

document.getElementById('call-action-button')?.addEventListener('click', function () {
  socket.emit('onPlayerCall');
});

document.getElementById('raise-action-button')?.addEventListener('click', function () {
  socket.emit('onPlayerRaise');
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

socket.on('game_start', (holeCards, dealtInPlayers) => {
  console.log(seatNumber);
  console.log(holeCards);
  console.log(dealtInPlayers);
  dealCards(seatNumber, holeCards, dealtInPlayers);
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
socket.emit('onPlayerView');
