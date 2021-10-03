import type { FC, ComponentClass } from "react";

export type ReactComponent<Props> =
    | ((props: Props) => ReturnType<FC>)
    | ComponentClass<Props>;
