import {
  declineTest,
  testFailure,
  TestResult,
  testSuccess,
} from "../../../check/test-result";
import { NextFunction, ValueMatchTester } from "../../../check/tester";
import { pipe } from "../../../check/utils/pipe-result";
import { Definition } from "../../index";

const availableTypes = ["string", "number", "bigint", "symbol"];
const unavailableTypes = ["function", "object", "undefined"];
const handlingTypes = [...availableTypes, ...unavailableTypes];

export const primitiveDefinitionTester: ValueMatchTester = {
  test(
    definition: Definition,
    testcase: unknown,
    _next: NextFunction
  ): TestResult {
    if (typeof definition !== "string") {
      return declineTest();
    }

    if (handlingTypes.indexOf(definition) === -1) {
      return declineTest();
    }

    return pipe(() => testUnavailableTypes(definition))
      .then(() => testCaseMatches(definition, testcase))
      .evaluate();
  },
};

function testUnavailableTypes(definition: Definition): TestResult {
  const unavailableTypeUsed = unavailableTypes.indexOf(definition) !== -1;

  return unavailableTypeUsed
    ? testFailure(`The type '${definition}' cannot be used as a type.`, {
        definition,
      })
    : testSuccess();
}

function testCaseMatches(definition: string, testcase: unknown): TestResult {
  return typeof testcase === definition
    ? testSuccess()
    : testFailure(`Expected ${definition}, received ${typeof testcase}.`, {
        definition,
        testcase,
      });
}
