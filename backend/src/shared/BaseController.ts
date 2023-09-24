import { Request, Response } from 'express';
import Result from './Result';

export abstract class BaseController {
  protected abstract executeImplementation(req: Request, res: Response): Promise<void | any>;

  public execute(req: Request, res: Response) {
    this.executeImplementation(req, res);
  }

  public ok(res: Response) {
    return res.sendStatus(200);
  }

  public fail(res: Response, errorMessage: string) {
    return res.status(400).json({ error: errorMessage });
  }
}
