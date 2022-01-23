# keyframes

```javascript
// Reexport from @emotion/react
import { keyframes } from "tss-react";
import { makeStyles } from "./makeStyles";

export const useStyles = makeStyles()({
    "svg": {
        "& g": {
            "opacity": 0,
            "animation": `${keyframes`
            60%, 100% {
                opacity: 0;
            }
            0% {
                opacity: 0;
            }
            40% {
                opacity: 1;
            }
            `} 3.5s infinite ease-in-out`,
        },
    },
});
```
