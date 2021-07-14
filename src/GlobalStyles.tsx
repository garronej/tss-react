import * as reactEmotion from "@emotion/react";
import type { CSSInterpolation } from "./types";

export function GlobalStyles(props: { styles: CSSInterpolation }) {
    const { styles } = props;

    return <reactEmotion.Global styles={reactEmotion.css(styles)} />;
}
