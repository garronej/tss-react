import { render } from "react-dom";
import { createMakeStyle } from "tss-react";

export function useTheme() {
    return {
        "limeGreen": "#32CD32",
    };
}

const { makeStyles } = createMakeStyle({ useTheme });

const { useStyles } = makeStyles()(theme => ({
    "root": {
        "& > h1:nth-child(2)": {
            "color": theme.limeGreen,
        },
    },
}));

function App() {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <h1>Black</h1>
            <h1>Should be lime green</h1>
            <h1>Black</h1>
        </div>
    );
}

render(<App />, document.getElementById("root"));
