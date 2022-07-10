import type { EmotionCache } from "@emotion/cache";
export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "./types";
import { createMakeStyles } from "./makeStyles";
export { createMakeStyles };
import { createWithStyles } from "./withStyles_compat";
export { createWithStyles };

/** @see <https://docs.tss-react.dev/api-references/keyframes> */
export { keyframes } from "@emotion/react";

/** @see <https://docs.tss-react.dev/api-references/globalstyles> */
export { GlobalStyles } from "./GlobalStyles";

/** @see <https://docs.tss-react.dev/api-references/makestyles-usestyles> */
export function createMakeAndWithStyles<Theme>(params: {
    useTheme: () => Theme;
    cache?: EmotionCache;
}) {
    return {
        ...createMakeStyles(params),
        ...createWithStyles(params),
    };
}
