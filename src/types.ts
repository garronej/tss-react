import type { CSSObject } from "./tools/types/CSSObject";
export type { CSSObject };
import type { CSSInterpolation } from "./tools/types/CSSObject";
export type { CSSInterpolation };
export interface Css {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string;
    (...args: CSSInterpolation[]): string;
}

import { CxArg } from "./tools/classnames";
export { CxArg };

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
