
/** Object.keys() with types */
export function objectKeys<T extends {}>(o: T): (keyof T)[] {
    return Object.keys(o) as any;
}