/* eslint-disable @typescript-eslint/no-explicit-any */

export const fromEntries: typeof Object.fromEntries = !(Object as any)
    .fromEntries
    ? (entries: any) => {
          if (!entries || !entries[Symbol.iterator]) {
              throw new Error(
                  "Object.fromEntries() requires a single iterable argument",
              );
          }

          const o: any = {};

          Object.keys(entries).forEach(key => {
              const [k, v] = entries[key];

              o[k] = v;
          });

          return o;
      }
    : Object.fromEntries;
