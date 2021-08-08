import { createMakeStyles as createMakeStylesBase } from "./createMakeStyles";
export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "./types";
import { createUseCssAndCx } from "./createUseCssAndCx";
import { serializeStyles } from "@emotion/serialize";
import { insertStyles, getRegisteredStyles } from "@emotion/utils";
import { defaultEmotionCache } from "./defaultEmotionCache";
import { useEmotionCache } from "./@emotion/react";

const { useCssAndCx } = createUseCssAndCx({
    getRegisteredStyles,
    insertStyles,
    serializeStyles,
    useEmotionCache,
    defaultEmotionCache,
});

/** https://github.com/garronej/tss-react */
export function createMakeStyles<Theme>(params: { useTheme(): Theme }) {
    const { useTheme } = params;

    const { makeStyles } = createMakeStylesBase({ useTheme, useCssAndCx });

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
