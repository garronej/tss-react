import * as React from "react";
import type { ReactNode } from "react";
import createEmotionServer from "@emotion/server/create-instance";
import type { DocumentContext } from "next/document";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import type { Options as OptionsOfCreateCache } from "@emotion/cache";
import createCache from "@emotion/cache";
import type { NextComponentType } from "next";
import DefaultDocument from "next/document";

/** @see <https://docs.tss-react.dev/ssr/next> */
export function createEmotionSsrAdvancedApproach(
    options: Omit<OptionsOfCreateCache, "insertionPoint"> & {
        prepend?: boolean;
    },
    CacheProvider: (props: {
        value: EmotionCache;
        children: ReactNode;
    }) => JSX.Element | null = DefaultCacheProvider,
) {
    const propName = `${options.key}EmotionCache`;

    function augmentDocumentWithEmotionCache(
        Document: NextComponentType<any, any, any>,
    ): void {
        const super_getInitialProps =
            Document.getInitialProps?.bind(Document) ??
            DefaultDocument.getInitialProps.bind(DefaultDocument);

        (Document as any).getInitialProps = async (
            appContext: DocumentContext,
        ) => {
            const cache = createCache(options);

            const emotionServer = createEmotionServer(cache);

            const originalRenderPage = appContext.renderPage;

            appContext.renderPage = () =>
                originalRenderPage({
                    "enhanceApp": (App: any) =>
                        function EnhanceApp(props) {
                            return <App {...{ ...props, [propName]: cache }} />;
                        },
                });

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
                "styles": options.prepend
                    ? [...emotionStyles, ...otherStyles]
                    : [...otherStyles, ...emotionStyles],
            };
        };
    }

    function withAppEmotionCache<
        AppComponent extends NextComponentType<any, any, any>,
    >(App: AppComponent): AppComponent {
        function AppWithEmotionCache(props: any) {
            const { [propName]: cache, ...rest } = props;
            return (
                <CacheProvider value={cache ?? createCache(options)}>
                    <App {...rest} />
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
