import { useMemo } from "react";
import { objectFromEntries } from "./tools/polyfills/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import type { CSSObject } from "./types";
import { useCssAndCx } from "./cssAndCx";
import { getDependencyArrayRef } from "./tools/getDependencyArrayRef";

/**
 * @see {@link https://github.com/garronej/tss-react}
 */
export function createMakeStyles<Theme>(params: { useTheme: () => Theme }) {
    const { useTheme } = params;

    const getCounter = (() => {
        let counter = 0;

        return () => counter++;
    })();

    /** returns useStyle. */
    function makeStyles<Params = void>(params?: {
        label: string | Record<string, unknown>;
    }) {
        const { label: labelOrWrappedLabel } = params ?? {};

        const label =
            typeof labelOrWrappedLabel !== "object"
                ? labelOrWrappedLabel
                : Object.keys(labelOrWrappedLabel)[0];

        return function <RuleName extends string>(
            cssObjectByRuleNameOrGetCssObjectByRuleName:
                | ((
                      theme: Theme,
                      params: Params,
                      createRef: () => string,
                  ) => Record<RuleName, CSSObject>)
                | Record<RuleName, CSSObject>,
        ) {
            const getCssObjectByRuleName =
                typeof cssObjectByRuleNameOrGetCssObjectByRuleName ===
                "function"
                    ? cssObjectByRuleNameOrGetCssObjectByRuleName
                    : () => cssObjectByRuleNameOrGetCssObjectByRuleName;

            const outerCounter = getCounter();

            return function useStyles(params: Params) {
                const theme = useTheme();

                const { cx, css } = useCssAndCx();

                return useMemo(() => {
                    const cssObjectByRuleName = getCssObjectByRuleName(
                        theme,
                        params,
                        (() => {
                            let count = 0;

                            return function createRef() {
                                return `tss-ref${outerCounter}x${count++}${
                                    label !== undefined ? `-${label}` : ""
                                }`;
                            };
                        })(),
                    );

                    const classes = objectFromEntries(
                        objectKeys(cssObjectByRuleName).map(ruleName => {
                            const cssObject = cssObjectByRuleName[ruleName];

                            if (!cssObject.label) {
                                cssObject.label = `${
                                    label !== undefined ? `${label}-` : ""
                                }${ruleName}`;
                            }

                            return [ruleName, css(cssObject)];
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