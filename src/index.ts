import { createMakeStyle as createMakeStyleBase } from "./createMakeStyle";
export type { CSSInterpolation, CSSObject, Css, Cx, CxArg } from "./types";

import { serializeStyles } from "@emotion/serialize";
import { insertStyles, getRegisteredStyles } from "@emotion/utils";
import { createCssAndCx } from "./createCssAndCx";
import { cache } from "./cache";

export const { css, cx } = createCssAndCx({
    cache,
    getRegisteredStyles,
    insertStyles,
    serializeStyles,
});

/** https://github.com/garronej/tss-react */
export function createMakeStyle<Theme>(params: { useTheme(): Theme }) {
    const { useTheme } = params;

    return createMakeStyleBase({ useTheme, css, cx });
}

/** Reexport from @emotion/react */
export { keyframes } from "@emotion/react";
