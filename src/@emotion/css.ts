export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "../types";
import { cssAndCxFactory } from "../cssAndCx";
import { getCache } from "../cache";

/** NOTE: These function use the default cache ("tss-react/cache") */
export const { css, cx } = cssAndCxFactory({
    "cache": getCache(),
});

export { keyframes } from "@emotion/react";
