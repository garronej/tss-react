import * as React from "react";
import createEmotionServer from "@emotion/server/create-instance";
import type { DocumentContext } from "next/document";
import type { EmotionCache } from "@emotion/cache";
import type { Provider } from "react";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import type { Options as OptionsOfCreateCache } from "@emotion/cache";
import createCache from "@emotion/cache";
import type { NextComponentType } from "next";
import DefaultDocument from "next/document";

/** @see <https://docs.tss-react.dev/ssr/next> */
export function createEmotionSsrAdvancedApproach(params: {
    CacheProvider?: Provider<EmotionCache>;
    options: OptionsOfCreateCache;
}) {
    const { CacheProvider = DefaultCacheProvider, options } = params;

    let cache: EmotionCache | undefined = undefined;

    const createSpecificCacheCache = () => (cache = createCache(options));

    function augmentDocumentWithEmotionCache(
        Document: NextComponentType<any, any, any>,
    ): void {
        const super_getInitialProps =
            Document.getInitialProps?.bind(Document) ??
            DefaultDocument.getInitialProps.bind(DefaultDocument);

        (Document as any).getInitialProps = async (
            appContext: DocumentContext,
        ) => {
            const cache = createSpecificCacheCache();

            const emotionServer = createEmotionServer(cache);

            const initialProps = await super_getInitialProps(appContext);

            const emotionStyles = emotionServer
                .extractCriticalToChunks(initialProps.html)
                .styles.filter(({ css }) => css !== "")
                .map(style => (
                    <style
                        data-emotion={`${style.key} ${style.ids.join(" ")}`}
                        key={style.key}
                        dangerouslySetInnerHTML={{ "__html": style.css }}
                    />
                ));

            const otherStyles = React.Children.toArray(initialProps.styles);

            return {
                ...initialProps,
                "styles": !!(cache.sheet as any).prepend
                    ? [...emotionStyles, ...otherStyles]
                    : [...otherStyles, ...emotionStyles],
            };
        };
    }

    function withAppEmotionCache<
        AppComponent extends NextComponentType<any, any, any>,
    >(App: AppComponent): AppComponent {
        function AppWithEmotionCache(props: any) {
            return (
                <CacheProvider value={cache ?? createSpecificCacheCache()}>
                    <App {...props} />
                </CacheProvider>
            );
        }

        Object.keys(App).forEach(
            staticMethod =>
                ((AppWithEmotionCache as any)[staticMethod] = (App as any)[
                    staticMethod
                ]),
        );

        AppWithEmotionCache.displayName = AppWithEmotionCache.name;

        return AppWithEmotionCache as any;
    }

    return { withAppEmotionCache, augmentDocumentWithEmotionCache };
}
