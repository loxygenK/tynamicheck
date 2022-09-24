import { someFantasticLibrary } from "./index";

describe("Test environment", () => {
  it("is working", () => {
    expect(someFantasticLibrary()).toBe("123");
  });
});
