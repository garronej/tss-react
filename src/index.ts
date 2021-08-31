import { createMakeStyles as createMakeStylesBase } from "./createMakeStyles";
export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "./types";
import type { EmotionCache } from "@emotion/cache";
import { useEmotionCache } from "./@emotion/react";
import { getCache } from "./cache";
import { createUseCssAndCx } from "./cssAndCx";

/** https://github.com/garronej/tss-react */
export function createMakeStyles<Theme>(params: {
    useTheme(): Theme;
    cache?: EmotionCache;
}) {
    const { useTheme, cache } = params;

    const { useCssAndCx } = createUseCssAndCx({
        "useEmotionCache":
            cache !== undefined
                ? () => cache
                : () => useEmotionCache() ?? getCache(),
    });

    const { makeStyles } = createMakeStylesBase({
        useTheme,
        useCssAndCx,
    });

    function useStyles() {
        const theme = useTheme();
        const { css, cx } = useCssAndCx();
        return { theme, css, cx };
    }

    return { makeStyles, useStyles };
}

/** Reexport from @emotion/react */
export { keyframes } from "@emotion/react";

export { GlobalStyles } from "./GlobalStyles";

/** Will pickup the cache from the context or use the default cache */
export const { useCssAndCx } = createUseCssAndCx({
    "useEmotionCache": () => useEmotionCache() ?? getCache(),
});
