

import { useTheme } from "./useTheme";
import { css } from "@emotion/react";
import { insertStyles } from "@emotion/utils";
import createCache from "@emotion/cache";
import { getCssFunctionAsInEmotionCssPolyfill } from "tss-react/dist/getCssFunctionAsInEmotionCssPolyfill";
import { createUseClassNamesFactory } from "tss-react/dist/createUseClassNamesFactory";
import { BaseComponent } from "./BaseComponent";

const { cssFunctionAsInEmotionCss } = getCssFunctionAsInEmotionCssPolyfill({
	"cssFunctionFromEmotionReact": css,
	insertStyles,
	createCache
});

const { createUseClassNames } = createUseClassNamesFactory({
	useTheme,
	"css": cssFunctionAsInEmotionCss
});


const { useClassNames }= createUseClassNames()(
	theme=>({
		"root": {
			"backgroundColor": theme.limeGreen
		}
	})
);

export function EmotionReact() {

	const { classNames } = useClassNames({});

	return (
		<BaseComponent
			testDescription="Test using @emotion/react"
			classNameThatSetsBackgroundColorToLimeGreen={classNames.root}
		/>
	);

}