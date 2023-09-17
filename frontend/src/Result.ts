export type Payload = {
  name: string;
  age: number;
};

export default class Result {
  constructor(
    public ok: boolean,
    public isError: boolean,
    public errorMessage: string = '',
    public payload: Payload | undefined = undefined
  ) {}

  public getPayload(): Payload {
    if (!this.payload) throw new Error('Payload is undefined');
    return this.payload;
  }
}

export class ResultError extends Result {
  constructor(public errorMessage: string) {
    super(false, true, errorMessage);
  }
}

export class ResultSuccess extends Result {
  constructor(public payload: Payload) {
    super(true, false, '', payload);
  }
}
