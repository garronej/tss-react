import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";

let cache: EmotionCache | undefined = undefined;

/** Lazily initialized singleton */
export function getCache(): EmotionCache {
    if (cache === undefined) {
        cache = createCache({ "key": "tss-react" });
    }

    return cache;
}
