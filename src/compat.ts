export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "./types";
export { useCssAndCx } from "./cssAndCx";
import { createMakeStyles } from "./makeStyles";
export { createMakeStyles };
import { createWithStyles } from "./withStyles_compat";
export { createWithStyles };
/** Reexport from @emotion/react */
export { keyframes } from "@emotion/react";
export { GlobalStyles } from "./GlobalStyles";
export { getTssDefaultEmotionCache, TssCacheProvider } from "./cache";

export function createMakeAndWithStyles<Theme>(params: {
    useTheme: () => Theme;
}) {
    return {
        ...createMakeStyles(params),
        ...createWithStyles(params),
    };
}
