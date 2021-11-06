import type {
    CSSObject as CSSObjectStandard,
    CSSInterpolation,
} from "@emotion/serialize";

export type { CSSInterpolation } from "@emotion/serialize";

export type CSSObjectTssSpecials = {
    /** Property for tss-react that enable to select children by class name */
    ref?: string;
};

export interface CSSObject extends CSSObjectStandard, CSSObjectTssSpecials {}

export interface Css {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string;
    (...args: CSSInterpolation[]): string;
}

import { CxArg } from "./tools/classnames";
export { CxArg } from "./tools/classnames";

//SEE: https://github.com/emotion-js/emotion/pull/2276
export type Cx = (...classNames: CxArg[]) => string;

export function matchCSSObject(
    arg: TemplateStringsArray | CSSInterpolation,
): arg is CSSObject {
    return (
        arg instanceof Object &&
        !("styles" in arg) &&
        !("length" in arg) &&
        !("__emotion_styles" in arg)
    );
}
