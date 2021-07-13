import "./tools/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import type { CSSObject } from "./types";
import { Css, Cx } from "./types";

/** https://github.com/garronej/tss-react */
export function createMakeStyles<Theme>(params: {
    useTheme(): Theme;
    css: Css;
    cx: Cx;
}) {
    const { useTheme, css, cx } = params;

    function makeStyles<Params = void>() {
        return function <Key extends string>(
            getCssObjects:
                | ((theme: Theme, params: Params) => Record<Key, CSSObject>)
                | Record<Key, CSSObject>,
        ) {
            function useStyles(params: Params) {
                const theme = useTheme();

                const cssObjects =
                    typeof getCssObjects === "function"
                        ? getCssObjects(theme, params)
                        : getCssObjects;

                const classes = Object.fromEntries(
                    objectKeys(cssObjects).map(key => [
                        key,
                        css(cssObjects[key]),
                    ]),
                ) as Record<Key, string>;

                return {
                    classes,
                    theme,
                    css,
                    cx,
                };
            }

            //TODO: Return for composition as well.
            return { useStyles };
        };
    }

    return { makeStyles };
}
