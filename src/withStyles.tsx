/* eslint-disable @typescript-eslint/no-explicit-any */

import { forwardRef } from "react";
import type { ReactComponent } from "./tools/ReactComponent";
import type { CSSObject } from "./types";
import { createMakeStyles } from "./createMakeStyles";

export function createWithStyles<Theme>(params: { useTheme(): Theme }) {
    const { useTheme } = params;

    const { makeStyles } = createMakeStyles({ useTheme });

    function withStyles<
        C extends ReactComponent<any>,
        Props extends C extends ReactComponent<infer P> ? P : never,
        CssObjectByRuleName extends Props extends {
            classes?: Partial<infer ClassNameByRuleName>;
        }
            ? { [Key in keyof ClassNameByRuleName]?: CSSObject } & {
                  [mediaQuery: `@media${string}`]: {
                      [Key in keyof ClassNameByRuleName]?: CSSObject;
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
                  createRef: () => string,
              ) => CssObjectByRuleName),
    ): C {
        /*
    function withStyles<
        C extends ReactComponent<any>,
        Props extends C extends ReactComponent<infer P> ? P : never,
        CssObjectByRuleName extends Props extends { classes?: Partial<infer ClassNameByRuleName>; } ?
            { [Key in keyof ClassNameByRuleName]?: CSSObject; }  :
            never
    >(
        Component: C,
        cssObjectByRuleNameOrGetCssObjectByRuleName:
            CssObjectByRuleName & { [mediaQuery: `@media${string}`]: { [Key in keyof CssObjectByRuleName]?: CSSObject; }; }
            | ((
                theme: Theme,
                props: Props,
                createRef: () => string,
            ) => CssObjectByRuleName),
    ): C {
        */

        /*
    function withStyles<
        C extends ReactComponent<any>,
        Props extends C extends ReactComponent<infer P> ? P : never,
        CssObjectByRuleName extends Props extends { classes?: Partial<infer ClassNameByRuleName>; } ?
            { [Key in keyof ClassNameByRuleName]?: CSSObject; } & 
                { [mediaQuery: `@media${string}`]: { [Key in keyof ClassNameByRuleName]?: CSSObject; }  } :
            never
    >(
        Component: C,
        cssObjectByRuleNameOrGetCssObjectByRuleName:
            CssObjectByRuleName 
            | ((
                theme: Theme,
                props: Props,
                createRef: () => string,
            ) => CssObjectByRuleName),
    ): C {
        /*

        return null as any;


        /*
        const useStyles = makeStyles<Props>()(
            typeof cssObjectOrGetCssObject === "function"
                ? (theme: Theme, props: Props, createRef: () => string) => ({
                      "root": cssObjectOrGetCssObject(theme, props, createRef),
                  })
                : { "root": cssObjectOrGetCssObject },
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Out = forwardRef<any, Props>(function (props, ref) {
            const { classes, cx } = useStyles(props);

            const { className, ...rest } = props;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Component_: ReactComponent<any> = Component;

            return (
                <Component_
                    ref={ref}
                    className={cx(classes.root, className)}
                    {...rest}
                />
            );
        });

        const { name } = Component;

        if (typeof name === "string") {
            Object.defineProperty(Out, "name", {
                "value": `${name}WithStyles`,
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Out as any;
        */

        return null as any;
    }

    return { withStyles };
}
