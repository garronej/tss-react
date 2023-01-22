# 🩳 MUI sx syntax

You can use the [MUI's Sx syntax](https://mui.com/system/getting-started/the-sx-prop/) in MUI like so:&#x20;

<pre class="language-jsx"><code class="lang-jsx">import { unstable_styleFunctionSx } from "@mui/system";
import type { CSSObject } from "tss-react";
export const styleFunctionSx = unstable_styleFunctionSx as (params: object) => CSSObject;
<strong>
</strong><strong>function TestSxComponent() {
</strong>
    const { classes } = useStyles();
    
    return (
        &#x3C;div className={classes.root}>
            Should look like: https://mui.com/material-ui/react-box/#the-sx-prop
            but in green.
        &#x3C;/div>
    );
    
};

const useStyles = makeStyles()(theme => ({
    root: styleFunctionSx({
        theme,
        sx: {
            width: 300,
            height: 300,
            backgroundColor: "primary.dark",
            "&#x26;:hover": {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7]
            }
        }
    })
}));
</code></pre>

{% embed url="https://user-images.githubusercontent.com/6702424/201123586-6de70f37-b072-4e55-baba-56a53d7ca769.gif" %}
