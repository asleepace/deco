import { tryCatch } from "../src";

class Test {

  @tryCatch static staticThrownError() {
    throw new Error("This is an error")
  }

  @tryCatch static staticDoesNotThrowError() {
    return 123
  }

  @tryCatch throwsError() {
    throw new Error("This is an error")
  }

  @tryCatch doesNotThrowError() {
    return 123
  }
}

describe("@tryCatch decorator tests...", () => {

  it("should catch static thrown error", () => {
    expect(Test.staticThrownError()).toBe(undefined)
  })

  it("should not catch static does not throw error", () => {
    expect(Test.staticDoesNotThrowError()).toBe(123)
  })

  it("should catch thrown error", () => {
    const test = new Test()
    expect(test.throwsError()).toBe(undefined)
  })

  it("should not catch does not throw error", () => {
    const test = new Test()
    expect(test.doesNotThrowError()).toBe(123)
  })

})