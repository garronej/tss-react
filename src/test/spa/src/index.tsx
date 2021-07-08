import ReactDOM from 'react-dom';
import { EmotionReact } from "./EmotionReact";
import { EmotionCss } from "./EmotionCss";

ReactDOM.render(
  <>
    <EmotionCss />
    <EmotionReact />
  </>,
  document.getElementById('root')
);
