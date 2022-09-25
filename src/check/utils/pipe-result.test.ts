import { FailureTestResult, testFailure, testSuccess } from "../test-result";
import { pipe } from "./pipe-result";

describe("Pipe result", () => {
  it("should evaluate functions in order", () => {
    const mock1 = jest.fn(testSuccess);
    const mock2 = jest.fn(testSuccess);
    const mock3 = jest.fn(testSuccess);

    const result = pipe(mock1).then(mock2).then(mock3).evaluate();

    expect(result.result).toBe("success");

    [mock1, mock2, mock3].forEach((mock) => expect(mock).toBeCalledTimes(1));
    expect(mock2).toHaveBeenCalledAfter(mock1);
    expect(mock3).toHaveBeenCalledAfter(mock2);
  });

  it("should suspend evaluating until evaluation function is called", () => {
    const mock = jest.fn(testSuccess);

    const piped = pipe(mock);
    expect(mock).not.toHaveBeenCalled();

    const result = piped.evaluate();
    expect(mock).toBeCalledTimes(1);

    expect(result.result).toBe("success");
  });

  it("should abort evaluating if there is a failure, and return it", () => {
    const mock1 = jest.fn(testSuccess);
    const mock2 = jest.fn(() => testFailure("Fail"));
    const mock3 = jest.fn(testSuccess);

    const result = pipe(mock1).then(mock2).then(mock3).evaluate();

    expect(result).toStrictEqual({
      result: "failure",
      reason: "Fail",
    } as FailureTestResult);
    expect(mock1).toBeCalledTimes(1);
    expect(mock2).toBeCalledTimes(1);
    expect(mock3).not.toBeCalled();
  });
});
