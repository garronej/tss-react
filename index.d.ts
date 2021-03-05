export type { ArrayCSSInterpolation, CSSObject, CSSInterpolation, CSSStyleSheet, ComponentSelector, EmotionCache } from "@emotion/css";
export { cache, flush, getRegisteredStyles, hydrate, injectGlobal, keyframes, merge, sheet } from "@emotion/css";
export interface ArrayClassNamesArg extends Array<ClassNamesArg> {
}
export declare type ClassNamesArg = undefined | null | string | boolean | {
    [className: string]: boolean | null | undefined;
} | ArrayClassNamesArg;
export declare const cx: (...classNames: Array<ClassNamesArg>) => string;
import { css } from "@emotion/css";
export { css };
/** https://github.com/garronej/tss-react */
export declare function createUseClassNamesFactory<Theme extends Object = {}>(params: {
    useTheme(): Theme;
}): {
    createUseClassNames: <Params extends Record<string, unknown>>() => <Key extends string>(getCssObjects: (theme: Theme, params: Params) => Record<Key, import("@emotion/serialize").CSSObject>) => {
        useClassNames: (params: Params) => {
            classNames: Record<Key, string>;
        };
    };
};
