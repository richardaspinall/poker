import { Request, Response } from 'express';

export class GameController {
  static createGame(req: Request, res: Response): void {
    res.send('Hello World!');
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
