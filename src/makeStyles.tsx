"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import type { ReactNode } from "react";
import { objectFromEntries } from "./tools/polyfills/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import type { CSSObject, CSSInterpolation } from "./types";
import { createUseCssAndCx } from "./cssAndCx";
import { getDependencyArrayRef } from "./tools/getDependencyArrayRef";
import { typeGuard } from "./tools/typeGuard";
import { assert } from "./tools/assert";
import { mergeClasses } from "./mergeClasses";
import type { EmotionCache } from "@emotion/cache";
import { createContext, useContext } from "react";
declare module "@emotion/react" {
    export function __unsafe_useEmotionCache(): EmotionCache | null;
}

import { __unsafe_useEmotionCache as useContextualCache } from "@emotion/react";

let counter = 0;

export function createMakeStyles<Theme>(params: {
    useTheme: () => Theme;
    cache?: EmotionCache;
}) {
    const { useTheme, cache: cacheProvidedAtInception } = params;

    function useCache() {
        const contextualCache = useContextualCache();

        const cacheExplicitlyProvidedForTss = useCacheProvidedByProvider();

        const cacheToBeUsed =
            cacheProvidedAtInception ??
            cacheExplicitlyProvidedForTss ??
            contextualCache;

        if (cacheToBeUsed === null) {
            throw new Error(
                [
                    "In order to get SSR working with tss-react you need to explicitly provide an Emotion cache.",
                    "MUI users be aware: This is not an error strictly related to tss-react, with or without tss-react,",
                    "MUI needs an Emotion cache to be provided for SSR to work.",
                    "Here is the MUI documentation related to SSR setup: https://mui.com/material-ui/guides/server-rendering/",
                    "TSS provides helper that makes the process of setting up SSR easier: https://docs.tss-react.dev/ssr",
                ].join("\n"),
            );
        }

        return cacheToBeUsed;
    }

    const { useCssAndCx } = createUseCssAndCx({ useCache });

    /** returns useStyle. */
    function makeStyles<
        Params = void,
        RuleNameSubsetReferencableInNestedSelectors extends string = never,
    >(params?: { name?: string | Record<string, unknown>; uniqId?: string }) {
        const { name: nameOrWrappedName, uniqId = counter++ } = params ?? {};

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

            return function useStyles(
                params: Params,
                styleOverrides?: {
                    props: { classes?: Record<string, string> } & Record<
                        string,
                        unknown
                    >;
                    ownerState?: Record<string, unknown>;
                },
            ) {
                const theme = useTheme();

                const { css, cx } = useCssAndCx();

                const cache = useCache();

                let classes = useMemo(() => {
                    const refClassesCache: Record<string, string> = {};

                    type RefClasses = Record<
                        RuleNameSubsetReferencableInNestedSelectors,
                        string
                    >;

                    const refClasses =
                        typeof Proxy !== "undefined" &&
                        new Proxy<RefClasses>({} as any, {
                            "get": (_target, propertyKey) => {
                                if (typeof propertyKey === "symbol") {
                                    assert(false);
                                }

                                return (refClassesCache[propertyKey] = `${
                                    cache.key
                                }-${uniqId}${
                                    name !== undefined ? `-${name}` : ""
                                }-${propertyKey}-ref`);
                            },
                        });

                    const cssObjectByRuleName = getCssObjectByRuleName(
                        theme,
                        params,
                        refClasses || ({} as RefClasses),
                    );

                    const classes = objectFromEntries(
                        objectKeys(cssObjectByRuleName).map(ruleName => {
                            const cssObject = cssObjectByRuleName[ruleName];

                            if (!cssObject.label) {
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

                    return classes;
                }, [cache, css, cx, theme, getDependencyArrayRef(params)]);

                const propsClasses = styleOverrides?.props.classes;

                classes = useMemo(
                    () => mergeClasses(classes, propsClasses, cx),
                    [classes, getDependencyArrayRef(propsClasses), cx],
                );

                {
                    let cssObjectByRuleNameOrGetCssObjectByRuleName:
                        | Record<
                              string,
                              | CSSInterpolation
                              | ((params: {
                                    ownerState: any;
                                    theme: Theme;
                                }) => CSSInterpolation)
                          >
                        | undefined = undefined;

                    try {
                        cssObjectByRuleNameOrGetCssObjectByRuleName =
                            name !== undefined
                                ? (theme as any).components?.[name]
                                      ?.styleOverrides
                                : undefined;

                        // eslint-disable-next-line no-empty
                    } catch {}

                    const themeClasses = useMemo(() => {
                        if (!cssObjectByRuleNameOrGetCssObjectByRuleName) {
                            return undefined;
                        }

                        const themeClasses: Record<string, string> = {};

                        for (const ruleName in cssObjectByRuleNameOrGetCssObjectByRuleName) {
                            const cssObjectOrGetCssObject =
                                cssObjectByRuleNameOrGetCssObjectByRuleName[
                                    ruleName
                                ];

                            if (!(cssObjectOrGetCssObject instanceof Object)) {
                                continue;
                            }

                            themeClasses[ruleName] = css(
                                typeof cssObjectOrGetCssObject === "function"
                                    ? cssObjectOrGetCssObject({
                                          theme,
                                          "ownerState":
                                              styleOverrides?.ownerState,
                                          ...styleOverrides?.props,
                                      })
                                    : cssObjectOrGetCssObject,
                            );
                        }

                        return themeClasses;
                    }, [
                        cssObjectByRuleNameOrGetCssObjectByRuleName ===
                        undefined
                            ? undefined
                            : JSON.stringify(
                                  cssObjectByRuleNameOrGetCssObjectByRuleName,
                              ),
                        getDependencyArrayRef(styleOverrides?.props),
                        getDependencyArrayRef(styleOverrides?.ownerState),
                        css,
                    ]);

                    classes = useMemo(
                        () => mergeClasses(classes, themeClasses, cx),
                        [classes, themeClasses, cx],
                    );
                }

                return {
                    classes,
                    theme,
                    css,
                    cx,
                };
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

const reactContext = createContext<EmotionCache | undefined>(undefined);

function useCacheProvidedByProvider() {
    const cacheExplicitlyProvidedForTss = useContext(reactContext);

    return cacheExplicitlyProvidedForTss;
}

export function TssCacheProvider(props: {
    value: EmotionCache;
    children: ReactNode;
}) {
    const { children, value } = props;

    return (
        <reactContext.Provider value={value}>{children}</reactContext.Provider>
    );
}
