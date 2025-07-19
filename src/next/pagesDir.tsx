/* eslint-disable @typescript-eslint/ban-types */
import * as React from "react";
import type createEmotionServer_t from "@emotion/server/create-instance";
import type { DocumentContext } from "next/document";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import type { Options as OptionsOfCreateCache } from "@emotion/cache";
import createCache from "@emotion/cache";
import type { NextComponentType } from "next";
import { assert } from "../tools/assert";

/**
 * @see <https://docs.tss-react.dev/ssr/next>
 * This utility implements https://emotion.sh/docs/ssr#advanced-approach
 * */
export function createEmotionSsrAdvancedApproach(
    /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
    options: Omit<OptionsOfCreateCache, "insertionPoint"> & {
        prepend?: boolean;
    },
    /**
     * By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"'
     *
     * NOTE: The actual expected type is `React.Provider<EmotionCache>` but we use `Function` because
     * to make it work regardless of if you are using React 18 or React 19 type def.
     */
    CacheProvider: Function = DefaultCacheProvider
) {
    const { prepend, ...optionsWithoutPrependProp } = options;

    const appPropName = `${options.key}EmotionCache`;
    const insertionPointId = `${options.key}-emotion-cache-insertion-point`;

    function augmentDocumentWithEmotionCache(
        Document: NextComponentType<any, any, any>
    ): void {
        let super_getInitialProps = Document.getInitialProps?.bind(Document);

        if (super_getInitialProps === undefined) {
            import("next/document").then(
                ({ default: DefaultDocument }) =>
                    (super_getInitialProps =
                        DefaultDocument.getInitialProps.bind(DefaultDocument))
            );
        }

        const createEmotionServerOrPr:
            | typeof createEmotionServer_t
            | Promise<typeof createEmotionServer_t> = import(
            "@emotion/server/create-instance"
        ).then(({ default: createEmotionServer }) => createEmotionServer);

        (Document as any).getInitialProps = async (
            documentContext: DocumentContext
        ) => {
            const cache = createCache(optionsWithoutPrependProp);

            const createEmotionServer =
                createEmotionServerOrPr instanceof Promise
                    ? await createEmotionServerOrPr
                    : createEmotionServerOrPr;

            const emotionServer = createEmotionServer(cache);

            const originalRenderPage = documentContext.renderPage;

            documentContext.renderPage = ({ enhanceApp, ...params }: any) =>
                originalRenderPage({
                    ...params,
                    "enhanceApp": (App: any) => {
                        const EnhancedApp = enhanceApp?.(App) ?? App;

                        return function EnhanceApp(props) {
                            return (
                                <EnhancedApp
                                    {...{ ...props, [appPropName]: cache }}
                                />
                            );
                        };
                    }
                });

            assert(
                super_getInitialProps !== undefined,
                "Default document not yet loaded. Please submit an issue to the tss-react repo"
            );

            const initialProps = await super_getInitialProps(documentContext);

            const emotionStyles = [
                <style id={insertionPointId} key={insertionPointId} />,
                ...emotionServer
                    .extractCriticalToChunks(initialProps.html)
                    .styles.filter(({ css }) => css !== "")
                    .map(style => (
                        <style
                            nonce={options.nonce}
                            data-emotion={`${style.key} ${style.ids.join(" ")}`}
                            key={style.key}
                            dangerouslySetInnerHTML={{ "__html": style.css }}
                        />
                    ))
            ];

            const otherStyles = React.Children.toArray(initialProps.styles);

            return {
                ...initialProps,
                "styles": prepend
                    ? [...emotionStyles, ...otherStyles]
                    : [...otherStyles, ...emotionStyles]
            };
        };
    }

    function withAppEmotionCache<
        AppComponent extends NextComponentType<any, any, any>
    >(App: AppComponent): AppComponent {
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
    }

    return { withAppEmotionCache, augmentDocumentWithEmotionCache };
}
