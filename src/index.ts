import { createMakeStyles as createMakeStylesBase } from "./createMakeStyles";
export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "./types";
import { createUseCssAndCx } from "./createUseCssAndCx";
import { serializeStyles } from "@emotion/serialize";
import { insertStyles, getRegisteredStyles } from "@emotion/utils";
import type { EmotionCache } from "@emotion/cache";
import { useEmotionCache } from "./@emotion/react";
import { getCache } from "./cache";

/** https://github.com/garronej/tss-react */
export function createMakeStyles<Theme>(params: {
    useTheme(): Theme;
    cache?: EmotionCache;
}) {
    const { useTheme, cache } = params;

    const { useCssAndCx } = createUseCssAndCx({
        getRegisteredStyles,
        insertStyles,
        serializeStyles,
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
