# keyframes

`keyfames` is a direct re-export of [the `@emotion` function](https://emotion.sh/docs/keyframes).

<pre class="language-javascript"><code class="lang-javascript"><strong>import { keyframes } from "tss-react";
</strong>import { tss } from "tss";

<strong>const myAnimation = keyframes`
</strong><strong>    60%, 100% {
</strong><strong>        opacity: 0;
</strong><strong>    }
</strong><strong>    0% {
</strong><strong>        opacity: 0;
</strong><strong>    }
</strong><strong>    40% {
</strong><strong>        opacity: 1;
</strong><strong>    }
</strong><strong>`;
</strong>
const useStyles = tss.create({
    "svg": {
        "&#x26; g": {
            "opacity": 0,
            "animation": `${myAnimation} 3.5s infinite ease-in-out`
        }
    }
});
</code></pre>

You can also use object notation: &#x20;

```typescript
import { keyframes } from "tss-react";

const myAnimation = keyframes({
    "60%, 100%": {
        "opacity": 0
    },
    "0%": {
        "opacity": 0
    },
    "40%": {
        "opacity": 1
    }
});
```
