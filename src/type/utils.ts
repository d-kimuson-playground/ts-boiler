export type IsAny<T> = boolean extends (T extends never ? true : false)
  ? true
  : false
export type IsNever<T> = T[] extends never[] ? true : false

export type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false

/**
 * @desc Type testing with a set of TypeEq.
 * @example Assert<TypeEq<string, string>>  // valid
 * @example Assert<TypeEq<string, number>>  // invalid (error)
 */
export type Assert<T extends true> = T
