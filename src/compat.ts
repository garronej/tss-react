import { createMakeStyles } from "./makeStyles";
import { createWithStyles } from "./withStyles_compat";

export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "./types";
export { useCssAndCx } from "./cssAndCx";
export { createMakeStyles, MakeStylesOptions } from "./makeStyles";
export { createWithStyles } from "./withStyles_compat";
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
