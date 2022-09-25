import { Definition } from "../../definitions";
import { findMap } from "../../helper/iters/findMap";
import {
  declineTest,
  FailureTestResult,
  FinishedTestResult,
  isSuccess,
  testFailure,
  TestResult,
  testSuccess,
} from "../test-result";
import { NextFunction, ValueMatchTester } from "../tester";
import { getFromObject } from "../utils/get-from-object";
import { pipe } from "../utils/pipe-result";

export const objectDefinitionTester: ValueMatchTester = {
  test(
    definition: Definition,
    testcase: unknown,
    next: NextFunction
  ): TestResult {
    if (typeof definition !== "object") {
      return declineTest();
    }

    if (typeof testcase !== "object") {
      return testFailure(`Expected object, received ${typeof testcase}.`, {
        definition,
        testcase,
      });
    }

    if (testcase === null) {
      return testFailure("Expected object, received null.", {
        definition,
        testcase,
      });
    }

    return pipe(() => testFieldSufficiency(definition, testcase))
      .then(() => testEachFields(definition, testcase, next))
      .evaluate();
  },
};

function testFieldSufficiency(
  definition: object,
  testcase: object
): FinishedTestResult {
  const expectedKeys = Object.keys(definition);
  const actualKeys = Object.keys(testcase);

  const missing = expectedKeys.filter((key) => actualKeys.indexOf(key) == -1);

  if (missing.length === 0) {
    return testSuccess();
  }

  return testFailure(
    `The following field is missing from the value: ${missing.join(", ")}`,
    { definition, testcase }
  );
}

function testEachFields(
  definition: object,
  testcase: object,
  next: NextFunction
): FinishedTestResult {
  const failure: [FailureTestResult, string] | undefined = findMap(
    Object.entries(definition),
    ([key, childDef]) => {
      const childVal = getFromObject<unknown>(testcase, key);
      if (childVal === undefined) {
        throw new Error("Should be checked in the previous check");
      }

      const result = next(childDef, childVal);
      return isSuccess(result) ? undefined : [result, key];
    }
  );

  if (failure === undefined) {
    return testSuccess();
  }

  const [causedBy, key] = failure;
  return testFailure(`Field '${key}' is incompatible with the definition.`, {
    definition,
    testcase,
    causedBy,
  });
}
