import type { ReactNode } from "react";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import type { Options as OptionsOfCreateCache } from "@emotion/cache";
import wrappedWithAppEmotionCache from "./withAppEmotionCache";
import wrappedAugmentDocumentWithEmotionCache from "./augmentDocumentWithEmotionCache";

/**
 * @see <https://docs.tss-react.dev/ssr/next>
 * This utility implements https://emotion.sh/docs/ssr#advanced-approach
 * */
export function createEmotionSsrAdvancedApproach(
    /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
    options: Omit<OptionsOfCreateCache, "insertionPoint"> & {
        prepend?: boolean;
    },
    /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
    CacheProvider: (props: {
        value: EmotionCache;
        children: ReactNode;
    }) => JSX.Element | null = DefaultCacheProvider,
) {
    const withAppEmotionCache = wrappedWithAppEmotionCache(
        options,
        CacheProvider,
    );
    const augmentDocumentWithEmotionCache =
        wrappedAugmentDocumentWithEmotionCache(options);

    return { withAppEmotionCache, augmentDocumentWithEmotionCache };
}
