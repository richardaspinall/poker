import PlayerReadyUseCase, { playerReadyUseCase } from './PlayerReadyUseCase';

class PlayerReadyController {
  private useCase: PlayerReadyUseCase;

  constructor(useCase: PlayerReadyUseCase) {
    this.useCase = useCase;
  }

  public executeImplementation(tableName: string, socketId: string) {
    const playerId = socketId;

    this.useCase.execute(tableName, playerId);
  }
}

const playerReadyController = new PlayerReadyController(playerReadyUseCase);

export { playerReadyController };
