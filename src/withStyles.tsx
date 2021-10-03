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
        const cssObjectByRuleNameOrGetCssObjectByRuleName_ =
            cssObjectByRuleNameOrGetCssObjectByRuleName as
                | Record<string, CSSObject>
                | ((
                      theme: Theme,
                      props: Props,
                      createRef: () => string,
                  ) => Record<string, CSSObject>);

        const Component_: ReactComponent<any> = Component;

        const useStyles = makeStyles<Props>()(
            typeof cssObjectByRuleNameOrGetCssObjectByRuleName_ === "function"
                ? (theme: Theme, props: Props, createRef: () => string) =>
                      cssObjectByRuleNameOrGetCssObjectByRuleName_(
                          theme,
                          props,
                          createRef,
                      )
                : cssObjectByRuleNameOrGetCssObjectByRuleName_,
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Out = forwardRef<any, Props>(function (props, ref) {
            const { classes, cx } = useStyles(props);

            const { className, ...rest } = props;

            return (
                <Component_
                    ref={ref}
                    className={cx(classes.root, className)}
                    classes={classes}
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
    }

    return { withStyles };
}
