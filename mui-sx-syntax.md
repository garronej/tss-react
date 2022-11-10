# 🩳 MUI sx syntax

```jsx
ddd

import { makeSxStyles } from "tss-react/mui";
import { unstable_styleFunctionSx as styleFunctionSx } from "@mui/system";


function TestSxComponent() {

    const { classes } = useSxStyles();

    return (
        <div className={classes.root}>
            Should look like: https://mui.com/material-ui/react-box/#the-sx-prop
        </div>
    );

};
return styleFunctionSx({ sx, theme }) as CSSObject;

const useStyles = makeStyles()(theme => styleFunctionSx

{
    "root": {
        "width": 300,
        "height": 300,
        "backgroundColor": 'primary.dark',
        '&:hover': {
            "backgroundColor": 'primary.main',
            "opacity": [0.9, 0.8, 0.7]
        }
    }
});
```
