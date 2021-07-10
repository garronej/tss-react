import { TssEmotionReact } from "./TssEmotionReact";
import { TssEmotionCss } from "./TssEmotionCss";
import { EmotionStyled } from "./EmotionStyled";
import { EmotionReact } from "./EmotionReact";

export function App() {
	return (
		<>
			<EmotionReact />
			<EmotionStyled />
			<TssEmotionCss />
			<TssEmotionReact />
		</>
	);
}