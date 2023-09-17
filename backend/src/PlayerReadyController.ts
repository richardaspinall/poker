import PlayerReadyUseCase, { playerReadyUseCase } from './PlayerReadyUseCase';

class PlayerReadyController {
  private useCase: PlayerReadyUseCase;

  constructor(useCase: PlayerReadyUseCase) {
    this.useCase = useCase;
  }

  /*
   * This controller main function should take in the request (websocket or http) and sanitize it
   * (in terms of taking it off the request or arguments) then execute the appropriate service
   *
   * This should actually be called "PlayerReadyHandler" and there should be an "eventcontroller".
   *
   * >>>>> Like this the most
   * Or it could be a function on the GameService "handlePlayerReadyEvent" which then invokes the
   * appropriate functions on the Game and other objects
   *
   * Then it should respond to the client (callback or response) with confirmation or error. For example
   * if this was the RaiseController, it would error if the raise was not at least double
   * See:
   * - Domain Driven Design: Layered Architecture / Chapter 4 / Page 71-73
   * - https://chat.openai.com/c/ad357ac4-f555-4597-9108-4263562081a9
   *
   */
  public executeImplementation(tableName: string, socketId: string) {
    const playerId = socketId;
    console.log(socketId);
    this.useCase.execute(tableName, playerId);
  }
}

const playerReadyController = new PlayerReadyController(playerReadyUseCase);

export { playerReadyController };
