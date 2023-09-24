import { tableManager } from '../../TableManager';
import { OnPlayerSitDTO } from './OnPlayerSitDTO';
import Result, { ResultError, ResultSuccess } from '../../shared/Result';

import Player from '../../Player';

/*
 * This UseCase / Service is responsible or orchestrating the business logic related to
 * a player being ready. For example getting the appropiate table and player associated to the calling player
 * then setting them to ready and checking if the table is ready to start a game.
 *
 * ? Should this then send out the event to the table? (currently the dealer calls this on the table)
 *
 */
export default class OnPlayerSitUseCase {
  public execute(OnPlayerReadyDTO: OnPlayerSitDTO): Result<any> {
    const seatNumber = OnPlayerReadyDTO.selectedSeatNumber;
    const socketId = OnPlayerReadyDTO.socketId;
    console.log(`player sits at ${OnPlayerReadyDTO.selectedSeatNumber}`);

    const player = new Player(socketId, socketId);

    const table = tableManager.getTable('table-1');
    if (!table) {
      return new ResultError("table doesn't exist");
    }

    table.addPlayer(seatNumber, player);

    // Let the table know that someone has seated
    tableManager.emitToTable('table-1', 'player_sits', { seatNumber: seatNumber });
    return new ResultSuccess({});
  }
}

const onPlayerSitUseCase = new OnPlayerSitUseCase();

export { onPlayerSitUseCase };
