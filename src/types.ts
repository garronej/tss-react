
import type { ClassNamesContent } from "@emotion/react"; 
export type { ClassNamesContent };
export type { CSSObject } from "@emotion/react";
export type Css = ClassNamesContent["css"];

import { CxArg } from "./tools/classnames";
export { CxArg };

//SEE: https://github.com/emotion-js/emotion/pull/2276
export type Cx = (...classNames: CxArg[]) => string;
