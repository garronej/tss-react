import "./tools/Object.fromEntries";
import { classnames } from "./tools/classnames";
import type { Cx, Css } from "./types";
import { serializeStyles } from "@emotion/serialize";
import type { RegisteredCache } from "@emotion/serialize";
import { insertStyles, getRegisteredStyles } from "@emotion/utils";
import { useSemanticGuaranteeMemo } from "./tools/useSemanticGuaranteeMemo";
import type { EmotionCache } from "@emotion/cache";
import { useTssEmotionCache } from "./cache";

export const { cssAndCxFactory } = (() => {
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
})();

/** Will pickup the contextual cache if any */
export function useCssAndCx() {
    const cache = useTssEmotionCache();

    const { css, cx } = useSemanticGuaranteeMemo(
        () => cssAndCxFactory({ cache }),
        [cache],
    );

    return { css, cx };
}
