import { expectType } from "tsd"
import { typedRange } from "~/typed-range"

describe("typedRange", () => {
  it("0ããN", () => {
    const arr = typedRange(0, 3)
    expect(arr).toStrictEqual([0, 1, 2])
    expectType<[0, 1, 2]>(arr)
  })

  it("NããM", () => {
    const arr = typedRange(2, 5)
    expect(arr).toStrictEqual([2, 3, 4])
    expectType<[2, 3, 4]>(arr)
  })
})
