import * as reactEmotion from "@emotion/react";
import type { CSSInterpolation } from "./types";

export function GlobalStyles(props: { children: CSSInterpolation }) {
    const { children } = props;

    return <reactEmotion.Global styles={reactEmotion.css(children)} />;
}
