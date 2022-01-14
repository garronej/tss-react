/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Cx } from ".";
import { objectKeys } from "./tools/objectKeys";
import { useCssAndCx } from "./cssAndCx";
import { useMemo } from "react";

export function mergeClasses<T extends string>(
    classes: Record<T, string>,
    classesOv: Partial<Record<T, string>> | undefined,
    cx: Cx,
): Record<T, string> {
    if (classesOv === undefined) {
        return classes;
    }

    const out: Record<T, string> = {} as any;

    objectKeys(classes).forEach(
        ruleName =>
            (out[ruleName] = cx(classes[ruleName], classesOv[ruleName])),
    );
    objectKeys(classesOv).forEach(ruleName => {
        const value = classesOv[ruleName] as string | undefined;
        if (!(ruleName in out) && value !== undefined) {
            out[ruleName] = value;
        }
    });

    return out;
}

export function useMergedClasses<T extends string>(
    classes: Record<T, string>,
    classesOv: Partial<Record<T, string>> | undefined,
): Record<T, string> {
    const { cx } = useCssAndCx();

    return useMemo(
        () => mergeClasses(classes, classesOv, cx),
        [classes, classesOv, cx],
    );
}
