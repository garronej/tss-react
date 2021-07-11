
import { createMakeStyle as createMakeStyleBase } from "./createMakeStyle";
export type { ClassNamesContent, CxArg, Css, Cx, CSSObject } from "./types";

import { CacheProvider } from "@emotion/react";
import { serializeStyles } from "@emotion/serialize";
import { insertStyles, getRegisteredStyles } from "@emotion/utils";
import { cache } from "./cache";

/** https://github.com/garronej/tss-react */
export function createMakeStyle<Theme>(
    params: {
        useTheme(): Theme;
    }
) {

    const { useTheme } = params;

    return createMakeStyleBase({
        useTheme,
        CacheProvider,
        serializeStyles,
        insertStyles,
        getRegisteredStyles,
        cache
    });

}
