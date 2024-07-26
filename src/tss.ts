/* eslint-disable @typescript-eslint/ban-types */

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
import { isSSR } from "./tools/isSSR";

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
        create: <RuleName extends string>(
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
            name: string | Record<string, unknown>
        ) => Tss<
            Context,
            Params,
            RuleNameSubsetReferencableInNestedSelectors,
            PluginParams,
            ExcludedMethod | "withName"
        >;
        withNestedSelectors: <
            RuleNameSubsetReferencableInNestedSelectors extends string
        >() => Tss<
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
                    classesOverrides?: Record<string, string | undefined>;
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
            idOfUseStyles: string;
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
    counter = 0;
    nestedSelectorUsageTrackRecord.splice(
        0,
        nestedSelectorUsageTrackRecord.length
    );

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
        "name": undefined,
        "doesUseNestedSelectors": false
    });

    return { tss };
}

let counter = 0;

const nestedSelectorUsageTrackRecord: {
    name: string;
    nestedSelectorRuleNames: Set<string>;
    idOfUseStyles: string;
}[] = [];

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
    name: string | undefined;
    doesUseNestedSelectors: boolean;
}): Tss<
    Context,
    Params,
    RuleNameSubsetReferencableInNestedSelectors,
    PluginParams
> {
    const {
        useContext,
        useCache,
        useCssAndCx,
        usePlugin,
        name,
        doesUseNestedSelectors
    } = params;

    return {
        "withParams": () => createTss_internal({ ...params }),
        "withName": nameOrWrappedName =>
            createTss_internal({
                ...params,
                "name":
                    typeof nameOrWrappedName !== "object"
                        ? nameOrWrappedName
                        : Object.keys(nameOrWrappedName)[0]
            }),
        "withNestedSelectors": () =>
            createTss_internal({
                ...params,
                "doesUseNestedSelectors": true
            }),
        "create": <RuleName extends string>(
            cssObjectByRuleNameOrGetCssObjectByRuleName: Tss.CssObjectByRuleNameOrGetCssObjectByRuleName<
                Context,
                Params,
                RuleNameSubsetReferencableInNestedSelectors,
                RuleName
            >
        ) => {
            // NOTE: Not isomorphic. Not guaranteed to be the same on client and server.
            // Do not attempt to 'simplify' the code without taking this fact into account.
            const idOfUseStyles = `x${counter++}`;

            // NOTE: Cleanup for hot module reloading.
            if (name !== undefined) {
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    const wrap = nestedSelectorUsageTrackRecord.find(
                        wrap => wrap.name === name
                    );

                    if (wrap === undefined) {
                        break;
                    }

                    nestedSelectorUsageTrackRecord.splice(
                        nestedSelectorUsageTrackRecord.indexOf(wrap),
                        1
                    );
                }
            }

            const getCssObjectByRuleName =
                typeof cssObjectByRuleNameOrGetCssObjectByRuleName ===
                "function"
                    ? cssObjectByRuleNameOrGetCssObjectByRuleName
                    : () => cssObjectByRuleNameOrGetCssObjectByRuleName;

            return function useStyles(params) {
                const { classesOverrides, ...paramsAndPluginParams } =
                    (params ?? {}) as Params &
                        PluginParams & {
                            classesOverrides?: Record<
                                string,
                                string | undefined
                            >;
                        };

                const context = useContext();

                const { css, cx } = useCssAndCx();

                const cache = useCache();

                const getClasses = () => {
                    const refClassesCache: Record<string, string> = {};

                    type RefClasses = Record<
                        RuleNameSubsetReferencableInNestedSelectors,
                        string
                    >;

                    // @ts-expect-error: Type safety non achievable.
                    const cssObjectByRuleName = getCssObjectByRuleName({
                        ...params,
                        ...context,
                        ...(!doesUseNestedSelectors
                            ? {}
                            : {
                                  "classes":
                                      typeof Proxy === "undefined"
                                          ? ({} as RefClasses)
                                          : new Proxy<RefClasses>({} as any, {
                                                "get": (_target, ruleName) => {
                                                    /* prettier-ignore */
                                                    if (typeof ruleName === "symbol") {
                                                        assert(false);
                                                    }

                                                    if (
                                                        isSSR &&
                                                        name === undefined
                                                    ) {
                                                        throw new Error(
                                                            [
                                                                `tss-react: In SSR setups, in order to use nested selectors, you must also give a unique name to the useStyle function.`,
                                                                `Solution: Use tss.withName("ComponentName").withNestedSelectors<...>()... to set a name.`
                                                            ].join("\n")
                                                        );
                                                    }

                                                    update_nested_selector_usage_track_record: {
                                                        if (
                                                            name === undefined
                                                        ) {
                                                            break update_nested_selector_usage_track_record;
                                                        }

                                                        /* prettier-ignore */
                                                        let wrap = nestedSelectorUsageTrackRecord.find(wrap => wrap.name === name && wrap.idOfUseStyles === idOfUseStyles);

                                                        /* prettier-ignore */
                                                        if (wrap === undefined) {

                                                            /* prettier-ignore */
                                                            wrap = { name, idOfUseStyles, "nestedSelectorRuleNames": new Set() };

                                                            /* prettier-ignore */
                                                            nestedSelectorUsageTrackRecord.push(wrap);
                                                        }

                                                        /* prettier-ignore */
                                                        wrap.nestedSelectorRuleNames.add(ruleName);
                                                    }

                                                    detect_potential_conflicts: {
                                                        if (
                                                            name === undefined
                                                        ) {
                                                            break detect_potential_conflicts;
                                                        }

                                                        const hasPotentialConflict =
                                                            nestedSelectorUsageTrackRecord.find(
                                                                wrap =>
                                                                    wrap.name ===
                                                                        name &&
                                                                    wrap.idOfUseStyles !==
                                                                        idOfUseStyles &&
                                                                    wrap.nestedSelectorRuleNames.has(
                                                                        ruleName
                                                                    )
                                                            ) !== undefined;

                                                        if (
                                                            !hasPotentialConflict
                                                        ) {
                                                            break detect_potential_conflicts;
                                                        }

                                                        throw new Error(
                                                            [
                                                                `tss-react: There are in your codebase two different useStyles named "${name}" that`,
                                                                `both use use the nested selector ${ruleName}.\n`,
                                                                `This may lead to CSS class name collisions, causing nested selectors to target elements outside of the intended scope.\n`,
                                                                `Solution: Ensure each useStyles using nested selectors has a unique name.\n`,
                                                                `Use: tss.withName("UniqueName").withNestedSelectors<...>()...`
                                                            ].join(" ")
                                                        );
                                                    }

                                                    /* prettier-ignore */
                                                    return (refClassesCache[ruleName] = `${cache.key}-${name !== undefined ? name : idOfUseStyles}-${ruleName}-ref`);
                                                }
                                            })
                              })
                    });

                    let classes = objectFromEntries(
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

                    classes = mergeClasses(classes, classesOverrides, cx);

                    return classes;
                };

                const classes = runGetClassesOrUseCache({
                    cache,
                    cssObjectByRuleNameOrGetCssObjectByRuleName,
                    "classesOverridesRef":
                        getDependencyArrayRef(classesOverrides),
                    "paramsAndPluginParamsRef": getDependencyArrayRef(
                        paramsAndPluginParams
                    ),
                    idOfUseStyles,
                    context,
                    getClasses
                });

                // @ts-expect-error: Type safety non achievable.
                const pluginResultWrap = usePlugin({
                    classes,
                    css,
                    cx,
                    idOfUseStyles,
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

const mapCache = new WeakMap<
    Object /* cache */,
    WeakMap<
        Function | Object /* cssObjectByRuleNameOrGetCssObjectByRuleName */,
        Map<
            any /* classesOverridesRef */,
            Map<
                any /* paramsAndPluginParamsRef */,
                {
                    idOfUseStyles: string;
                    context: Record<string, unknown>;
                    result: unknown;
                }[]
            >
        >
    >
>();

function runGetClassesOrUseCache<T>(params: {
    cache: Object;
    cssObjectByRuleNameOrGetCssObjectByRuleName: Function | Object;
    classesOverridesRef: string | undefined;
    paramsAndPluginParamsRef: any;
    idOfUseStyles: string;
    context: Record<string, unknown>;
    getClasses: () => T;
}): T {
    const {
        cache,
        cssObjectByRuleNameOrGetCssObjectByRuleName,
        classesOverridesRef,
        paramsAndPluginParamsRef,
        idOfUseStyles,
        context,
        getClasses
    } = params;

    use_cache: {
        const mapCache_in = mapCache.get(cache);

        if (mapCache_in === undefined) {
            break use_cache;
        }

        const mapCache_in_in = mapCache_in.get(
            cssObjectByRuleNameOrGetCssObjectByRuleName
        );

        if (mapCache_in_in === undefined) {
            break use_cache;
        }

        const mapCache_in_in_in = mapCache_in_in.get(classesOverridesRef);

        if (mapCache_in_in_in === undefined) {
            break use_cache;
        }

        const arr = mapCache_in_in_in.get(paramsAndPluginParamsRef);

        if (arr === undefined) {
            break use_cache;
        }

        const entry = arr.find(({ context: context_i }) => {
            if (context_i === context) {
                return true;
            }

            if (objectKeys(context_i).length !== objectKeys(context).length) {
                return false;
            }

            for (const key in context_i) {
                if (
                    getDependencyArrayRef(context_i[key]) !==
                    getDependencyArrayRef(context[key])
                ) {
                    return false;
                }
            }

            return true;
        });

        if (entry === undefined) {
            break use_cache;
        }

        if (entry?.idOfUseStyles !== idOfUseStyles) {
            arr.splice(arr.indexOf(entry), 1);

            break use_cache;
        }

        return entry.result as T;
    }

    const result = getClasses();

    {
        if (!mapCache.has(cache)) {
            mapCache.set(cache, new WeakMap());
        }

        const mapCache_in = mapCache.get(cache);

        assert(mapCache_in !== undefined);

        if (!mapCache_in.has(cssObjectByRuleNameOrGetCssObjectByRuleName)) {
            mapCache_in.set(
                cssObjectByRuleNameOrGetCssObjectByRuleName,
                new Map()
            );
        }

        const mapCache_in_in = mapCache_in.get(
            cssObjectByRuleNameOrGetCssObjectByRuleName
        );

        assert(mapCache_in_in !== undefined);

        if (!mapCache_in_in.has(classesOverridesRef)) {
            if (mapCache_in_in.size > 200) {
                mapCache_in_in.clear();
            }

            mapCache_in_in.set(classesOverridesRef, new Map());
        }

        const mapCache_in_in_in = mapCache_in_in.get(classesOverridesRef);

        assert(mapCache_in_in_in !== undefined);

        if (!mapCache_in_in_in.has(paramsAndPluginParamsRef)) {
            clear_cache: {
                const threshold =
                    typeof paramsAndPluginParamsRef === "string" ? 257 : 5;

                if (mapCache_in_in_in.size < threshold) {
                    break clear_cache;
                }
                mapCache_in_in_in.clear();
            }

            mapCache_in_in_in.set(paramsAndPluginParamsRef, []);
        }

        let arr = mapCache_in_in_in.get(paramsAndPluginParamsRef);

        assert(arr !== undefined);

        if (arr.length > 5) {
            arr = [];
        }
        arr.push({ idOfUseStyles, context, result });
    }

    return result;
}
