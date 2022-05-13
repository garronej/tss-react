import { CSSObject } from "./types";
export { CSSObject };
export type { CSSInterpolation, Css, Cx, CxArg } from "./types";
/** @see <https://docs.tss-react.dev/api-references> */
export { useCssAndCx } from "./cssAndCx";
export { useMergedClasses } from "./mergeClasses";
import { createMakeStyles } from "./makeStyles";
export { createMakeStyles };
import { createWithStyles } from "./withStyles";
export { createWithStyles };

/** @see <https://docs.tss-react.dev/api-references/keyframes> */
export { keyframes } from "@emotion/react";

/** @see <https://docs.tss-react.dev/api-references/globalstyles> */
export { GlobalStyles } from "./GlobalStyles";

/** @see <https://docs.tss-react.dev/cache> */
export { getTssDefaultEmotionCache, TssCacheProvider } from "./cache";

/** @see <https://docs.tss-react.dev/api-references/makestyles-usestyles> */
export function createMakeAndWithStyles<
    Theme,
    CustomObject = CSSObject,
>(params: {
    useTheme: () => Theme;
    customObjectToCSSObject?: (params: {
        customObject: CustomObject;
        theme: Theme;
    }) => CSSObject;
}) {
    return {
        ...createMakeStyles(params),
        ...createWithStyles(params),
    };
}
