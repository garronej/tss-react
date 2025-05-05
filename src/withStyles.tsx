/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, createElement } from "react";
import type { ReactHTML } from "./tools/ReactHTML";
import type { ReactComponent } from "./tools/ReactComponent";
import type { CSSObject } from "./types";
import { createMakeStyles } from "./makeStyles";
import { capitalize } from "./tools/capitalize";
import type { EmotionCache } from "@emotion/cache";

export function createWithStyles<Theme>(params: {
    useTheme: () => Theme;
    cache?: EmotionCache;
}) {
    const { useTheme, cache } = params;

    const { makeStyles } = createMakeStyles({ useTheme, cache });

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
              }
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
                  >
              ) => CssObjectByRuleName),
        params?: { name?: string | Record<string, unknown>; uniqId?: string }
    ): C extends keyof ReactHTML ? ReactHTML[C] : C {
        const Component_: ReactComponent<any> =
            typeof Component === "string"
                ? (() => {
                      const tag = Component as keyof ReactHTML;

                      const Out = function ({ children, ...props }: any) {
                          return createElement(tag, props, children);
                      };

                      Object.defineProperty(Out, "name", {
                          "value": capitalize(tag)
                      });

                      return Out;
                  })()
                : Component;

        /**
         * Get component name for wrapping
         * @see https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
         */
        const name: string | undefined = (() => {
            {
                const { name: nameOrWrappedName } = params ?? {};

                if (nameOrWrappedName !== undefined) {
                    return typeof nameOrWrappedName !== "object"
                        ? nameOrWrappedName
                        : Object.keys(nameOrWrappedName)[0];
                }
            }

            let name: string | undefined = undefined;

            displayName: {
                const displayName = (Component_ as any).displayName;

                if (typeof displayName !== "string" || displayName === "") {
                    break displayName;
                }

                name = displayName;
            }

            functionName: {
                if (name !== undefined) {
                    break functionName;
                }

                const functionName = Component_.name;

                if (typeof functionName !== "string" || functionName === "") {
                    break functionName;
                }

                name = functionName;
            }

            if (name === undefined) {
                return undefined;
            }

            // Special case for dollar sign
            name = name.replace(/\$/g, "usd");
            // Replacing open and close parentheses
            name = name.replace(/\(/g, "_").replace(/\)/g, "_");
            // Catch-all replacement for characters not allowed in CSS class names
            name = name.replace(/[^a-zA-Z0-9-_]/g, "_");

            return name;
        })();

        const useStyles = makeStyles<Props, any>({ ...params, name })(
            typeof cssObjectByRuleNameOrGetCssObjectByRuleName === "function"
                ? (theme: Theme, props: Props, classes: Record<any, string>) =>
                      incorporateMediaQueries(
                          cssObjectByRuleNameOrGetCssObjectByRuleName(
                              theme,
                              props,
                              classes
                          )
                      ) as any
                : (incorporateMediaQueries(
                      cssObjectByRuleNameOrGetCssObjectByRuleName
                  ) as any)
        );

        function getHasNonRootClasses(classes: Record<string, string>) {
            for (const name in classes) {
                if (name === "root") {
                    continue;
                }

                return true;
            }

            return false;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Out = forwardRef<any, Props>(function (props, ref) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { className, classes: _classes, ...rest } = props;

            const { classes, cx } = useStyles(props, { props });

            const rootClassName = cx(classes.root, className);

            fixedClassesByClasses.set(classes, {
                ...classes,
                "root": rootClassName
            });

            return (
                <Component_
                    ref={ref}
                    className={
                        getHasNonRootClasses(classes)
                            ? className
                            : rootClassName
                    }
                    {...(typeof Component === "string" ? {} : { classes })}
                    {...rest}
                />
            );
        });

        if (name !== undefined) {
            Out.displayName = `${capitalize(name)}WithStyles`;

            Object.defineProperty(Out, "name", { "value": Out.displayName });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Out as any;
    }

    withStyles.getClasses = getClasses;

    return { withStyles };
}

const fixedClassesByClasses = new WeakMap<any, Record<string, string>>();

const errorMessageGetClasses =
    "getClasses should only be used in conjunction with withStyles";

function getClasses<Classes>(props: {
    className?: string;
    classes?: Classes;
}): Classes extends Record<string, unknown>
    ? Classes extends Partial<Record<infer K, any>>
        ? Record<K, string>
        : Classes
    : { root: string } {
    const classesIn = props.classes;

    if (classesIn === undefined) {
        throw new Error(errorMessageGetClasses);
    }

    const classes = fixedClassesByClasses.get(classesIn);

    if (classes === undefined) {
        throw new Error(errorMessageGetClasses);
    }

    return classes as any;
}

function incorporateMediaQueries(
    cssObjectByRuleNameWithMediaQueries: {
        [RuleName_ in string]?: CSSObject;
    } & {
        [mediaQuery: `@media${string}`]: { [RuleName_ in string]?: CSSObject };
    }
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
                cssObjectByRuleNameWithMediaQueries[ruleNameOrMediaQuery])
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
                        [mediaQuery]: cssObjectByRuleNameBis[ruleName]
                    })
            );
        }
    );

    return cssObjectByRuleName;
}
