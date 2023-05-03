import Game from './Game';
import Table from './Table';
import Deck from './Deck';
import { tableManager } from './TableManager';

export default class Dealer {
  public static startGame(table: Table): void {
    const deck = new Deck();

    const game = new Game(deck);

    table.setGame(game);

    // Deal cards to players
    const dealtInPlayers = [];
    for (const seat of table.getSeats()) {
      const player = seat.getPlayer();
      if (player) {
        const cards = deck.draw(2);

        player.setHand(cards);
        dealtInPlayers.push({ seat: seat.getSeatNumber() });
      }
    }

    // Send to client
    for (const seat of table.getSeats()) {
      const player = seat.getPlayer();
      if (player) {
        // io.to(player.getId()).emit('game_start', player.getHand(), dealtInPlayers);
        tableManager.emitToUser(player.getId(), 'game_start', {
          hand: player.getHand(),
          dealtInPlayers: dealtInPlayers,
        });
      }
    }
  }
}
