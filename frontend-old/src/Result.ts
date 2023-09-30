export default class Result<T> {
  constructor(
    public ok: boolean,
    public isError: boolean,
    public errorMessage: string = '',
    public payload: T | undefined = undefined
  ) {}

  public getPayload(): T {
    if (!this.payload) throw new Error('Payload is undefined');
    return this.payload;
  }
}

export class ResultError<T> extends Result<T> {
  constructor(public errorMessage: string) {
    super(false, true, errorMessage);
  }
}

export class ResultSuccess<T> extends Result<T> {
  constructor(public payload: T) {
    super(true, false, '', payload);
  }
}
