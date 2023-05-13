import { pure, mute } from "../src/index";
import { shouldThrowError } from "./utils"

const outsideScopeValue = 123;

class SemiPureTest {

  value: number = 0;

  constructor(value: number) {
    this.value = value;
  }

  get valueState(): number {
    return this.value;
  }

  @pure timesOutsideScope(x: number): number {
    return outsideScopeValue * x;
  }

  @mute() @pure timesTwo(x: number): number {
    return 2 * x;
  }

  @mute() @pure timesValue(x: number): number {
    return this.value * x;
  }

  @mute() @pure multiplySemiPure(x: number, y: number = this.value): number {
    return this.timesTwo(this.value * x);
  }
}

describe("@pure decorator tests...", () => {

  it("should be pure", () => {
    const test = new SemiPureTest(2)
    expect(test.timesTwo(5)).toBe(10)
  })

  it("should throw getting this.value", () => {
    const test = new SemiPureTest(7)
    expect(shouldThrowError(() => test.timesValue(3))).toBe(true)
  })

  it("should throw using this.value as default parameter", () => {
    const test = new SemiPureTest(8)
    expect(shouldThrowError(() => test.multiplySemiPure(8))).toBe(true)
  })

  it("should throw even when overriding this.value as default parameter", () => {
    const test = new SemiPureTest(8)
    const expression = () => test.multiplySemiPure(1, 2)
    expect(shouldThrowError(expression)).toBe(true)
  })

  it("does not throw using outside scope value", () => {
    const test = new SemiPureTest(8)
    expect(test.timesOutsideScope(9)).toBe(true)
  })

})