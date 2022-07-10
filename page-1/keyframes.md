# keyframes

`keyfames` is a direct re-export of [the `@emotion` function](https://emotion.sh/docs/keyframes).

```javascript
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
            `} 3.5s infinite ease-in-out`
        }
    }
});
```
