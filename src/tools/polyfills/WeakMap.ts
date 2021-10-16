/* eslint-disable @typescript-eslint/ban-types */

import { Polyfill as MapPolyfill } from "./Map";

export const Polyfill: { new <K extends object, V>(): WeakMap<K, V> } =
    typeof WeakMap !== "undefined" ? WeakMap : MapPolyfill;
