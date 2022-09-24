import { hoge } from "./hoge/fuga";
import { veryCompilacated } from "./main"

/**
 * Returns '123' in string. What an fantastic libaray?
 *
 * @returns '123' in string.
 */
export function someFantasticLibrary(): string {
  // Returns text

  if(veryCompilacated() === 100) {
    return hoge().toString();
  } else {
    throw new Error("Calculation failed");
  }
}
