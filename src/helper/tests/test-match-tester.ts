import {
  FinishedTestResult,
  NextFunction,
  TestResult,
  ValueMatchTester,
} from "../../check";
import { Definition } from "../../definitions/type";

export type TesterInvoker = (
  definition: Definition,
  testcase: unknown,
  mockNextResult?: FinishedTestResult | NextFunction
) => TesterInvokeResult;

export type TesterInvokeResult = {
  result: TestResult;
  mockNextFn: jest.Mock<TestResult, [Definition, unknown]>;
};

export function createTesterInvoker(tester: ValueMatchTester): TesterInvoker {
  return (
    definition: Definition,
    testcase: unknown,
    mockNextResult?: FinishedTestResult | NextFunction
  ) => {
    const mockNextFn = jest.fn(createNextFn(mockNextResult));
    const result = tester.test(definition, testcase, mockNextFn);

    return { result, mockNextFn };
  };
}

function createNextFn(
  mockNextResult: FinishedTestResult | NextFunction | undefined
) {
  if (mockNextResult === undefined) {
    return () => {
      throw new Error("This function should not be called");
    };
  }

  if (typeof mockNextResult === "function") {
    return mockNextResult;
  }

  return () => mockNextResult;
}
