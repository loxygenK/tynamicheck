import { Definition } from "../../definitions";
import {
  declineTest,
  testFailure,
  TestResult,
  testSuccess,
} from "../test-result";
import { NextFunction, ValueMatchTester } from "../tester";
import { pipe } from "../utils/pipe-result";

const availableTypes = ["string", "number", "bigint", "symbol"];
const unavailableTypes = ["function", "object", "undefined"];
const handlingTypes = [...availableTypes, ...unavailableTypes];

export const primitiveDefinitionTester: ValueMatchTester = {
  test(
    definition: Definition,
    testcase: unknown,
    _next: NextFunction
  ): TestResult {
    if (handlingTypes.indexOf(definition) === -1) {
      return declineTest();
    }

    if (typeof definition !== "string") {
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
