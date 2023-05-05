import { tableManager } from './TableManager';
import Dealer from './Dealer';

/*
 * This UseCase / Service is responsible or orchestrating the business logic related to
 * a player being ready. For example getting the appropiate table and player associated to the calling player
 * then setting them to ready and checking if the table is ready to start a game.
 *
 * ? Should this then send out the event to the table? (currently the dealer calls this on the table)
 *
 */
export default class PlayerReadyUseCase {
  public execute(tableName: string, playerId: string) {
    const table = tableManager.getTable(tableName);
    const player = table.getPlayer(playerId);

    if (player) {
      player.setReady(true);
    } else {
      throw new Error('player does not exist');
    }

    if (table.isReadyToPlay()) {
      Dealer.startGame(table);
    }
  }
}

const playerReadyUseCase = new PlayerReadyUseCase();

export { playerReadyUseCase };
