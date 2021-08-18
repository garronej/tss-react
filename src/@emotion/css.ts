export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "../types";
import { createCssAndCxFactory } from "../cssAndCx";
import { serializeStyles } from "@emotion/serialize";
import { insertStyles, getRegisteredStyles } from "@emotion/utils";
import { getCache } from "../cache";

const { cssAndCxFactory } = createCssAndCxFactory({
    getRegisteredStyles,
    insertStyles,
    serializeStyles,
});

/** NOTE: These function use the default cache ("tss-react/cache") */
export const { css, cx } = cssAndCxFactory({
    "cache": getCache(),
});

export { keyframes } from "@emotion/react";
