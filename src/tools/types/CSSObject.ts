
/** 
 * Copy of { CSSObject } from "@emotion/react" except 
 * for the ref property that is specific to tss-react
 */
export interface CSSObject
  extends CSSPropertiesWithMultiValues,
  CSSPseudos,
  CSSOthersObject,
  CSSTssSpecials { }

export type CSSTssSpecials = {
  /** Property for tss-react that enable to select children by class name */
  ref?: string;
}


import * as CSS from "./csstype";

export type CSSProperties = CSS.PropertiesFallback<number | string>
export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]:
  | CSSProperties[K]
  | Array<Extract<CSSProperties[K], string>>
}

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

export interface ArrayCSSInterpolation extends Array<CSSInterpolation> { }

export interface ComponentSelector {
  __emotion_styles: any
}

export type Keyframes = {
  name: string
  styles: string
  anim: number
  toString: () => string
} & string

export interface SerializedStyles {
  name: string
  styles: string
  map?: string
  next?: SerializedStyles
}

export type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject


export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation

export interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation
}
