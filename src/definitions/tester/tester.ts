import { FinishedTestResult, TestResult } from "./test-result";

/**
 * The function type to receive request testing further.
 */
export type NextFunction = (
  definition: unknown,
  testcase: unknown
) => FinishedTestResult;

/**
 * Tests if any given value matches to the given definition.
 */
export interface ValueMatchTester {
  /**
   * Tests if given any value {@link testcase} matches for {@link definition}.
   *
   * @param definition The definition that should be used for the test.
   * @param testcase Any object to be tested.
   * @param next The function to request further tests that this tester does not handle.
   *
   * @returns The result of the test in {@link TestResult}.
   *          If you want the test to run on other tester, return `DeclinedTestResult`
   *          in {@link TestResult}.
   */
  test(definition: unknown, testcase: unknown, next: NextFunction): TestResult;
}
