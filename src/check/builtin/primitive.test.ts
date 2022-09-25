import { createTesterInvoker } from "../../helper/tests/test-match-tester";
import { FailureTestResult } from "../test-result";
import { primitiveDefinitionTester } from "./primitive";

describe("Primitive tester", function () {
  const invokeTester = createTesterInvoker(primitiveDefinitionTester);

  it("should accept usable primitive types", () => {
    expect(invokeTester("string", "abc").result.result).toBe("success");
    expect(invokeTester("number", 123).result.result).toBe("success");
    expect(invokeTester("bigint", BigInt(456)).result.result).toBe("success");
    expect(invokeTester("symbol", Symbol("abc")).result.result).toBe("success");
  });

  it("should fail on not usable primitive type definition", () => {
    expect(invokeTester("function", "abc").result).toBe({
      result: "failure",
      reason: "The type 'function' cannot be used as a type.",
      definition: "function",
      testcase: "abc",
    });

    expect(invokeTester("object", "abc").result).toBe({
      result: "failure",
      reason: "The type 'object' cannot be used as a type.",
      definition: "object",
      testcase: "abc",
    });

    expect(invokeTester("undefined", "abc").result).toBe({
      result: "failure",
      reason: "The type 'undefined' cannot be used as a type.",
      definition: "undefined",
      testcase: "abc",
    });
  });

  it("should fail on not compatible primitive types", () => {
    expect(invokeTester("string", 123).result).toBe({
      result: "failure",
      reason: "Expected string, received number.",
      definition: "string",
      testcase: 123,
    } as FailureTestResult);

    expect(invokeTester("number", BigInt(456)).result).toBe({
      result: "failure",
      reason: "Expected number, received bigint.",
      definition: "number",
      testcase: BigInt(456),
    } as FailureTestResult);

    expect(invokeTester("bigint", Symbol("abc")).result).toBe({
      result: "failure",
      reason: "Expected string, received number.",
      definition: "bigint",
      testcase: Symbol("abc"),
    } as FailureTestResult);

    expect(invokeTester("symbol", "abc").result).toBe({
      result: "failure",
      reason: "Expected string, received number.",
      definition: "symbol",
      testcase: "abc",
    } as FailureTestResult);
  });
});
