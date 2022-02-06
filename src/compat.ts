export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "./types";
export { useCssAndCx } from "./cssAndCx";
export { useMergedClasses } from "./mergeClasses";
import { createMakeStyles } from "./makeStyles";
export { createMakeStyles };
import { createWithStyles } from "./withStyles_compat";
export { createWithStyles };

/** @see <https://docs.tss-react.dev/api-references/keyframes> */
export { keyframes } from "@emotion/react";
/** @see <https://docs.tss-react.dev/api-references/globalstyles> */
export { GlobalStyles } from "./GlobalStyles";
/** @see <https://docs.tss-react.dev/cache> */
export { getTssDefaultEmotionCache, TssCacheProvider } from "./cache";

/** @see <https://docs.tss-react.dev/api-references/makestyles-usestyles> */
export function createMakeAndWithStyles<Theme>(params: {
    useTheme: () => Theme;
}) {
    return {
        ...createMakeStyles(params),
        ...createWithStyles(params),
    };
}
