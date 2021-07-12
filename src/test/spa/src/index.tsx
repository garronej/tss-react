import { render } from "react-dom";
import { createMakeStyle, css } from "tss-react";

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

function App(props: { className?: string; }) {
    const { className } = props;
    const { classes, css, cx } = useStyles();

    return (
        <div className={classes.root}>
            <h1>Black</h1>
            <h1>Should be lime green</h1>
            <h1
                className={cx(
                    css({ "border": "1px solid black" }),
                    className
                )}
            >
                Black, should have border and shadow
            </h1>
        </div>
    );
}

render(<App className={css({ "boxShadow": "10px 5px 5px teal" })} />, document.getElementById("root"));