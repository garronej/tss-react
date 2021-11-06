import React from "react";
import { CSSObject } from "./types";
import { fromEntries } from "./tools/polyfills/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import { useCssAndCx } from "./cssAndCx";

export interface MakeStylesOptions<RefName extends string = never> {
    name?: string;
    refs?: RefName[];
}

export type StyleRules<RuleName extends string> = Record<RuleName, CSSObject>;

export type StyleRulesOrCallback<
    Theme,
    RuleName extends string,
    Params = void,
    RefName extends string = never,
> =
    | StyleRules<RuleName | RefName>
    | ((
          theme: Theme,
          params: Params,
          refs: Record<RefName, string>,
      ) => StyleRules<RuleName | RefName>);

let refCount = 0;

/**
 * @see {@link https://github.com/garronej/tss-react}
 */
export function createMakeStyles<Theme>(params: { useTheme: () => Theme }) {
    const { useTheme } = params;

    /** returns useStyle. */
    function makeStyles<Params = void, RefName extends string = never>(
        options: MakeStylesOptions<RefName> = {},
    ) {
        const { name, refs = [] } = options;

        const labelPrefix = name && typeof name === "string" ? `${name}-` : "";

        // Generate refs map
        const refsMap = Object.fromEntries(
            refs.map(ref => [
                ref,
                `tss-react-ref-${labelPrefix}${ref}-${refCount++}`,
            ]),
        ) as Record<RefName, string>;

        return function <RuleName extends string>(
            cssObjectOrFn: StyleRulesOrCallback<
                Theme,
                RuleName,
                Params,
                RefName
            >,
        ) {
            function useStyles(params: Params) {
                const theme = useTheme();

                const { cx, css } = useCssAndCx();

                const cssRules =
                    typeof cssObjectOrFn === "function"
                        ? cssObjectOrFn(theme, params, refsMap)
                        : cssObjectOrFn;

                return React.useMemo(() => {
                    // Check validity of refs (mainly for non-typescript users)
                    const missingRefs = refs.filter(ref => !cssRules[ref]);
                    if (missingRefs.length > 0) {
                        throw new Error(
                            `Refs ${missingRefs.join(
                                ", ",
                            )} were not found in style rules`,
                        );
                    }

                    // Build classes object
                    const classes = fromEntries(
                        objectKeys(cssRules).map(ruleName => {
                            const cssObject: CSSObject = cssRules[ruleName];
                            // If a ref name matches the style rule name, automatically set the ref
                            if (
                                !cssObject.ref &&
                                refsMap[ruleName as RefName]
                            ) {
                                cssObject.ref = refsMap[ruleName as RefName];
                            }
                            // Assign label to class name if none is provided
                            if (!cssObject.label) {
                                cssObject.label = labelPrefix + ruleName;
                            }
                            // Transform css object into class name
                            return [ruleName, css(cssObject)];
                        }),
                    ) as Record<RuleName, string>;

                    // Return all data
                    return {
                        classes,
                        theme,
                        css,
                        cx,
                    };
                }, [cssRules, theme, params, css, cx]);
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
