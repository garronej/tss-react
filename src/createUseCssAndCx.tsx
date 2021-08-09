import "./tools/Object.fromEntries";
import { classnames } from "./tools/classnames";
import type { Cx, Css } from "./types";
import type * as emotionSerialize from "@emotion/serialize";
import type * as emotionUtils from "@emotion/utils";
import { useSemanticGuaranteeMemo } from "./tools/useSemanticGuaranteeMemo";
import type { EmotionCache } from "@emotion/cache";

export function createUseCssAndCx(params: {
    serializeStyles: typeof emotionSerialize.serializeStyles;
    insertStyles: typeof emotionUtils.insertStyles;
    getRegisteredStyles: typeof emotionUtils.getRegisteredStyles;
    useEmotionCache(): EmotionCache;
}) {
    const {
        serializeStyles,
        insertStyles,
        getRegisteredStyles,
        useEmotionCache,
    } = params;

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

    function useCssAndCx() {
        const cache = useEmotionCache();

        const css = useSemanticGuaranteeMemo<Css>(
            () =>
                (...args) => {
                    const serialized = serializeStyles(args, cache.registered);
                    insertStyles(cache, serialized, false);
                    return `${cache.key}-${serialized.name}`;
                },
            [cache],
        );

        const cx = useSemanticGuaranteeMemo<Cx>(
            () =>
                (...args) =>
                    merge(cache.registered, css, classnames(args)),
            [cache],
        );

        return { css, cx };
    }

    return { useCssAndCx };
}
