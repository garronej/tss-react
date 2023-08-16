import { useMemo } from "react";
import type { CSSInterpolation } from "../types";
import { getDependencyArrayRef } from "../tools/getDependencyArrayRef";
import { mergeClasses } from "../mergeClasses";
import type { Tss } from "../tss";

export type MuiThemeStyleOverridesPluginParams = {
    muiStyleOverridesParams?: {
        props: Record<string, unknown>;
        ownerState?: Record<string, unknown>;
    };
};

export type MuiThemeLike = {
    components?: Record<string, any>;
};

export const useMuiThemeStyleOverridesPlugin: Tss.UsePlugin<
    { theme: MuiThemeLike },
    MuiThemeStyleOverridesPluginParams
> = ({ classes, theme, muiStyleOverridesParams, css, cx, name }) => {
    require_named: {
        // NOTE: Hack for backwards compatibility with the makeStyles API.
        if (name === "makeStyle no name") {
            name = undefined;
            break require_named;
        }

        if (muiStyleOverridesParams !== undefined && name === undefined) {
            throw new Error(
                "To use muiStyleOverridesParams, you must specify a name using .withName('MyComponent')"
            );
        }
    }

    let styleOverrides:
        | Record<
              string /* E.g: "root" */,
              | CSSInterpolation
              | ((params: {
                    ownerState: any;
                    theme: MuiThemeLike;
                }) => CSSInterpolation)
          >
        | undefined = undefined;

    try {
        styleOverrides =
            name === undefined
                ? undefined
                : theme.components?.[name as "MuiAccordion" /*example*/]
                      ?.styleOverrides || undefined;

        // eslint-disable-next-line no-empty
    } catch {}

    const classesFromThemeStyleOverrides = useMemo(() => {
        if (styleOverrides === undefined) {
            return undefined;
        }

        const themeClasses: Record<string, string> = {};

        for (const ruleName in styleOverrides) {
            const cssObjectOrGetCssObject = styleOverrides[ruleName];

            if (!(cssObjectOrGetCssObject instanceof Object)) {
                continue;
            }

            themeClasses[ruleName] = css(
                typeof cssObjectOrGetCssObject === "function"
                    ? cssObjectOrGetCssObject({
                          theme,
                          "ownerState": muiStyleOverridesParams?.ownerState,
                          ...muiStyleOverridesParams?.props
                      })
                    : cssObjectOrGetCssObject
            );
        }

        return themeClasses;
    }, [
        styleOverrides,
        getDependencyArrayRef(muiStyleOverridesParams?.props),
        getDependencyArrayRef(muiStyleOverridesParams?.ownerState),
        css
    ]);

    classes = useMemo(
        () => mergeClasses(classes, classesFromThemeStyleOverrides, cx),
        [classes, classesFromThemeStyleOverrides, cx]
    );

    return { classes };
};
