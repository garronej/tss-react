import * as React from "react";
import type { EmotionCache } from "@emotion/cache";
import createCache from "@emotion/cache";
import type { Options as OptionsOfCreateCache } from "@emotion/cache";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import type { NextComponentType } from "next";
import { assert } from "../tools/assert";

export default function withAppEmotionCache<
    AppComponent extends NextComponentType<any, any, any>
>(
    options: Omit<OptionsOfCreateCache, "insertionPoint"> & {
        prepend?: boolean;
    },
    CacheProvider: (props: {
        value: EmotionCache;
        children: React.ReactNode;
    }) => JSX.Element | null = DefaultCacheProvider
) {
    return (App: AppComponent): AppComponent => {
        const { ...optionsWithoutPrependProp } = options;

        const appPropName = `${options.key}EmotionCache`;
        const insertionPointId = `${options.key}-emotion-cache-insertion-point`;

        const createClientSideCache = (() => {
            let cache: EmotionCache | undefined = undefined;

            return () => {
                if (cache !== undefined) {
                    return cache;
                }

                return (cache = createCache({
                    ...optionsWithoutPrependProp,
                    "insertionPoint": (() => {
                        // NOTE: Under normal circumstances we are on the client.
                        // It might not be the case though, see: https://github.com/garronej/tss-react/issues/124
                        const isBrowser =
                            typeof document === "object" &&
                            typeof document?.getElementById === "function";

                        if (!isBrowser) {
                            return undefined;
                        }

                        const htmlElement =
                            document.getElementById(insertionPointId);

                        assert(htmlElement !== null);

                        return htmlElement;
                    })()
                }));
            };
        })();

        function AppWithEmotionCache(props: any) {
            const { [appPropName]: cache, ...rest } = props;
            return (
                <CacheProvider value={cache ?? createClientSideCache()}>
                    <App {...rest} />
                </CacheProvider>
            );
        }

        Object.keys(App).forEach(
            staticMethod =>
                ((AppWithEmotionCache as any)[staticMethod] = (App as any)[
                    staticMethod
                ])
        );

        AppWithEmotionCache.displayName = AppWithEmotionCache.name;

        return AppWithEmotionCache as any;
    };
}
