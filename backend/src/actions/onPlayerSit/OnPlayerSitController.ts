import { Request, Response } from 'express';
import { BaseController } from '../../shared/BaseController';
import OnPlayerSitUseCase, { onPlayerSitUseCase } from './OnPlayerSitUseCase';
import { OnPlayerSitDTO } from './OnPlayerSitDTO';

class OnPlayerSitController extends BaseController {
  private useCase: OnPlayerSitUseCase;

  constructor() {
    super();
    this.useCase = onPlayerSitUseCase;
  }

  public async executeImplementation(req: Request, res: Response): Promise<void | any> {
    const dto: OnPlayerSitDTO = req.body as OnPlayerSitDTO;
    console.log('test:', dto);
    const result = this.useCase.execute(dto);

    if (result.ok === true) {
      return this.ok(res);
    }
    return this.fail(res, result.errorMessage);
  }
}

const onPlayerSitController = new OnPlayerSitController();

export { onPlayerSitController };
