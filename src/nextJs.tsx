import NextDocument from "next/document";
import type { DocumentContext } from "next/document";

import createEmotionServer from "@emotion/server/create-instance";
import htmlReactParserParse from "html-react-parser";
import type { EmotionCache } from "@emotion/cache";
import { getDefaultEmotionCache } from "./defaultEmotionCache";

export function createPageHtmlToStyleTags(params?: { caches: EmotionCache[] }) {
    let { caches = [] } = params ?? {};

    {
        const defaultEmotionCache = getDefaultEmotionCache();

        if (!caches.includes(defaultEmotionCache)) {
            caches = [...caches, defaultEmotionCache];
        }
    }

    const emotionServers = caches.map(createEmotionServer);

    function pageHtmlToStyleTags(params: { pageHtml: string }) {
        const { pageHtml } = params;

        return htmlReactParserParse(
            emotionServers
                .map(
                    ({
                        extractCriticalToChunks,
                        constructStyleTagsFromChunks,
                    }) => {
                        const { html, styles } =
                            extractCriticalToChunks(pageHtml);

                        constructStyleTagsFromChunks({
                            html,
                            styles,
                        });
                    },
                )
                .join("\n"),
        );
    }

    return { pageHtmlToStyleTags };
}

export function createGetInitialProps(params?: { caches: EmotionCache[] }) {
    const { pageHtmlToStyleTags } = createPageHtmlToStyleTags(params);

    async function getInitialProps(ctx: DocumentContext) {
        const page = await ctx.renderPage();

        const initialProps = await NextDocument.getInitialProps(ctx);

        return {
            ...initialProps,
            "styles": (
                <>
                    {initialProps.styles}
                    {pageHtmlToStyleTags({ "pageHtml": page.html })}
                </>
            ),
        };
    }

    return { getInitialProps };
}

export function createDocument(params?: { caches: EmotionCache[] }): {
    Document: typeof NextDocument;
} {
    const { getInitialProps } = createGetInitialProps(params);
    class Document extends NextDocument {
        static async getInitialProps(ctx: DocumentContext) {
            return getInitialProps(ctx);
        }
    }

    return { Document };
}
