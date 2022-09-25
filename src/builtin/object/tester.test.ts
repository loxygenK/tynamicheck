import { FailureTestResult, testFailure, testSuccess } from "../../../check";
import { createTesterInvoker } from "../../helper/tests/test-match-tester";
import { objectDefinitionTester } from "./tester";

describe("Object match tester", () => {
  const invokeTester = createTesterInvoker(objectDefinitionTester);

  it("should accept empty object for empty definition", () => {
    const { result, mockNextFn } = invokeTester({}, {});

    expect(result.result).toBe("success");
    expect(mockNextFn).not.toBeCalled();
  });

  it("should accept if tests for fields succeed", () => {
    const { result, mockNextFn } = invokeTester(
      { one: "string", two: "number" },
      { one: "abc", two: 123 },
      testSuccess()
    );

    expect(result.result).toBe("success");
    expect(mockNextFn).toBeCalledTimes(2);
  });

  it("should fail if the given value is not object but the definition is", () => {
    const definition = { forObject: "string" };
    const testcase = "not-object";

    const { result, mockNextFn } = invokeTester(definition, testcase);

    expect(result).toStrictEqual({
      result: "failure",
      reason: "Expected object, received string.",
      definition,
      testcase,
    } as FailureTestResult);
    expect(mockNextFn).not.toBeCalled();
  });

  it("should fall on null value", () => {
    const definition = { forObject: "string" };
    const testcase = null;

    const { result, mockNextFn } = invokeTester(definition, testcase);

    expect(result).toStrictEqual({
      result: "failure",
      reason: "Expected object, received null.",
      definition,
      testcase,
    } as FailureTestResult);
    expect(mockNextFn).not.toBeCalled();
  });

  it("should fail if the given value does not have fields which is required by the definition", () => {
    const definition = { a: "string", b: "string", c: "string" };
    const testcase = { a: "value" };

    const { result, mockNextFn } = invokeTester(definition, testcase);

    expect(result).toStrictEqual({
      result: "failure",
      reason: "The following field is missing from the value: b, c",
      definition,
      testcase,
    } as FailureTestResult);
    expect(mockNextFn).not.toBeCalled();
  });

  it("should fail with causedBy if tests for fields failed", () => {
    const definition = { a: "string", b: "string" };
    const testcase = { a: "value", b: "value" };

    const { result, mockNextFn } = invokeTester(
      definition,
      testcase,
      (definition, testcase) => testFailure("Nested", { definition, testcase })
    );

    expect(result).toStrictEqual({
      result: "failure",
      reason: "Field 'a' is incompatible with the definition.",
      definition,
      testcase,
      causedBy: {
        result: "failure",
        reason: "Nested",
        definition: "string",
        testcase: "value",
      },
    } as FailureTestResult);
    expect(mockNextFn).toBeCalledTimes(1);
  });

  it("should decline if the definition is not for object", () => {
    const { result, mockNextFn } = invokeTester("string", {});

    expect(result.result).toBe("declined");
    expect(mockNextFn).not.toBeCalled();
  });
});
