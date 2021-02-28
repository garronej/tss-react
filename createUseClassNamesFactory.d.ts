import "./tools/Object.fromEntries";
import type { CSSObject } from "@emotion/css";
/**
 * https://github.com/garronej/tss-react
 * */
export declare function createUseClassNamesFactory<Theme extends Object = {}>(params: {
    useTheme(): Theme;
    /** The css function as in: import { css } from "@emotion/css" */
    css(cssObject: CSSObject): string;
}): {
    createUseClassNames: <Params extends Record<string, unknown>>() => <Key extends string>(getCssObjects: (theme: Theme, params: Params) => Record<Key, CSSObject>) => {
        useClassNames: (params: Params) => {
            classNames: Record<Key, string>;
        };
    };
};
