import "./tools/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import type { CSSObject } from "./types";
import { useCssAndCx } from "./cssAndCx";

/**
 * @see {@link https://github.com/garronej/tss-react}
 */
export function createMakeStyles<Theme>(params: { useTheme(): Theme }) {
    const { useTheme } = params;

    /** returns useStyle. */
    function makeStyles<Params = void>() {
        return function <Key extends string>(
            getCssObjectOrCssObject:
                | ((
                      theme: Theme,
                      params: Params,
                      createRef: () => string,
                  ) => Record<Key, CSSObject>)
                | Record<Key, CSSObject>,
        ) {
            const getCssObject =
                typeof getCssObjectOrCssObject === "function"
                    ? getCssObjectOrCssObject
                    : () => getCssObjectOrCssObject;

            function useStyles(params: Params) {
                const theme = useTheme();

                const { cx, css } = useCssAndCx();

                let count = 0;

                function createRef() {
                    return `tss-react-ref_${count++}`;
                }

                const cssObject = getCssObject(theme, params, createRef);

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

    function useStyles() {
        const theme = useTheme();
        const { css, cx } = useCssAndCx();
        return { theme, css, cx };
    }

    return { makeStyles, useStyles };
}
