import {
  FinishedTestResult,
  NextFunction,
  TestResult,
  ValueMatchTester,
} from "../../definitions";

export type TesterInvoker = (
  definition: unknown,
  testcase: unknown,
  mockNextResult?: FinishedTestResult | NextFunction
) => TesterInvokeResult;

export type TesterInvokeResult = {
  result: TestResult;
  mockNextFn: jest.Mock<TestResult, [unknown, unknown]>;
};

export function createTesterInvoker(tester: ValueMatchTester): TesterInvoker {
  return (
    definition: unknown,
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
