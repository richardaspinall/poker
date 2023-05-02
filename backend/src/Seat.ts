import Player from './Player';

export default class Seat {
  private seatNumber: string;
  private player?: Player;

  constructor(seatNumber: string) {
    this.seatNumber = seatNumber;
  }

  getSeatNumber(): string {
    return this.seatNumber;
  }

  addPlayer(player: Player) {
    this.player = player;
  }

  getPlayer(): Player | undefined {
    return this.player;
  }
}
