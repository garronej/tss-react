import { useTheme } from "./useTheme";
import { css } from "@emotion/css";
import { createUseClassNamesFactory } from "tss-react/dist/createUseClassNamesFactory";
import { BaseComponent } from "./BaseComponent";

const { createUseClassNames } = createUseClassNamesFactory({
	useTheme,
	css
});


const { useClassNames } = createUseClassNames()(
	theme => ({
		"root": {
			"backgroundColor": theme.limeGreen
		}
	})
);

export function TssEmotionCss() {

	const { classNames } = useClassNames({});

	return (
		<BaseComponent
			testDescription="Test tss-react using @emotion/css"
			classNameThatSetsBackgroundColorToLimeGreen={classNames.root}
		/>
	);

}