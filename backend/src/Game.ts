import Deck from './Deck';

export default class Game {
  private deck: Deck;
  private actingPlayer: string | undefined;
  private pot = 0;

  constructor(deck: Deck) {
    this.deck = deck;
  }

  public setDeck(deck: Deck) {
    this.deck = deck;
  }

  public getDeck(): Deck | undefined {
    return this.deck;
  }

  public setActingPlayer(actingPlayer: string) {
    this.actingPlayer = actingPlayer;
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
