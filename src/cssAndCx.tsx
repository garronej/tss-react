import { classnames } from "./tools/classnames";
import type { Cx, Css, CSSObject } from "./types";
import { serializeStyles } from "@emotion/serialize";
import type { RegisteredCache } from "@emotion/serialize";
import { insertStyles, getRegisteredStyles } from "@emotion/utils";
import { useGuaranteedMemo } from "./tools/useGuaranteedMemo";
import type { EmotionCache } from "@emotion/cache";
import { useTssEmotionCache } from "./cache";
import type { CSSObjectTssSpecials } from "./types";
import { matchCSSObject } from "./types";

const refPropertyName: keyof CSSObjectTssSpecials = "ref";

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

                const mostLikelyRef = arg[refPropertyName];

                if (
                    typeof mostLikelyRef !== "string" &&
                    mostLikelyRef !== undefined
                ) {
                    break scope;
                }

                ref = mostLikelyRef;

                const argCopy = { ...arg };

                delete argCopy[refPropertyName];

                args = [argCopy];
            }

            const serialized = serializeStyles(args, cache.registered);
            insertStyles(cache, serialized, false);
            const className = `${cache.key}-${serialized.name}${
                ref === undefined ? "" : ` ${ref}`
            }`;

            scope: {
                const arg = args[0];

                if (!matchCSSObject(arg)) {
                    break scope;
                }

                increaseSpecificityToTakePrecedenceOverMediaQuerries.saveClassNameCSSObjectMapping(
                    cache,
                    className,
                    arg,
                );
            }

            return className;
        };

        const cx: Cx = (...args) => {
            const className = classnames(args);

            const feat27FixedClassnames =
                increaseSpecificityToTakePrecedenceOverMediaQuerries.fixClassName(
                    cache,
                    className,
                    css,
                );

            return merge(cache.registered, css, feat27FixedClassnames);
            //return merge(cache.registered, css, className);
        };

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

// https://github.com/garronej/tss-react/issues/27
const increaseSpecificityToTakePrecedenceOverMediaQuerries = (() => {
    const cssObjectMapByCache = new WeakMap<
        EmotionCache,
        Map<string, CSSObject>
    >();

    return {
        "saveClassNameCSSObjectMapping": (
            cache: EmotionCache,
            className: string,
            cssObject: CSSObject,
        ) => {
            let cssObjectMap = cssObjectMapByCache.get(cache);

            if (cssObjectMap === undefined) {
                cssObjectMap = new Map();
                cssObjectMapByCache.set(cache, cssObjectMap);
            }

            cssObjectMap.set(className, cssObject);
        },
        "fixClassName": (() => {
            function fix(
                classNameCSSObjects: [
                    string /*className*/,
                    CSSObject | undefined,
                ][],
            ): (string | CSSObject)[] {
                let isThereAnyMediaQueriesInPreviousClasses = false;

                return classNameCSSObjects.map(([className, cssObject]) => {
                    if (cssObject === undefined) {
                        return className;
                    }

                    let out: string | CSSObject;

                    if (!isThereAnyMediaQueriesInPreviousClasses) {
                        out = className;

                        for (const key in cssObject) {
                            if (key.startsWith("@media")) {
                                isThereAnyMediaQueriesInPreviousClasses = true;
                                break;
                            }
                        }
                    } else {
                        out = {
                            "&&": cssObject,
                        };
                    }

                    return out;
                });
            }

            return (
                cache: EmotionCache,
                className: string,
                css: Css,
            ): string => {
                const cssObjectMap = cssObjectMapByCache.get(cache);

                return classnames(
                    fix(
                        className
                            .split(" ")
                            .map(className => [
                                className,
                                cssObjectMap?.get(className),
                            ]),
                    ).map(classNameOrCSSObject =>
                        typeof classNameOrCSSObject === "string"
                            ? classNameOrCSSObject
                            : css(classNameOrCSSObject),
                    ),
                );
            };
        })(),
    };
})();
