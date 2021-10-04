import { classnames } from "./tools/classnames";
import type { Cx, Css } from "./types";
import { serializeStyles } from "@emotion/serialize";
import type { RegisteredCache } from "@emotion/serialize";
import { insertStyles, getRegisteredStyles } from "@emotion/utils";
import { useGuaranteedMemo } from "./tools/useGuaranteedMemo";
import type { EmotionCache } from "@emotion/cache";
import { useTssEmotionCache } from "./cache";
import type { CSSTssSpecials } from "./tools/types/CSSObject";

const refPropertyName: keyof CSSTssSpecials = "ref";

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
            let ref: undefined | string = undefined;

            scope: {
                if (args.length !== 1) {
                    break scope;
                }

                const [arg] = args;
                if (!(arg instanceof Object)) {
                    break scope;
                }

                if (!(refPropertyName in arg)) {
                    break scope;
                }

                ref = arg[refPropertyName];

                const argCopy = { ...arg };

                delete argCopy[refPropertyName];

                args = [argCopy];
            }

            const serialized = serializeStyles(args, cache.registered);
            insertStyles(cache, serialized, false);
            return `${cache.key}-${serialized.name}${
                ref === undefined ? "" : ` ${ref}`
            }`;
        };

        const cx: Cx = (...args) =>
            merge(cache.registered, css, classnames(args));

        return { css, cx };
    }

    return { createCssAndCx };
})();

/** Will pickup the contextual cache if any */
export function useCssAndCx() {
    const cache = useTssEmotionCache();

    const { css, cx } = useGuaranteedMemo(
        () => createCssAndCx({ cache }),
        [cache],
    );

    return { css, cx };
}
