export interface Mapper<Input, Output> {
  map(payload: Input): Output;
}
