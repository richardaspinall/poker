import { Card } from './Deck';

type Hand = {
  card_one: string;
  card_two: string;
};

export default class Player {
  private name: string;
  private id: string;
  private ready: boolean;
  private hand: Card[] | undefined;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
    this.ready = false;
  }

  public getName(): string {
    throw new Error('Method not implemented.');
  }

  public getId(): string {
    return this.id;
  }

  public setReady(ready: boolean): void {
    this.ready = ready;
  }

  public isReady(): boolean {
    return this.ready;
  }

  public setHand(cards: Card[]): void {
    this.hand = cards;
  }

  public getHand(): Hand {
    if (this.hand) {
      const hand = { card_one: this.hand[0].shortCode, card_two: this.hand[1].shortCode };

      return hand;
    }

    throw new Error('no hand set');
  }

  public check(): void {
    throw new Error('Method not implemented.');
  }

  public fold(): void {
    throw new Error('Method not implemented.');
  }

  public call(): void {
    throw new Error('Method not implemented.');
  }

  public raise(): void {
    throw new Error('Method not implemented.');
  }
}
