/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { objectFromEntries } from "./tools/polyfills/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import type { CSSObject } from "./types";
import { useCssAndCx } from "./cssAndCx";
import { getDependencyArrayRef } from "./tools/getDependencyArrayRef";
import { typeGuard } from "tsafe/typeGuard";
import { useTssEmotionCache } from "./cache";

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
    function makeStyles<
        Params = void,
        RuleNameSubsetReferencableInNestedSelectors extends string = never,
    >(params?: { name?: string | Record<string, unknown> }) {
        const { name: nameOrWrappedName } = params ?? {};

        const name =
            typeof nameOrWrappedName !== "object"
                ? nameOrWrappedName
                : Object.keys(nameOrWrappedName)[0];

        return function <RuleName extends string>(
            cssObjectByRuleNameOrGetCssObjectByRuleName:
                | ((
                      theme: Theme,
                      params: Params,
                      classes: Record<
                          RuleNameSubsetReferencableInNestedSelectors,
                          string
                      >,
                  ) => Record<
                      RuleName | RuleNameSubsetReferencableInNestedSelectors,
                      CSSObject
                  >)
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

                const { css, cx } = useCssAndCx();

                const cache = useTssEmotionCache();

                return useMemo(() => {
                    const refClassesCache: Record<string, string> = {};

                    const refClasses = new Proxy<
                        Record<
                            RuleNameSubsetReferencableInNestedSelectors,
                            string
                        >
                    >({} as any, {
                        "get": (...args) => {
                            const [, propertyKey] = args;

                            if (typeof propertyKey === "symbol") {
                                return Reflect.get(...args);
                            }

                            return (refClassesCache[propertyKey] = `${
                                cache.key
                            }-${outerCounter}${
                                name !== undefined ? `-${name}` : ""
                            }-${propertyKey}-ref`);
                        },
                    });

                    const cssObjectByRuleName = getCssObjectByRuleName(
                        theme,
                        params,
                        refClasses,
                    );

                    const classes = objectFromEntries(
                        objectKeys(cssObjectByRuleName).map(ruleName => {
                            const cssObject = cssObjectByRuleName[ruleName];

                            if (!cssObject.name) {
                                cssObject.label = `${
                                    name !== undefined ? `${name}-` : ""
                                }${ruleName}`;
                            }

                            return [
                                ruleName,
                                `${css(cssObject)}${
                                    typeGuard<RuleNameSubsetReferencableInNestedSelectors>(
                                        ruleName,
                                        ruleName in refClassesCache,
                                    )
                                        ? ` ${refClassesCache[ruleName]}`
                                        : ""
                                }`,
                            ];
                        }),
                    ) as Record<RuleName, string>;

                    objectKeys(refClassesCache).forEach(ruleName => {
                        if (ruleName in classes) {
                            return;
                        }

                        classes[ruleName as RuleName] =
                            refClassesCache[ruleName];
                    });

                    return {
                        classes,
                        theme,
                        css,
                        cx,
                    };
                    //NOTE: css and cx only depends on cache
                }, [cache, theme, getDependencyArrayRef(params)]);
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
