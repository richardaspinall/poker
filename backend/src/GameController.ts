import { Request, Response } from 'express';
import { playerReadyController } from './PlayerReadyController';

export class GameController {
  static createGame(req: Request, res: Response): void {
    res.send('Hello World!');
  }

  static playerReady(req: Request, res: Response): void {
    console.log(req.body);
    playerReadyController.executeImplementation(req.body.table, req.body.socketId);
    res.send(JSON.stringify({ name: 'Richard', age: 37 }));

    //res.status(400).send('Bad Request');
  }

  static playerSit(req: Request, res: Response): void {
    res.send('Hello World!');
  }

  static playerStand(req: Request, res: Response): void {
    res.send('Hello World!');
  }

  static playerFold(req: Request, res: Response): void {
    res.send('Hello World!');
  }

  static playerCheck(req: Request, res: Response): void {
    res.send('Hello World!');
  }
  static playerCall(req: Request, res: Response): void {
    res.send('Hello World!');
  }

  static playerRaise(req: Request, res: Response): void {
    res.send('Hello World!');
  }
}
