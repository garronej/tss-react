

export type { ArrayCSSInterpolation, CSSObject, CSSInterpolation, CSSStyleSheet, ComponentSelector, EmotionCache } from "@emotion/css";
export  { cache, flush, getRegisteredStyles, hydrate, injectGlobal, keyframes, merge, sheet } from "@emotion/css";
import { cx as cx_ } from "@emotion/css";

export interface ArrayClassNamesArg extends Array<ClassNamesArg> {}

export type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | { [className: string]: boolean | null | undefined }
  | ArrayClassNamesArg;

//SEE: https://github.com/emotion-js/emotion/pull/2276
export const cx: (...classNames: Array<ClassNamesArg>)=>  string = cx_ as any;

import { css } from "@emotion/css"; export { css };
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


