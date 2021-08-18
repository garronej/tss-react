import "./tools/Object.fromEntries";
import { classnames } from "./tools/classnames";
import type { Cx, Css } from "./types";
import type * as emotionSerialize from "@emotion/serialize";
import type * as emotionUtils from "@emotion/utils";
import { useSemanticGuaranteeMemo } from "./tools/useSemanticGuaranteeMemo";
import type { EmotionCache } from "@emotion/cache";

export const { createCssAndCxFactory } = (() => {
    function createMerge(params: {
        getRegisteredStyles: typeof emotionUtils.getRegisteredStyles;
    }) {
        const { getRegisteredStyles } = params;

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

        return { merge };
    }

    function createCssAndCxFactory(params: {
        serializeStyles: typeof emotionSerialize.serializeStyles;
        insertStyles: typeof emotionUtils.insertStyles;
        getRegisteredStyles: typeof emotionUtils.getRegisteredStyles;
    }) {
        const { serializeStyles, insertStyles, getRegisteredStyles } = params;

        const { merge } = createMerge({ getRegisteredStyles });

        function cssAndCxFactory(params: { cache: EmotionCache }) {
            const { cache } = params;

            const css: Css = (...args) => {
                const serialized = serializeStyles(args, cache.registered);
                insertStyles(cache, serialized, false);
                return `${cache.key}-${serialized.name}`;
            };

            const cx: Cx = (...args) =>
                merge(cache.registered, css, classnames(args));

            return { css, cx };
        }

        return { cssAndCxFactory };
    }

    return { createCssAndCxFactory };
})();

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

    const { cssAndCxFactory } = createCssAndCxFactory({
        serializeStyles,
        insertStyles,
        getRegisteredStyles,
    });

    function useCssAndCx() {
        const cache = useEmotionCache();

        const { css, cx } = useSemanticGuaranteeMemo(
            () => cssAndCxFactory({ cache }),
            [cache],
        );

        return { css, cx };
    }

    return { useCssAndCx };
}
