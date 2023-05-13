import { pure, mute } from "../src/index";

class SemiPureTest {

  value: number = 0;

  constructor(value: number) {
    this.value = value;
  }

  get valueState(): number {
    return this.value;
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

  it("should throw: getting value no side effects", () => {
    const test = new SemiPureTest(7)
    expect(test.timesValue(3)).toThrowError()
  })

  it("should throw: internal state as default param", () => {
    const test = new SemiPureTest(8)
    expect(test.multiplySemiPure(8)).toBe(64)
  })

})