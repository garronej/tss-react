/* eslint-disable @typescript-eslint/no-explicit-any */

/** https://docs.tsafe.dev/typeguard */
export function typeGuard<T>(_value: any, isMatched: boolean): _value is T {
    return isMatched;
}
