interface iPlayer {
  getName(): string;
  getId(): string;
  setHand(): void;
  check(): void;
  fold(): void;
  call(): void;
  raise(): void;
}

export default class Player implements iPlayer {
  private name: string;
  private id: string;
  private hand = '';

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  public getName(): string {
    throw new Error('Method not implemented.');
  }

  public getId(): string {
    throw new Error('Method not implemented.');
  }

  public setHand(): void {
    throw new Error('Method not implemented.');
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
