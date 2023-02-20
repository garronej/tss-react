import * as React from "react";
import createEmotionServer from "@emotion/server/create-instance";
import type { Options as OptionsOfCreateCache } from "@emotion/cache";
import type { DocumentContext } from "next/document";
import createCache from "@emotion/cache";
import type { NextComponentType } from "next";
import DefaultDocument from "next/document";

export default function augmentDocumentWithEmotionCache(
    options: Omit<OptionsOfCreateCache, "insertionPoint"> & {
        prepend?: boolean;
    }
) {
    const { prepend, ...optionsWithoutPrependProp } = options;

    const appPropName = `${options.key}EmotionCache`;
    const insertionPointId = `${options.key}-emotion-cache-insertion-point`;

    return (Document: NextComponentType<any, any, any>): void => {
        const super_getInitialProps =
            Document.getInitialProps?.bind(Document) ??
            DefaultDocument.getInitialProps.bind(DefaultDocument);

        (Document as any).getInitialProps = async (
            documentContext: DocumentContext
        ) => {
            const cache = createCache(optionsWithoutPrependProp);

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

            const initialProps = await super_getInitialProps(documentContext);

            const emotionStyles = [
                <style id={insertionPointId} key={insertionPointId} />,
                ...emotionServer
                    .extractCriticalToChunks(initialProps.html)
                    .styles.filter(({ css }) => css !== "")
                    .map(style => (
                        <style
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
    };
}
