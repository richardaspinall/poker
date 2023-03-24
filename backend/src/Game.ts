import Deck from './Deck';
import Player from './Player';

interface IGame {
  startGame(): void;
  getActingPlayer(): string;
  startNextPlayerTurn(): void;
  determineWinner(): string;
  endGame(): void;
}

export default class Game implements IGame {
  private players: Player[];
  private actingPlayer: string;
  private deck: Deck | undefined;
  private pot = 0;

  constructor(players: Player[]) {
    this.players = players;
    this.actingPlayer = players[0].getId();
  }
  public startGame(): void {
    throw new Error('Method not implemented.');
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
