/** @jsxImportSource @emotion/react */
/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from "./useTheme";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, ClassNames } from '@emotion/react'
import { BaseComponent } from "./BaseComponent";

export function EmotionReact() {

	const theme = useTheme();

	return (
		<ClassNames>
			{({ css }) =>
				<BaseComponent
					testDescription="Test @emotion/react (for reference)"
					classNameThatSetsBackgroundColorToLimeGreen={css({ "backgroundColor": theme.limeGreen })}
				/>
			}
		</ClassNames>
	);

}