import * as React from "react";
import type { ReactNode } from "react";
import createEmotionServer from "@emotion/server/create-instance";
import type NextDocument from "next/document";
import type { DocumentContext } from "next/document";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { Options as CreateCacheOption } from "@emotion/cache";
import createCache from "@emotion/cache";

/**
 * @deprecated Use tss-react/next instead.
 * @see <https://docs.tss-react.dev/ssr/next.js> */
export function createEmotionSsrAdvancedApproach(options: CreateCacheOption) {
    let muiCache: EmotionCache | undefined = undefined;

    const createMuiCache = () => (muiCache = createCache(options));

    function EmotionCacheProvider(props: { children: ReactNode }) {
        const { children } = props;
        return (
            <CacheProvider value={muiCache ?? createMuiCache()}>
                {children}
            </CacheProvider>
        );
    }

    function withEmotionCache(
        Document: typeof NextDocument,
        params?: {
            getExtraCaches: () => EmotionCache[];
        }
    ) {
        const { getExtraCaches = () => [] } = params ?? {};
        return class DocumentWithEmotionCache extends Document {
            static async getInitialProps(ctx: DocumentContext) {
                const emotionServers = [createMuiCache(), ...getExtraCaches()]
                    .sort((a, b) =>
                        getPrepend(a) === getPrepend(b)
                            ? 0
                            : getPrepend(a)
                            ? -1
                            : 1
                    )
                    .map(createEmotionServer);

                const initialProps = await Document.getInitialProps(ctx);

                return {
                    ...initialProps,
                    "styles": [
                        ...React.Children.toArray(initialProps.styles),
                        ...emotionServers
                            .map(({ extractCriticalToChunks }) =>
                                extractCriticalToChunks(initialProps.html)
                                    .styles.filter(({ css }) => css !== "")
                                    .map(style => (
                                        <style
                                            data-emotion={`${
                                                style.key
                                            } ${style.ids.join(" ")}`}
                                            key={style.key}
                                            dangerouslySetInnerHTML={{
                                                "__html": style.css
                                            }}
                                        />
                                    ))
                            )
                            .reduce((prev, curr) => [...prev, ...curr], [])
                    ]
                };
            }
        };
    }

    return { EmotionCacheProvider, withEmotionCache };
}

function getPrepend(cache: EmotionCache): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!(cache.sheet as any).prepend;
}
