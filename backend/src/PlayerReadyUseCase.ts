import { tableManager } from './TableManager';
import Dealer from './Dealer';

export default class PlayerReadyUseCase {
  public execute(io: any, tableName: string, playerId: string) {
    const table = tableManager.getTable(tableName);
    const player = table.getPlayer(playerId);

    if (player) {
      player.setReady(true);
    } else {
      throw new Error('player does not exist');
    }

    if (table.isReadyToPlay()) {
      Dealer.startGame(io, table);
    }
  }
}

const playerReadyUseCase = new PlayerReadyUseCase();

export { playerReadyUseCase };
