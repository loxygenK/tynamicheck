import {
  FinishedTestResult,
  isSuccess,
  testFailure,
  ValueMatchTester,
} from "../definitions";
import { findMap } from "../helper/iters/findMap";
import { DefinedType } from "./type";

export function isStructureMatch<D, T extends Array<unknown>>(
  definition: D,
  testcase: unknown,
  testers: Array<ValueMatchTester>
): testcase is DefinedType<D, T> {
  return isSuccess(testStructureMatch(definition, testcase, testers));
}

export function testStructureMatch<D>(
  definition: D,
  testcase: unknown,
  testers: Array<ValueMatchTester>
): FinishedTestResult {
  const finalResult = findMap(testers, (tester) => {
    const testResult = tester.test(
      definition,
      testcase,
      (definition, testcase) =>
        testStructureMatch(definition, testcase, testers)
    );

    return testResult.result === "declined" ? undefined : testResult;
  });

  if (finalResult === undefined) {
    return testFailure("No definition matched to the testcase.", {
      definition,
      testcase,
    });
  }

  return finalResult;
}
