export interface ResponseErrorBody {
  readonly error: {
    readonly name: string;
    readonly message: string;
    readonly context?: Record<string, any>;
  };
}
