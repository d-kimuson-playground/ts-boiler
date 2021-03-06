import type { Assert, TypeEq } from "~/type/utils.type"
import type { Range } from "~/typed-range"

export type It1 = Assert<"0ããN", TypeEq<Range<0, 3>, [0, 1, 2]>>
export type It2 = Assert<"NããM", TypeEq<Range<3, 5>, [3, 4]>>
