# 🩳 MUI sx syntax

{% hint style="warning" %}
I do not recommend using the Sx syntax in conjunction with TSS, I don't see the value of it.&#x20;

`Sx` syntax primary avantage is to be more consise which is an important factor when mixing your JSX and styles.  TSS however enable have separates the two. &#x20;

Given this I'd rather write:&#x20;

`backgroundColor: theme.palette.primary.main`

than

`backgroundColor: "primary.main"`

The second is shorter all right but we trade type safery in the sake of brievety, IMO it isn't worth it. &#x20;

Do not esitate to reach by [opening a discution](https://github.com/garronej/tss-react/discussions) about it if you think I'm missing something.&#x20;
{% endhint %}

You can use the [MUI's Sx syntax](https://mui.com/system/getting-started/the-sx-prop/) in MUI like so:&#x20;

```jsx
import { unstable_styleFunctionSx } from "@mui/system";
import type { CSSObject } from "tss-react";
export const styleFunctionSx = unstable_styleFunctionSx as (params: object) => CSSObject;

function TestSxComponent() {

    const { classes } = useStyles();
    
    return (
        <div className={classes.root}>
            Should look like: https://mui.com/material-ui/react-box/#the-sx-prop
            but in green.
        </div>
    );
    
};

const useStyles = makeStyles()(theme => ({
    root: styleFunctionSx({
        theme,
        sx: {
            width: 300,
            height: 300,
            backgroundColor: "primary.dark",
            "&:hover": {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7]
            }
        }
    })
}));
```

{% embed url="https://user-images.githubusercontent.com/6702424/201123586-6de70f37-b072-4e55-baba-56a53d7ca769.gif" %}
