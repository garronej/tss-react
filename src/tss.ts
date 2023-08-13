/* eslint-disable @typescript-eslint/ban-types */

import type { CSSObject, Css, Cx } from "./types";

export type Tss<
    Context extends Record<string, unknown>,
    Params extends Record<string, unknown>,
    RuleNameSubsetReferencableInNestedSelectors extends string,
    ExcludedMethod extends "withParams" | "withName" | "withNestedSelectors"
> = Omit<
    {
        createUseStyles: <RuleName extends string>(
            getCssObjectByRuleName: Tss.GetCssObjectByRuleNameOrCssObjectByRuleName<
                Context,
                Params,
                RuleNameSubsetReferencableInNestedSelectors,
                RuleName
            >
        ) => Tss.UseStyles<Context, Params, RuleName>;
        withParams: <Params extends Record<string, unknown>>() => Tss<
            Context,
            Params,
            RuleNameSubsetReferencableInNestedSelectors,
            ExcludedMethod | "withParams"
        >;
        withName: (
            name: string
        ) => Tss<
            Context,
            Params,
            RuleNameSubsetReferencableInNestedSelectors,
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
            ExcludedMethod | "withNestedSelectors"
        >;
    },
    ExcludedMethod
>;

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
        RuleName extends string
    > = Record<never, unknown> extends Params
        ? () => UseStylesReturn<Context, RuleName>
        : (params: Params) => UseStylesReturn<Context, RuleName>;

    export type GetCssObjectByRuleNameOrCssObjectByRuleName<
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
}

export function createTss<Context extends Record<string, unknown>>(params: {
    useContext: () => Context;
}): { tss: Tss<Context, Record<never, unknown>, never, never> } {
    const { useContext } = params;

    return null as any;
}
