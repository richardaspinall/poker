import { Request, Response } from 'express';
import { BaseController } from '../../shared/BaseController';
import OnPlayerReadyUseCase, { onPlayerReadyUseCase } from './OnPlayerReadyUseCase';
import { OnPlayerReadyDTO } from './OnPlayerReadyDTO';

class OnPlayerReadyController extends BaseController {
  private useCase: OnPlayerReadyUseCase;

  constructor() {
    super();
    this.useCase = onPlayerReadyUseCase;
  }

  public async executeImplementation(req: Request, res: Response): Promise<void | any> {
    const dto: OnPlayerReadyDTO = req.body as OnPlayerReadyDTO;

    const result = this.useCase.execute(dto);

    if (result.ok === true) {
      return this.ok(res);
    }
    return this.fail(res, result.errorMessage);
  }
}

const onPlayerReadyController = new OnPlayerReadyController();

export { onPlayerReadyController };
