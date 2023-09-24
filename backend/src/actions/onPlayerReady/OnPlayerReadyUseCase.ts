import { tableManager } from '../../TableManager';
import Dealer from '../../Dealer';
import { OnPlayerReadyDTO } from './OnPlayerReadyDTO';
import Result, { ResultError, ResultSuccess } from '../../shared/Result';

/*
 * This UseCase / Service is responsible or orchestrating the business logic related to
 * a player being ready. For example getting the appropiate table and player associated to the calling player
 * then setting them to ready and checking if the table is ready to start a game.
 *
 * ? Should this then send out the event to the table? (currently the dealer calls this on the table)
 *
 */
export default class OnPlayerReadyUseCase {
  public execute(OnPlayerReadyDTO: OnPlayerReadyDTO): Result<any> {
    const table = tableManager.getTable(OnPlayerReadyDTO.table);
    const player = table.getPlayer(OnPlayerReadyDTO.socketId);

    if (player) {
      player.setReady(true);
    } else {
      return new ResultError("player doesn't exist");
    }

    if (table.isReadyToPlay()) {
      Dealer.startGame(table);
    }

    return new ResultSuccess({});
  }
}

const onPlayerReadyUseCase = new OnPlayerReadyUseCase();

export { onPlayerReadyUseCase };
