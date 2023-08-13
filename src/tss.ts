/* eslint-disable @typescript-eslint/ban-types */

import { useMemo } from "react";
import type { CSSObject, Css, Cx } from "./types";
import type { EmotionCache } from "@emotion/cache";
import { createUseCache } from "./makeStyles";
import { createUseCssAndCx } from "./cssAndCx";
import { assert } from "./tools/assert";
import { objectFromEntries } from "./tools/polyfills/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import { typeGuard } from "./tools/typeGuard";
import { getDependencyArrayRef } from "./tools/getDependencyArrayRef";
import { mergeClasses } from "./mergeClasses";
import { isSsr } from "./tools/isSsr";

export type Tss<
    Context extends Record<string, unknown>,
    Params extends Record<string, unknown>,
    RuleNameSubsetReferencableInNestedSelectors extends string,
    PluginParams extends Record<string, unknown>,
    ExcludedMethod extends
        | "withParams"
        | "withName"
        | "withNestedSelectors" = never
> = Omit<
    {
        createUseStyles: <RuleName extends string>(
            cssObjectByRuleNameOrGetCssObjectByRuleName: Tss.CssObjectByRuleNameOrGetCssObjectByRuleName<
                Context,
                Params,
                RuleNameSubsetReferencableInNestedSelectors,
                RuleName
            >
        ) => Tss.UseStyles<Context, Params, RuleName, PluginParams>;
        withParams: <Params extends Record<string, unknown>>() => Tss<
            Context,
            Params,
            RuleNameSubsetReferencableInNestedSelectors,
            PluginParams,
            ExcludedMethod | "withParams"
        >;
        withName: (
            name: string
        ) => Tss<
            Context,
            Params,
            RuleNameSubsetReferencableInNestedSelectors,
            PluginParams,
            ExcludedMethod | "withName"
        >;
        withNestedSelectors: <
            RuleNameSubsetReferencableInNestedSelectors extends string
        >(
            id?: string
        ) => Tss<
            Context,
            Params,
            RuleNameSubsetReferencableInNestedSelectors,
            PluginParams,
            ExcludedMethod | "withNestedSelectors"
        >;
    },
    ExcludedMethod
>;

type VoidAllowedIfCanBeEmpty<T extends Record<string, unknown>> = Record<
    never,
    unknown
> extends T
    ? void | T
    : T;

export namespace Tss {
    export type UseStylesReturn<
        Context extends Record<string, unknown>,
        RuleName extends string
    > = ([RuleName] extends [never]
        ? {}
        : { classes: Record<RuleName, string> }) & {
        css: Css;
        cx: Cx;
    } & Context;

    export type UseStyles<
        Context extends Record<string, unknown>,
        Params extends Record<string, unknown>,
        RuleName extends string,
        PluginParams extends Record<string, unknown>
    > = (
        params: VoidAllowedIfCanBeEmpty<
            Params &
                PluginParams & {
                    classesFromProps?: Record<string, string | undefined>;
                }
        >
    ) => UseStylesReturn<Context, RuleName>;

    export type CssObjectByRuleNameOrGetCssObjectByRuleName<
        Context extends Record<string, unknown>,
        Params extends Record<string, unknown>,
        RuleNameSubsetReferencableInNestedSelectors extends string,
        RuleName extends string
    > =
        | ((
              params: Context &
                  Params &
                  ([RuleNameSubsetReferencableInNestedSelectors] extends [never]
                      ? {}
                      : {
                            classes: Record<
                                RuleNameSubsetReferencableInNestedSelectors,
                                string
                            >;
                        })
          ) => Record<
              RuleName | RuleNameSubsetReferencableInNestedSelectors,
              CSSObject
          >)
        | Record<RuleName, CSSObject>;

    export type UsePlugin<
        Context extends Record<string, unknown>,
        PluginParams extends Record<string, unknown>
    > = (
        params: {
            classes: Record<string, string>;
            cx: Cx;
            css: Css;
            name: string | undefined;
            id: string | undefined;
        } & Context &
            PluginParams
    ) => {
        classes?: Record<string, string>;
        cx?: Cx;
        css?: Css;
    };
}

export function createTss<
    Context extends Record<string, unknown>,
    PluginParams extends Record<string, unknown>
>(params: {
    useContext: () => Context;
    usePlugin?: Tss.UsePlugin<Context, PluginParams>;
    cache?: EmotionCache;
}): { tss: Tss<Context, Record<never, unknown>, never, PluginParams, never> } {
    const { useContext, usePlugin, cache: cacheProvidedAtInception } = params;

    const { useCache } = createUseCache({ cacheProvidedAtInception });

    const { useCssAndCx } = createUseCssAndCx({ useCache });

    const usePluginDefault: Tss.UsePlugin<Context, PluginParams> = ({
        classes,
        cx,
        css
    }) => ({ classes, cx, css });

    const tss = createTss_internal<
        Context,
        Record<never, unknown>,
        never,
        PluginParams
    >({
        useContext,
        useCache,
        useCssAndCx,
        "usePlugin": usePlugin ?? usePluginDefault,
        "id": undefined,
        "name": undefined
    });

    return { tss };
}

let counter = 0;

function createTss_internal<
    Context extends Record<string, unknown>,
    Params extends Record<string, unknown>,
    RuleNameSubsetReferencableInNestedSelectors extends string,
    PluginParams extends Record<string, unknown>
>(params: {
    useContext: () => Context;
    useCache: () => EmotionCache;
    useCssAndCx: () => { css: Css; cx: Cx };
    usePlugin: Tss.UsePlugin<Context, PluginParams>;
    id: string | undefined;
    name: string | undefined;
}): Tss<
    Context,
    Params,
    RuleNameSubsetReferencableInNestedSelectors,
    PluginParams
> {
    const { useContext, useCache, useCssAndCx, usePlugin, id, name } = params;

    return {
        "withParams": () => createTss_internal({ ...params }),
        "withName": name => createTss_internal({ ...params, name }),
        "withNestedSelectors": id => {
            if (isSsr() && id === undefined) {
                console.warn(
                    "In SSR setups you must provide an id to withNestedSelectors()"
                );
            }

            return createTss_internal({
                ...params,
                "id": id ?? `${counter++}`
            });
        },
        "createUseStyles": <RuleName extends string>(
            cssObjectByRuleNameOrGetCssObjectByRuleName: Tss.CssObjectByRuleNameOrGetCssObjectByRuleName<
                Context,
                Params,
                RuleNameSubsetReferencableInNestedSelectors,
                RuleName
            >
        ) => {
            const getCssObjectByRuleName =
                typeof cssObjectByRuleNameOrGetCssObjectByRuleName ===
                "function"
                    ? cssObjectByRuleNameOrGetCssObjectByRuleName
                    : () => cssObjectByRuleNameOrGetCssObjectByRuleName;

            return function useStyles(params) {
                const { classesFromProps, ...paramsAndPluginParams } =
                    (params ?? {}) as Params &
                        PluginParams & {
                            classesFromProps?: Record<
                                string,
                                string | undefined
                            >;
                        };

                const context = useContext();

                const { css, cx } = useCssAndCx();

                const cache = useCache();

                let classes = useMemo(() => {
                    const refClassesCache: Record<string, string> = {};

                    type RefClasses = Record<
                        RuleNameSubsetReferencableInNestedSelectors,
                        string
                    >;

                    // @ts-expect-error: Type safety non achievable.
                    const cssObjectByRuleName = getCssObjectByRuleName({
                        ...params,
                        ...context,
                        ...(id === undefined
                            ? {}
                            : {
                                  "classes":
                                      typeof Proxy === "undefined"
                                          ? ({} as RefClasses)
                                          : new Proxy<RefClasses>({} as any, {
                                                "get": (
                                                    _target,
                                                    propertyKey
                                                ) => {
                                                    if (
                                                        typeof propertyKey ===
                                                        "symbol"
                                                    ) {
                                                        assert(false);
                                                    }

                                                    return (refClassesCache[
                                                        propertyKey
                                                    ] = `${cache.key}-${id}${
                                                        name !== undefined
                                                            ? `-${name}`
                                                            : ""
                                                    }-${propertyKey}-ref`);
                                                }
                                            })
                              })
                    });

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
                                        ruleName in refClassesCache
                                    )
                                        ? ` ${refClassesCache[ruleName]}`
                                        : ""
                                }`
                            ];
                        })
                    ) as Record<RuleName, string>;

                    objectKeys(refClassesCache).forEach(ruleName => {
                        if (ruleName in classes) {
                            return;
                        }

                        classes[ruleName as RuleName] =
                            refClassesCache[ruleName];
                    });

                    return classes;
                }, [
                    cache,
                    css,
                    cx,
                    getDependencyArrayRef(params),
                    ...Object.values(context)
                ]);

                classes = useMemo(
                    () => mergeClasses(classes, classesFromProps, cx),
                    [classes, getDependencyArrayRef(classesFromProps), cx]
                );

                // @ts-expect-error: Type safety non achievable.
                const pluginResultWrap = usePlugin({
                    classes,
                    css,
                    cx,
                    id,
                    name,
                    ...context,
                    ...paramsAndPluginParams
                });

                return {
                    "classes": pluginResultWrap.classes ?? classes,
                    "css": pluginResultWrap.css ?? css,
                    "cx": pluginResultWrap.cx ?? cx,
                    ...context
                };
            };
        }
    };
}
