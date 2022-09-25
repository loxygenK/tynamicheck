import {
  FinishedTestResult,
  NextFunction,
  TestResult,
  ValueMatchTester,
} from "../../check";
import { Definition } from "../../definitions";

export type TesterInvoker = (
  definition: Definition,
  testcase: unknown,
  mockNextResult: FinishedTestResult | NextFunction
) => TesterInvokeResult;

export type TesterInvokeResult = {
  result: TestResult;
  mockNextFn: jest.Mock<TestResult, [Definition, unknown]>;
};

export function createTesterInvoker(tester: ValueMatchTester): TesterInvoker {
  return (
    definition: Definition,
    testcase: unknown,
    mockNextResult: FinishedTestResult | NextFunction
  ) => {
    const mockNextFn = jest.fn(
      typeof mockNextResult === "function"
        ? mockNextResult
        : () => mockNextResult
    );
    const result = tester.test(definition, testcase, mockNextFn);

    return { result, mockNextFn };
  };
}
