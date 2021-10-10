/** @see <https://docs.tsafe.dev/capitalize> */
export function capitalize<S extends string>(str: S): Capitalize<S> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (str.charAt(0).toUpperCase() + str.slice(1)) as any;
}
