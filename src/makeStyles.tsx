import { fromEntries } from "./tools/polyfills/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import type { CSSObject } from "./types";
import { useCssAndCx } from "./cssAndCx";

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
    function makeStyles<Params = void>() {
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

            function useStyles(params: Params) {
                const theme = useTheme();

                const { cx, css } = useCssAndCx();

                let count = 0;

                function createRef() {
                    return `tss-react-ref_${outerCounter}_${count++}`;
                }

                const cssObjectByRuleName = getCssObjectByRuleName(
                    theme,
                    params,
                    createRef,
                );

                const classes = fromEntries(
                    objectKeys(cssObjectByRuleName).map(ruleName => [
                        ruleName,
                        css(cssObjectByRuleName[ruleName]),
                    ]),
                ) as Record<RuleName, string>;

                return {
                    classes,
                    theme,
                    css,
                    cx,
                };
            }

            return useStyles;
        };
    }

    function useStyles() {
        const theme = useTheme();
        const { css, cx } = useCssAndCx();
        return { theme, css, cx };
    }

    return { makeStyles, useStyles };
}
