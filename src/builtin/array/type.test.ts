import { ArrayDefinitionToType } from "./type";

describe("Array definition", () => {
  it("can generate array type from very simple definition", () => {
    const definition = { $array: "string" } as const;
    type Defined = ArrayDefinitionToType<typeof definition>;

    const _assert: Defined = ["123", "456"];
  });

  it("can generate array type that contains object", () => {
    const definition = {
      $array: {
        nested: "string",
        moreArray: {
          $array: "number",
        },
      },
    } as const;
    type Defined = ArrayDefinitionToType<typeof definition>;

    const _assert: Defined = [
      { nested: "one", moreArray: [123] },
      { nested: "two", moreArray: [456] },
    ];
  });

  it("can generate array type that directly contains array", () => {
    const definition = {
      $array: {
        $array: "string",
      },
    } as const;
    type Defined = ArrayDefinitionToType<typeof definition>;

    const _assert: Defined = [
      ["1-1", "1-2", "1-3"],
      ["2-1", "2-2", "2-3"],
      ["3-1", "3-2", "3-3"],
    ];
  });
});
