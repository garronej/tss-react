export type { CSSObject } from "./tools/types/CSSObject";
import type { CSSInterpolation } from "./tools/types/CSSObject";
export { CSSInterpolation };

export interface Css {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string;
    (...args: CSSInterpolation[]): string;
}

import { CxArg } from "./tools/classnames";
export { CxArg };

//SEE: https://github.com/emotion-js/emotion/pull/2276
export type Cx = (...classNames: CxArg[]) => string;
