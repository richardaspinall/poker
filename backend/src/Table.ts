import Seat from './Seat';
import Player from './Player';
import Game from './Game';

export default class Table {
  private name: string;
  private seats: Seat[];
  private game: Game | undefined;
  private dealerButton: string | undefined;

  public constructor(tableName: string, numSeats: number) {
    this.name = tableName;
    this.seats = [];
    for (let seatNumber = 1; seatNumber <= numSeats; seatNumber++) {
      this.seats.push(new Seat(`seat-${seatNumber}`));
    }
  }

  public getName() {
    return this.name;
  }

  public getSeats(): Seat[] {
    return this.seats;
  }

  public getPlayer(socketId: string) {
    const seat = this.seats.find((seat) => seat.getPlayer()?.getId() === socketId);

    if (!seat) {
      throw new Error(`player not found`);
    }
    return seat?.getPlayer();
  }

  public addPlayer(seatNumber: string, player: Player) {
    for (const seat of this.seats) {
      if (seat.getSeatNumber() == seatNumber) {
        seat.addPlayer(player);
      }
    }
  }

  public setGame(game: Game) {
    this.game = game;
  }

  public setDealerButton(dealerButton: string) {
    this.dealerButton = dealerButton;
  }

  public isReadyToPlay(): boolean {
    const seats = this.getSeats();
    let countOfReadyPlayers = 0;
    for (const seat of seats) {
      if (seat.getPlayer()?.isReady()) {
        countOfReadyPlayers += 1;
      }
    }

    if (countOfReadyPlayers >= 2) {
      return true;
    }

    return false;
  }
}
