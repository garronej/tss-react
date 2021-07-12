import "./tools/Object.fromEntries";
import { classnames } from "./tools/classnames";
import type { Cx, Css } from "./types";
import type * as emotionReact from "@emotion/react";
import type * as emotionSerialize from "@emotion/serialize";
import type * as emotionUtils from "@emotion/utils";

export function createCssAndCx(params: {
    serializeStyles: typeof emotionSerialize.serializeStyles;
    insertStyles: typeof emotionUtils.insertStyles;
    getRegisteredStyles: typeof emotionUtils.getRegisteredStyles;
    cache: emotionReact.EmotionCache;
}) {
    const { serializeStyles, insertStyles, getRegisteredStyles, cache } =
        params;

    const css: Css = (...args) => {
        const serialized = serializeStyles(args, cache.registered);
        insertStyles(cache, serialized, false);
        return `${cache.key}-${serialized.name}`;
    };

    const { cx } = (() => {
        function merge(
            registered: emotionSerialize.RegisteredCache,
            css: Css,
            className: string,
        ) {
            const registeredStyles: string[] = [];

            const rawClassName = getRegisteredStyles(
                registered,
                registeredStyles,
                className,
            );

            if (registeredStyles.length < 2) {
                return className;
            }

            return rawClassName + css(registeredStyles);
        }

        const cx: Cx = (...args) =>
            merge(cache.registered, css, classnames(args));

        return { cx };
    })();

    return { css, cx };
}
