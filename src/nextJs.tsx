import * as React from "react";
import createEmotionServer from "@emotion/server/create-instance";
import type NextDocument from "next/document";
import type { DocumentContext } from "next/document";
import type { EmotionCache } from "@emotion/cache";
import {
    getTssDefaultEmotionCache,
    getDoExistsTssDefaultEmotionCacheMemoizedValue,
} from "./cache";

export function withEmotionCache(params: {
    Document: typeof NextDocument;
    getCaches: () => EmotionCache[];
}): typeof NextDocument {
    const { Document, getCaches } = params;
    return class DocumentWithEmotionCache extends Document {
        static async getInitialProps(ctx: DocumentContext) {
            const emotionServers = (() => {
                const caches = getCaches();

                return getDoExistsTssDefaultEmotionCacheMemoizedValue() &&
                    caches.indexOf(getTssDefaultEmotionCache()) >= 0
                    ? caches
                    : [
                          ...caches,
                          getTssDefaultEmotionCache({ "doReset": true }),
                      ];
            })()
                .sort((a, b) =>
                    getPrepend(a) === getPrepend(b)
                        ? 0
                        : getPrepend(a)
                        ? -1
                        : 1,
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
                                            "__html": style.css,
                                        }}
                                    />
                                )),
                        )
                        .reduce((prev, curr) => [...prev, ...curr], []),
                ],
            };
        }
    };
}

function getPrepend(cache: EmotionCache): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!(cache.sheet as any).prepend;
}
