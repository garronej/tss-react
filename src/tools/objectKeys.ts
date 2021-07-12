/** Object.keys() with types */
export function objectKeys<T extends Record<string, unknown>>(
    o: T,
): (keyof T)[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(o) as any;
}
