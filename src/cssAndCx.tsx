import { classnames } from "./tools/classnames";
import type { Cx, Css } from "./types";
import { serializeStyles } from "@emotion/serialize";
import type { RegisteredCache } from "@emotion/serialize";
import { insertStyles, getRegisteredStyles } from "@emotion/utils";
import { useGuaranteedMemo } from "./tools/useGuaranteedMemo";
import type { EmotionCache } from "@emotion/cache";

export const { createCssAndCx } = (() => {
    function merge(registered: RegisteredCache, css: Css, className: string) {
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

    function createCssAndCx(params: { cache: EmotionCache }) {
        const { cache } = params;

        const css: Css = (...args) => {
            const serialized = serializeStyles(args, cache.registered);
            insertStyles(cache, serialized, false);
            const className = `${cache.key}-${serialized.name}`;

            return className;
        };

        const cx: Cx = (...args) => {
            const className = classnames(args);

            return merge(cache.registered, css, className);
        };

        return { css, cx };
    }

    return { createCssAndCx };
})();

export function createUseCssAndCx(params: { useCache: () => EmotionCache }) {
    const { useCache } = params;

    function useCssAndCx() {
        const cache = useCache();

        const { css, cx } = useGuaranteedMemo(
            () => createCssAndCx({ cache }),
            [cache],
        );

        return { css, cx };
    }

    return { useCssAndCx };
}
