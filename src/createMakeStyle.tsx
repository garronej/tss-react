import "./tools/Object.fromEntries";
import { objectKeys } from "./tools/objectKeys";
import { createContext, useContext } from "react";
import { classnames } from "./tools/classnames";
import type { ReactNode } from "react";
import type { Cx, Css, CSSObject } from "./types";
import type * as emotionReact from "@emotion/react";
import type * as emotionSerialize from "@emotion/serialize";
import type * as emotionUtils from "@emotion/utils";

/** https://github.com/garronej/tss-react */
export function createMakeStyle<Theme>(params: {
    useTheme(): Theme;
    CacheProvider: typeof emotionReact.CacheProvider;
    serializeStyles: typeof emotionSerialize.serializeStyles;
    insertStyles: typeof emotionUtils.insertStyles;
    getRegisteredStyles: typeof emotionUtils.getRegisteredStyles;
    cache: emotionReact.EmotionCache;
}) {
    const {
        useTheme,
        CacheProvider,
        serializeStyles,
        insertStyles,
        cache,
        getRegisteredStyles,
    } = params;

    const { TssProviderForSsr, useCssAndCx } = createUseCssAndCx({
        CacheProvider,
        serializeStyles,
        insertStyles,
        cache,
        getRegisteredStyles,
    });

    function makeStyles<Params = void>() {
        return function <Key extends string>(
            getCssObjects:
                | ((theme: Theme, params: Params) => Record<Key, CSSObject>)
                | Record<Key, CSSObject>,
        ) {
            function useStyles(params: Params) {
                const theme = useTheme();
                const { css, cx } = useCssAndCx();

                const cssObjects =
                    typeof getCssObjects === "function"
                        ? getCssObjects(theme, params)
                        : getCssObjects;

                const classes = Object.fromEntries(
                    objectKeys(cssObjects).map(key => [
                        key,
                        css(cssObjects[key]),
                    ]),
                ) as Record<Key, string>;

                return {
                    classes,
                    theme,
                    css,
                    cx,
                };
            }

            //TODO: Return for composition as well.
            return { useStyles };
        };
    }

    function useStyleTools() {
        const { css, cx } = useCssAndCx();
        const theme = useTheme();

        return { css, cx, theme };
    }

    return { makeStyles, useStyleTools, TssProviderForSsr };
}

const { createUseCssAndCx } = (() => {
    const isWrappedIntoCacheProviderContext = createContext(false);

    const isBrowser = typeof document !== "undefined";

    function createUseCssAndCx(params: {
        CacheProvider: typeof emotionReact.CacheProvider;
        serializeStyles: typeof emotionSerialize.serializeStyles;
        insertStyles: typeof emotionUtils.insertStyles;
        getRegisteredStyles: typeof emotionUtils.getRegisteredStyles;
        cache: emotionReact.EmotionCache;
    }) {
        const {
            CacheProvider,
            serializeStyles,
            insertStyles,
            getRegisteredStyles,
            cache,
        } = params;

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

        /** It can also be used in SPA but it will have no effect */
        function TssProviderForSsr(props: { children: ReactNode }) {
            const { children } = props;

            return (
                <CacheProvider value={cache}>
                    <isWrappedIntoCacheProviderContext.Provider value={true}>
                        {children}
                    </isWrappedIntoCacheProviderContext.Provider>
                </CacheProvider>
            );
        }

        function useCssAndCx() {
            const isWrappedIntoCacheProvider = useContext(
                isWrappedIntoCacheProviderContext,
            );

            if (!isBrowser && !isWrappedIntoCacheProvider) {
                throw new Error(
                    [
                        "For SSR to work your components must",
                        `be wrapped within <${TssProviderForSsr.name}/>`,
                    ].join(" "),
                );
            }

            return { css, cx };
        }

        return { TssProviderForSsr, useCssAndCx };
    }

    return { createUseCssAndCx };
})();
