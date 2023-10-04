import { socket } from '../socket';

// https://socket.io/how-to/use-with-react
export function ConnectionManager() {
  function connect() {
    socket.connect();
    socket.emit('onPlayerView');
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}
