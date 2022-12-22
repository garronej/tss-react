"use client";

import type { EmotionCache } from "@emotion/cache";
export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "./types";
import { createMakeStyles, TssCacheProvider } from "./makeStyles";
export { createMakeStyles, TssCacheProvider };
import { createWithStyles } from "./withStyles_compat";
export { createWithStyles };

/** @see <https://docs.tss-react.dev/api/keyframes> */
export { keyframes } from "@emotion/react";

/** @see <https://docs.tss-react.dev/api/globalstyles> */
export { GlobalStyles } from "./GlobalStyles";

/** @see <https://docs.tss-react.dev/api/makestyles> */
export function createMakeAndWithStyles<Theme>(params: {
    useTheme: () => Theme;
    cache?: EmotionCache;
}) {
    return {
        ...createMakeStyles(params),
        ...createWithStyles(params),
    };
}
