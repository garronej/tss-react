/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from "./useTheme";
import styled from '@emotion/styled'
import { BaseComponent } from "./BaseComponent";

function EmotionStyledUnstyled(props: { className?: string; }) {

	const { className } = props;

	return (
		<BaseComponent
			testDescription="Test @emotion/styled (for reference)"
			classNameThatSetsBackgroundColorToLimeGreen={className!}
		/>
	);

}

export const EmotionStyled = styled(EmotionStyledUnstyled)`
	background-color: ${useTheme().limeGreen}
`;