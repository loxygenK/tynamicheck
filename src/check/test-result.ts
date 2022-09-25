import { Definition } from "../definitions";

/**
 * Represents that the test was successful, meaning the
 * given {@link Definition} and given value matches.
 */
export type SuccessfulTestResult = {
  result: "success";
};

/**
 * Represents that the test was failure, meaning the
 * given {@link Definition} and given value do not match.
 */
export type FailureTestResult = {
  result: "failure";

  /**
   * The reason why the test was considered as failure.
   */
  reason: string;

  /**
   * (Optional) What {@link Definition} did not match to the {@link testcase}?
   */
  definition?: Definition;

  /**
   * (Optional) What value did not match to the {@link definition} {@link Definition}?
   */
  testcase?: unknown;

  /**
   * (Optional) {@link FailureTestResult} that caused the failure of the test if presents.
   */
  causedBy?: FailureTestResult;
};

/**
 * Represents that the test was not performed in that tester.
 */
export type DeclinedTestResult = {
  result: "declined";
};

/**
 * Represents the finished result of test.
 */
export type FinishedTestResult = SuccessfulTestResult | FailureTestResult;

/**
 * Represents the not finished result of test.
 * The result may be {@link DeclinedTestResult}, meanings the test should be
 * done using other testers if there is.
 */
export type TestResult = FinishedTestResult | DeclinedTestResult;

/**
 * Returns `true` if the {@link result} is {@link SuccessfulTestResult}.
 */
export function isSuccess(
  result: FinishedTestResult
): result is SuccessfulTestResult {
  return result.result === "success";
}

/**
 * Returns the value to represent the test was successful.
 */
export function testSuccess(): SuccessfulTestResult {
  return { result: "success" };
}

/**
 * Returns the value to represent the test was failure.
 *
 * @param reason The reason why the test was considered as failure.
 * @param description Additional context ({@link FailureTestResult}) if it can be given.
 */
export function testFailure(
  reason: string,
  description?: Omit<FailureTestResult, "result" | "reason">
): FailureTestResult {
  return {
    result: "failure",
    reason,
    ...(description ?? {}),
  };
}

/**
 * Returns the value that represents the tester did not perform test with given
 * {@link Definition} and value.
 */
export function declineTest(): DeclinedTestResult {
  return { result: "declined" };
}
