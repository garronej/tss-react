import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";

export const { getTssDefaultEmotionCache } = (() => {
    let cache: EmotionCache | undefined = undefined;

    /** Lazily initialized singleton */
    function getTssDefaultEmotionCache(): EmotionCache {
        if (cache === undefined) {
            cache = createCache({ "key": "tss-react" });
        }

        return cache;
    }

    return { getTssDefaultEmotionCache };
})();

const context = createContext<EmotionCache | undefined>(undefined);

export function useTssEmotionCache() {
    const cacheExplicitlyProvidedForTss = useContext(context);

    return cacheExplicitlyProvidedForTss ?? getTssDefaultEmotionCache();
}

export function TssCacheProvider(props: {
    value: EmotionCache;
    children: ReactNode;
}) {
    const { children, value } = props;

    return <context.Provider value={value}>{children}</context.Provider>;
}
