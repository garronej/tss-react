/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Cx } from "./types";
import { objectKeys } from "./tools/objectKeys";

export function mergeClasses<T extends string, U extends string>(
    classesFromUseStyles: Record<T, string>,
    classesOverrides: Partial<Record<U, string>> | undefined,
    cx: Cx
): Record<T, string> &
    (string extends U ? {} : Partial<Record<Exclude<U, T>, string>>) {
    //NOTE: We use this test to be resilient in case classesOverrides is not of the expected type.
    if (!(classesOverrides instanceof Object)) {
        return classesFromUseStyles as any;
    }

    const out: Record<T | U, string> = {} as any;

    objectKeys(classesFromUseStyles).forEach(
        ruleName =>
            (out[ruleName] = cx(
                classesFromUseStyles[ruleName],
                classesOverrides[ruleName]
            ))
    );

    objectKeys(classesOverrides).forEach(ruleName => {
        if (ruleName in classesFromUseStyles) {
            return;
        }

        const className = classesOverrides[ruleName];

        //...Same here, that why we don't do className === undefined
        if (typeof className !== "string") {
            return;
        }

        out[ruleName] = className;
    });

    return out;
}
