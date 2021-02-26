
export * from "@emotion/css";

import { css } from "@emotion/css";
import { createUseClassNamesFactory as createUseClassNamesFactoryNeedsCssFn } from "./createUseClassNamesFactory";

/** https://github.com/garronej/tss-react */
export function createUseClassNamesFactory<Theme extends Object = {}>(
    params: {
        useTheme(): Theme;
    }
) {

    const { useTheme } = params;
    
    return createUseClassNamesFactoryNeedsCssFn({ useTheme, css });

}


