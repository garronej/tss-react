import { useMemo } from "react";
import { objectFromEntries } from "./tools/polyfills/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import type { CSSObject } from "./types";
import { useCssAndCx } from "./cssAndCx";
import { getDependencyArrayRef } from "./tools/getDependencyArrayRef";
import { typeGuard } from "tsafe/typeGuard";

let refCount = 0;

/**
 * @see {@link https://github.com/garronej/tss-react}
 */
export function createMakeStyles<Theme>(params: { useTheme: () => Theme }) {
    const { useTheme } = params;

    /** returns useStyle. */
    function makeStyles<Params = void, Ref extends string = never>(params?: {
        label?: string | Record<string, unknown>;
        refs?: Ref[];
    }) {
        const { label: labelOrWrappedLabel, refs = [] } = params ?? {};

        const label =
            typeof labelOrWrappedLabel !== "object"
                ? labelOrWrappedLabel
                : Object.keys(labelOrWrappedLabel)[0];

        const refMap = objectFromEntries(
            refs.map(ref => {
                if (/[\s!#()+,.:<>]/.test(ref)) {
                    throw new Error(`Illegal characters in ref name "${ref}"`);
                }
                return [
                    ref,
                    `tss-ref${refCount++}${
                        label !== undefined ? `-${label}` : ""
                    }`,
                ];
            }),
        ) as Record<Ref, string>;

        return function <RuleName extends string>(
            cssObjectByRuleNameOrGetCssObjectByRuleName: (
                theme: Theme,
                params: Params,
                refMap: Record<Ref, string>,
            ) => Record<RuleName | Ref, CSSObject>,
        ) {
            const getCssObjectByRuleName =
                typeof cssObjectByRuleNameOrGetCssObjectByRuleName ===
                "function"
                    ? cssObjectByRuleNameOrGetCssObjectByRuleName
                    : () => cssObjectByRuleNameOrGetCssObjectByRuleName;

            return function useStyles(params: Params) {
                const theme = useTheme();

                const { cx, css } = useCssAndCx();

                return useMemo(() => {
                    const cssObjectByRuleName = getCssObjectByRuleName(
                        theme,
                        params,
                        refMap,
                    );

                    const classes = objectFromEntries(
                        objectKeys(cssObjectByRuleName).map(ruleName => {
                            const cssObject = cssObjectByRuleName[ruleName];

                            if (!cssObject.label) {
                                cssObject.label = `${
                                    label !== undefined ? `${label}-` : ""
                                }${ruleName}`;
                            }

                            return [
                                ruleName,
                                `${css(cssObject)}${
                                    typeGuard<Ref>(ruleName, ruleName in refMap)
                                        ? ` ${refMap[ruleName]}`
                                        : ""
                                }`,
                            ];
                        }),
                    ) as Record<RuleName, string>;

                    return {
                        classes,
                        theme,
                        css,
                        cx,
                    };
                }, [cx, css, theme, getDependencyArrayRef(params)]);
            };
        };
    }

    function useStyles() {
        const theme = useTheme();
        const { css, cx } = useCssAndCx();
        return { theme, css, cx };
    }

    return { makeStyles, useStyles };
}
