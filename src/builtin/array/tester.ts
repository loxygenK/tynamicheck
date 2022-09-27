import {
  declineTest,
  FailureTestResult,
  isSuccess,
  testFailure,
  TestResult,
  testSuccess,
} from "../../definitions/tester/test-result";
import {
  NextFunction,
  ValueMatchTester,
} from "../../definitions/tester/tester";
import { findMap } from "../../helper/iters/findMap";
import { Definition } from "../../integrator/type";
import { getFromObject } from "../../utils/get-from-object";

export const arrayDefinitionTester: ValueMatchTester = {
  test(
    definition: Definition,
    testcase: unknown,
    next: NextFunction
  ): TestResult {
    const arrayDef = getFromObject<Definition>(definition, "$array");
    if (arrayDef === undefined) {
      return declineTest();
    }

    if (!Array.isArray(testcase)) {
      return testFailure("The given value was not an array.", {
        definition,
        testcase,
      });
    }

    const failure: [FailureTestResult, number] | undefined = findMap(
      testcase,
      (element, index) => {
        const result = next(arrayDef, element);
        return isSuccess(result) ? undefined : [result, index];
      }
    );

    if (failure !== undefined) {
      const [causedBy, index] = failure;
      return testFailure(`The type of element ${index} was not correct.`, {
        definition,
        testcase,
        causedBy,
      });
    }

    return testSuccess();
  },
};
