import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";

let defaultEmotionCache: EmotionCache | undefined = undefined;

export function getDefaultEmotionCache(): EmotionCache {
    if (defaultEmotionCache === undefined) {
        defaultEmotionCache = createCache({ "key": "tss-react" });
    }

    return defaultEmotionCache;
}
