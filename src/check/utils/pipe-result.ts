import { FinishedTestResult, isSuccess } from "../test-result";

export type PipableFunction = (...args: Array<unknown>) => FinishedTestResult;

export function pipe<F extends PipableFunction>(fn: F) {
  return new Pipe(fn);
}

export class Pipe<
  F extends PipableFunction,
  P extends PipableFunction = never
> {
  readonly fn: F;
  readonly parent?: Pipe<P>;

  constructor(fn: F, parent?: Pipe<P>) {
    this.fn = fn;
    this.parent = parent;
  }

  then<NF extends PipableFunction>(fn: NF): Pipe<NF> {
    return new Pipe<NF, F>(fn, this);
  }

  evaluate(): FinishedTestResult {
    if (this.parent !== undefined) {
      const previous = this.parent.evaluate();
      if (!isSuccess(previous)) {
        return previous;
      }
    }

    return this.fn();
  }
}
