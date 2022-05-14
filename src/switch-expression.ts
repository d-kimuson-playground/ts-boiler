import type { IsNever, TypeEq } from "~/type/utils"

type GuardFunction<Value, Guarded extends Value> =
  | ((value: Value) => boolean)
  | ((value: Value) => value is Guarded)
type ResolveFunction<Value, Resolved> = ((value: Value) => Resolved) | Resolved

type SwitchCaseObject<T, Result = never> = {
  value: T
  resolvedValue?: Result
  case: <
    Value extends T,
    GuardF extends GuardFunction<T, Value>,
    Ret,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Guarded = GuardF[] extends ((value: any) => value is infer I)[] ? I : never,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CaseType = GuardF[] extends ((value: any) => value is Value)[]
      ? "guard"
      : boolean extends ( // eslint-disable-next-line @typescript-eslint/no-explicit-any
          GuardF extends (value: any) => value is Value ? true : false
        )
      ? "value"
      : "validate",
    NextValue = CaseType extends "validate"
      ? T
      : CaseType extends "value"
      ? Exclude<T, Value>
      : Exclude<T, Guarded>
  >(
    value: Value | GuardF,
    resolve: ResolveFunction<
      CaseType extends "validate"
        ? T
        : CaseType extends "value"
        ? Value
        : CaseType extends "guard"
        ? Guarded
        : never,
      Ret
    >
  ) => SwitchCaseObject<
    NextValue,
    IsNever<Result> extends true ? Ret : Result | Ret
  >
  default: IsNever<T> extends true
    ? () => Result
    : <Default>(
        resolve: ResolveFunction<T, Default>
      ) => TypeEq<Default, unknown> extends true ? Result : Result | Default
}

const unresolvedSwitchCaseResult = {
  __type: "UnresolvedSwitchCaseResult",
} as const
type UnresolvedSwitchCaseResult = typeof unresolvedSwitchCaseResult

const createSwitchCaseObject = <T, Result>(
  target: T,
  resolved: UnresolvedSwitchCaseResult
): SwitchCaseObject<T, Result> => {
  return {
    value: target,
    case: <
      Value extends T,
      GuardF extends GuardFunction<T, Value>,
      Ret,
      Guarded,
      _CaseType,
      NextValue
    >(
      valueOrGuardOrFunction: Value | GuardF,
      resolveOrResolver: ResolveFunction<Guarded, Ret>
    ): SwitchCaseObject<
      NextValue,
      IsNever<Result> extends true ? Ret : Result | Ret
    > => {
      const isMatch =
        typeof valueOrGuardOrFunction === "function"
          ? (valueOrGuardOrFunction as GuardFunction<T, Value>)(target)
          : target === valueOrGuardOrFunction

      if (isMatch) {
        const val =
          typeof resolveOrResolver === "function"
            ? (resolveOrResolver as (val: Guarded) => Ret)(
                target as unknown as Guarded
              )
            : resolveOrResolver

        return createResolvedCaseObject(target as unknown as NextValue, val)
      }

      return createSwitchCaseObject(target as unknown as NextValue, resolved)
    },
    // @ts-expect-error -- Do not used direct return pattern
    default: <Default>(
      resolveOrResolver: ResolveFunction<T, Default>
    ): Default => {
      if (typeof resolveOrResolver === "function") {
        return (resolveOrResolver as (value: T) => Default)(target) as Default
      }

      return resolveOrResolver as Default
    },
  }
}

const createResolvedCaseObject = <T, R>(
  target: T,
  resolved: R
): SwitchCaseObject<T, R> => {
  return {
    value: target,
    case: <_Guarded, Ret, NextValue>(): SwitchCaseObject<NextValue, Ret> => {
      return createResolvedCaseObject<NextValue, Ret>(
        target as unknown as NextValue,
        resolved as unknown as Ret
      )
    },
    default: (): R => {
      return resolved
    },
  }
}

export const switchExpression = <T>(target: T): SwitchCaseObject<T> => {
  return createSwitchCaseObject(target, unresolvedSwitchCaseResult)
}
