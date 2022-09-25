import { DefinedType } from "../../definitions/type";

describe("Array definition", () => {
  it("can generate array type from very simple definition", () => {
    const definition = { $Array: "string" } as const;
    type Defined = DefinedType<typeof definition>;

    const _assert: Defined = ["123", "456"];
  });

  it("can generate array type that contains object", () => {
    const definition = {
      $Array: {
        nested: "string",
        moreArray: {
          $Array: "number",
        },
      },
    } as const;
    type Defined = DefinedType<typeof definition>;

    const _assert: Defined = [
      { nested: "one", moreArray: [123] },
      { nested: "two", moreArray: [456] },
    ];
  });

  it("can generate array type that directly contains array", () => {
    const definition = {
      $Array: {
        $Array: "string",
      },
    } as const;
    type Defined = DefinedType<typeof definition>;

    const _assert: Defined = [
      ["1-1", "1-2", "1-3"],
      ["2-1", "2-2", "2-3"],
      ["3-1", "3-2", "3-3"],
    ];
  });
});
