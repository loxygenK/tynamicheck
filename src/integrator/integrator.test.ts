import { builtinTesters } from "../builtin";
import { FailureTestResult } from "../definitions";
import { isStructureMatch, testStructureMatch } from "./tester";
import { DefinedType } from "./type";

const definition = {
  id: "number",
  name: "string",
  follower: {
    $array: "number",
  },
  profile: {
    bio: "string",
    externalLink: {
      $array: "string",
    },
  },
} as const;
type Defined = DefinedType<typeof definition>;

const value: Defined = {
  id: 123456,
  name: "Somewho",
  follower: [100, 200, 300],
  profile: {
    bio: "123",
    externalLink: ["https://example.com"],
  },
};

describe("Integrator", () => {
  it("should handle multiple definitions", () => {
    const result = testStructureMatch(definition, value, builtinTesters);
    expect(result).toStrictEqual({
      result: "success",
    });
  });

  it("should type-guard argument if the structure matches", () => {
    const uncheckedValue = value as unknown;
    if (!isStructureMatch(definition, uncheckedValue, builtinTesters)) {
      throw new Error("'isStructureMatch' should return true here");
    }

    const _checkedValue: Defined = uncheckedValue;
  });

  it("should fail if the value does not match to the definition", () => {
    const notMatchingValue = {
      id: 123456,
      name: "Somewho",
      follower: [],
      profile: {
        bio: "Hello",
        externalLink: [
          // Should be string, but is number
          123,
        ],
      },
    };

    const result = testStructureMatch(
      definition,
      notMatchingValue,
      builtinTesters
    );
    expect(result).toStrictEqual({
      result: "failure",
      reason: "Field 'profile' is incompatible with the definition.",
      definition,
      testcase: notMatchingValue,
      causedBy: {
        result: "failure",
        reason: "Field 'externalLink' is incompatible with the definition.",
        definition: definition.profile,
        testcase: notMatchingValue.profile,
        causedBy: {
          result: "failure",
          reason: "The type of element 0 was not correct.",
          definition: definition.profile.externalLink,
          testcase: notMatchingValue.profile.externalLink,
          causedBy: {
            result: "failure",
            reason: "Expected string, received number.",
            definition: definition.profile.externalLink.$array,
            testcase: notMatchingValue.profile.externalLink[0],
          },
        },
      },
    } as FailureTestResult);
  });

  it("should fail if no compatible definition found", () => {
    const invalidDefinition = 123456;

    const result = testStructureMatch(
      invalidDefinition,
      123456,
      builtinTesters
    );
    expect(result).toStrictEqual({
      result: "failure",
      reason: "No definition matched to the definition.",
      definition: invalidDefinition,
      testcase: 123456,
    });
  });
});
