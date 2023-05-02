import Deck from './Deck';
import Seat from './Seat';

export default class Game {
  private actingPlayer: string;
  private deck: Deck | undefined;
  private pot = 0;

  // Doesn't need to be initilized here
  constructor(actingPlayer: string) {
    this.actingPlayer = actingPlayer;
  }

  public startGame(io: any, seats: Seat[]): void {
    this.deck = new Deck();
    const dealtInPlayers = [];

    for (const seat of seats) {
      const player = seat.getPlayer();
      if (player) {
        const cards = this.deck.draw(2);

        player.setHand(cards);
        dealtInPlayers.push({ seat: seat.getSeatNumber() });
      }
    }

    for (const seat of seats) {
      const player = seat.getPlayer();
      if (player) {
        io.to(player.getId()).emit('game_start', player.getHand(), dealtInPlayers);
      }
    }
  }

  public getActingPlayer(): string {
    throw new Error('Method not implemented.');
  }

  public startNextPlayerTurn(): void {
    throw new Error('Method not implemented.');
  }

  public determineWinner(): string {
    throw new Error('Method not implemented.');
  }

  public endGame(): void {
    throw new Error('Method not implemented.');
  }
}
