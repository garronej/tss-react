/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, createElement } from "react";
import type { ReactHTML } from "react";
import type { ReactComponent } from "./tools/ReactComponent";
import type { CSSObject } from "./types";
import { createMakeStyles } from "./makeStyles";
import { capitalize } from "./tools/capitalize";

export function createWithStyles<Theme>(params: { useTheme: () => Theme }) {
    const { useTheme } = params;

    const { makeStyles } = createMakeStyles({ useTheme });

    function withStyles<
        C extends ReactComponent<any> | keyof ReactHTML,
        Props extends C extends ReactComponent<infer P>
            ? P
            : C extends keyof ReactHTML
            ? ReactHTML[C] extends ReactComponent<infer P>
                ? NonNullable<P>
                : never
            : never,
        CssObjectByRuleName extends Props extends {
            classes?: Partial<infer ClassNameByRuleName>;
        }
            ? { [RuleName in keyof ClassNameByRuleName]?: CSSObject } & {
                  [mediaQuery: `@media${string}`]: {
                      [RuleName in keyof ClassNameByRuleName]?: CSSObject;
                  };
              }
            : { root: CSSObject } & {
                  [mediaQuery: `@media${string}`]: { root: CSSObject };
              },
    >(
        Component: C,
        cssObjectByRuleNameOrGetCssObjectByRuleName:
            | (CssObjectByRuleName & {
                  [mediaQuery: `@media${string}`]: {
                      [Key in keyof CssObjectByRuleName]?: CSSObject;
                  };
              })
            | ((
                  theme: Theme,
                  props: Props,
                  classes: Record<
                      Exclude<keyof CssObjectByRuleName, `@media${string}`>,
                      string
                  >,
              ) => CssObjectByRuleName),
        params?: { name?: string | Record<string, unknown>; uniqId?: string },
    ): C extends keyof ReactHTML ? ReactHTML[C] : C {
        const Component_: ReactComponent<any> =
            typeof Component === "string"
                ? (() => {
                      const tag = Component as keyof ReactHTML;

                      const Out = function ({ children, ...props }: any) {
                          return createElement(tag, props, children);
                      };

                      Object.defineProperty(Out, "name", {
                          "value": capitalize(tag),
                      });

                      return Out;
                  })()
                : Component;

        const name = (() => {
            const { name } = Component_;

            return typeof name === "string" ? name : undefined;
        })();

        const useStyles = makeStyles<Props, any>(params)(
            typeof cssObjectByRuleNameOrGetCssObjectByRuleName === "function"
                ? (theme: Theme, props: Props, classes: Record<any, string>) =>
                      incorporateMediaQueries(
                          cssObjectByRuleNameOrGetCssObjectByRuleName(
                              theme,
                              props,
                              classes,
                          ),
                      ) as any
                : (incorporateMediaQueries(
                      cssObjectByRuleNameOrGetCssObjectByRuleName,
                  ) as any),
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Out = forwardRef<any, Props>(function (props, ref) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { className, classes: _classes, ...rest } = props;

            const { classes, cx } = useStyles(props, { props });

            return (
                <Component_
                    ref={ref}
                    className={cx(...Object.keys(classes), className)}
                    {...(typeof Component === "string" ? {} : { classes })}
                    {...rest}
                />
            );
        });

        if (name !== undefined) {
            Object.defineProperty(Out, "name", {
                "value": `${name}WithStyles`,
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Out as any;
    }

    return { withStyles };
}

function incorporateMediaQueries(
    cssObjectByRuleNameWithMediaQueries: {
        [RuleName_ in string]?: CSSObject;
    } & {
        [mediaQuery: `@media${string}`]: { [RuleName_ in string]?: CSSObject };
    },
): { [RuleName_ in string]: CSSObject } {
    const cssObjectByRuleName: { [RuleName_ in string]: CSSObject } = {};

    const cssObjectByRuleNameWithMediaQueriesByMediaQuery: {
        [mediaQuery: `@media${string}`]: { [RuleName_ in string]?: CSSObject };
    } = {};

    Object.keys(cssObjectByRuleNameWithMediaQueries).forEach(
        ruleNameOrMediaQuery =>
            ((ruleNameOrMediaQuery.startsWith("@media")
                ? (cssObjectByRuleNameWithMediaQueriesByMediaQuery as any)
                : (cssObjectByRuleName as any))[ruleNameOrMediaQuery] =
                cssObjectByRuleNameWithMediaQueries[ruleNameOrMediaQuery]),
    );

    Object.keys(cssObjectByRuleNameWithMediaQueriesByMediaQuery).forEach(
        mediaQuery => {
            const cssObjectByRuleNameBis =
                cssObjectByRuleNameWithMediaQueriesByMediaQuery[
                    mediaQuery as any
                ];

            Object.keys(cssObjectByRuleNameBis).forEach(
                ruleName =>
                    (cssObjectByRuleName[ruleName] = {
                        ...(cssObjectByRuleName[ruleName] ?? {}),
                        [mediaQuery]: cssObjectByRuleNameBis[ruleName],
                    }),
            );
        },
    );

    return cssObjectByRuleName;
}
