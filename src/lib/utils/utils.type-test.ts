import { describe } from "~/lib/test-utils/describe"
import type {
  Assert,
  TypeEq,
  ArrayAtLeastN,
  IsUndefined,
  SnakeToCamel,
  TupleN,
  UnionToIntersection,
  UnionToTuple,
} from "~/lib/utils/utils.type"

describe("array-at-least-n", () => {
  type It1 = Assert<
    "basic",
    TypeEq<ArrayAtLeastN<string, 1>, [string, ...string[]]>
  >

  type It2 = Assert<"length is 0", TypeEq<ArrayAtLeastN<string, 0>, string[]>>
})

describe("is-undefined", () => {
  type It1 = Assert<"undefined", TypeEq<IsUndefined<undefined>, true>>
  type It2 = Assert<"other common", TypeEq<IsUndefined<"string">, false>>
  type It3 = Assert<
    "undefined or other common",
    TypeEq<IsUndefined<"string" | undefined>, false>
  >
  type It4 = Assert<"any", TypeEq<IsUndefined<any>, false>>
  type It5 = Assert<"never", TypeEq<IsUndefined<never>, false>>
})

describe("snake-to-camel", () => {
  type It1 = Assert<"basic", TypeEq<SnakeToCamel<"user_name">, "userName">>
  type It2 = Assert<
    "multiple deliminator",
    TypeEq<SnakeToCamel<"user_first_name">, "userFirstName">
  >
})

describe("tuple-n", () => {
  type It1 = Assert<"basic", TypeEq<TupleN<string, 1>, [string]>>
  type It2 = Assert<"length is 0", TypeEq<TupleN<string, 0>, []>>
})

describe("union-to-intersection", () => {
  type It1 = Assert<
    "Convert union type to intersection type",
    TypeEq<
      UnionToIntersection<{ name: string } | { password: string }>,
      { name: string } & { password: string }
    >
  >
})

describe("union-to-tuple", () => {
  type It1 = Assert<
    "basic",
    TypeEq<UnionToTuple<"hello" | "world">, ["hello", "world"]>
  >
  type It2 = Assert<
    "Number of element is 1",
    TypeEq<UnionToTuple<"hello">, ["hello"]>
  >
  type It3 = Assert<"Number of element is 0", TypeEq<UnionToTuple<never>, []>>

  // @ts-expect-error -- 51 elements cannot be applied.(Max count is 50)
  type It4 = UnionToTuple<
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "14"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "27"
    | "28"
    | "29"
    | "30"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44"
    | "44"
    | "46"
    | "47"
    | "48"
    | "49"
    | "50"
  >

  type It5 = UnionToTuple<
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "14"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "27"
    | "28"
    | "29"
    | "30"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44"
    | "44"
    | "46"
    | "47"
    | "48"
    | "49"
  >
})
