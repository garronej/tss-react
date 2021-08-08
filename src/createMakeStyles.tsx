import "./tools/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import type { CSSObject } from "./types";
import { Css, Cx } from "./types";

/**
 * @see {@link https://github.com/garronej/tss-react}
 */
export function createMakeStyles<Theme>(params: {
    useTheme(): Theme;
    useCssAndCx(): { css: Css; cx: Cx };
}) {
    const { useTheme, useCssAndCx } = params;

    /** returns useStyle. */
    function makeStyles<Params = void>() {
        return function <Key extends string>(
            getCssObjectOrCssObject:
                | ((theme: Theme, params: Params) => Record<Key, CSSObject>)
                | Record<Key, CSSObject>,
        ) {
            const getCssObject =
                typeof getCssObjectOrCssObject === "function"
                    ? getCssObjectOrCssObject
                    : () => getCssObjectOrCssObject;

            function useStyles(params: Params) {
                const theme = useTheme();

                const { css, cx } = useCssAndCx();

                const cssObject = getCssObject(theme, params);

                const classes = Object.fromEntries(
                    objectKeys(cssObject).map(key => [
                        key,
                        css(cssObject[key]),
                    ]),
                ) as Record<Key, string>;

                return {
                    classes,
                    theme,
                    css,
                    cx,
                };
            }

            return useStyles;
        };
    }

    return { makeStyles };
}
