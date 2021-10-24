import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";

export const {
    getTssDefaultEmotionCache,
    getDoExistsTssDefaultEmotionCacheMemoizedValue,
} = (() => {
    let cache: EmotionCache | undefined = undefined;

    /**
     * Lazily initialized singleton
     * If doReset is set to true the memoized instance will be
     * discarded and a new one created.
     * */
    function getTssDefaultEmotionCache(params?: {
        doReset: boolean;
    }): EmotionCache {
        const { doReset = false } = params ?? {};

        if (doReset) {
            cache = undefined;
        }

        if (cache === undefined) {
            cache = createCache({ "key": "tss" });
        }

        return cache;
    }

    return {
        getTssDefaultEmotionCache,
        "getDoExistsTssDefaultEmotionCacheMemoizedValue": () =>
            cache !== undefined,
    };
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
