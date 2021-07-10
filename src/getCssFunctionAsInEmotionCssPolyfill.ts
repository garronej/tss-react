
import type * as emotionReact from "@emotion/react";
import type * as emotionCss from "@emotion/css";
import type * as emotionUtils from "@emotion/utils";
import type * as emotionCache from "@emotion/cache";

export function getCssFunctionAsInEmotionCssPolyfill(
	params: {
		cssFunctionFromEmotionReact: typeof emotionReact.css;
		insertStyles: typeof emotionUtils.insertStyles;
		createCache: typeof emotionCache.default;
	}
): { cssFunctionAsInEmotionCss: typeof emotionCss.css } {

	const { cssFunctionFromEmotionReact, insertStyles, createCache } = params;

	console.log("run createCache");

	const cache = createCache({ "key": "prefix", "prepend": true });
	cache.compat = true;

	return {
		"cssFunctionAsInEmotionCss": (...args) => {

			const serialized = cssFunctionFromEmotionReact(...args as any[]);

			insertStyles(cache, serialized, false);

			return `${cache.key}-${serialized.name}`;

		}
	};

}
