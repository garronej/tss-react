
import { useReducer, memo } from "react";
import { GlobalStyles } from "tss-react";
import { makeStyles, useStyles, withStyles } from "../shared/makeStyles";
import { styled } from "@mui/material";
import Button from "@mui/material/Button"
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useIsDarkModeEnabled } from "../shared/isDarkModeEnabled";
import Typography from "@mui/material/Typography";
import type { CSSObject } from "tss-react";
import InputBase from "@mui/material/InputBase";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import { unstable_styleFunctionSx } from "@mui/system";
export const styleFunctionSx = unstable_styleFunctionSx as (params: Record<string, unknown>) => CSSObject;

export default function Index() {

    const { css } = useStyles();

    return (
        <App
            className={css({ "boxShadow": "10px 5px 5px teal" })}
        />
    );

}

const { App } = (() => {


    const H1 = styled('h1')({
        "color": "yellow"
    });

    function App(props: { className?: string; }) {
        const { className } = props;
        const { classes, css, cx, theme } = useStyles();
        const { isDarkModeEnabled, setIsDarkModeEnabled } = useIsDarkModeEnabled();

        return (
            <>
                <GlobalStyles
                    styles={{
                        "body": {
                            "backgroundColor": "pink"
                        },
                        ".foo": {
                            "color": "cyan"
                        }
                    }}
                />
                <div className={classes.root}>


                    <h1>Black (in light mode)</h1>
                    <h1>Should be lime green</h1>
                    <h1
                        className={cx(
                            css({ "border": "1px solid black" }),
                            className
                        )}
                    >
                        Black (in light mode), should have border and shadow
                    </h1>
                    <h1 className="foo">Should be cyan</h1>
                    <H1>Should be yellow</H1>
                    <H1 className={classes.ovStyled}>Should be dark red</H1>
                    <Button variant="contained" color="primary"> Background should be lime green </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.ovInternal}
                    >
                        Background should be dark blue
                    </Button>
                    <div className={classes.parent}>
                        <div className={classes.child}>
                            Background should turn red when mouse is hover the parent.
                        </div>
                    </div>

                    <Breadcrumbs
                        className={classes.breadcrumbs_className}
                        color="primary"
                    >
                        <span>background should be lightblue</span>
                        <span>and the separator (/) should be red except when hover, then it is blue</span>
                    </Breadcrumbs>
                    <div style={{ "height": 10 }} />
                    <Breadcrumbs
                        classes={{
                            "root": classes.breadcrumbs2_root,
                            "separator": classes.breadcrumbs2_separator
                        }}
                        color="primary"
                    >
                        <span>background should be lightblue</span>
                        <span>and the separator (/) should be red except when hover, then it is blue</span>
                    </Breadcrumbs>

                    <MyBreadcrumbs>
                        <span>The separator</span>
                        <span>should be lightgreen</span>
                    </MyBreadcrumbs>

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button2_className}
                    >
                        <span>The background should be red</span>
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        classes={{ "root": classes.button2_root, }}
                    >
                        <span>The background should be red</span>
                    </Button>
                    <div className={cx(classes.testCx_bgYellow, classes.testCx_bgCyan)}>
                        Background should be cyan
                    </div>
                    <div className={cx(classes.testCx_bgCyan, classes.testCx_bgYellow)}>
                        Background should be yellow
                    </div>



                    <div className={classes.childRefTest_wrapper}>

                        <div className={cx(
                            classes.childRefTest_textColorPink,
                            classes.childRefTest_wrapper1
                        )}>
                            Background should turn cyan when mouse hover the parent.
                            Also the text should NOT be pink
                        </div>
                        <div className={cx(classes.childRefTest_wrapper2)}>
                            Background should NOT turn cyan when mouse hover the parent.
                        </div>


                    </div>
                    <div className={classes.mq}>
                        The background color should turn from lightgreen to cyan when the window
                        inner with goes below 960px
                    </div>
                    <MyComponentStyled
                        className={css({ "color": "red" })}
                        colorSmall="cyan"
                    />
                    <MyStyledButton>
                        The text should turn from red to blue when the
                        window inner width goes below 960px
                        And I should have a class like tss-xxxxxx-MyStyledButton-text
                    </MyStyledButton>
                    <br />
                    <MyAnchorStyled href="http://exampe.com">
                        Background should be red
                    </MyAnchorStyled>
                    <MyAnchorStyled href="https://exampe.com">
                        Background should be limegreen
                    </MyAnchorStyled>
                    <div className={cx(
                        css({
                            "@media screen and (min-width: 1px)": {
                                "backgroundColor": "red"
                            },
                            "height": 50
                        }),
                        css({
                            "backgroundColor": "lightgreen"
                        })
                    )}>
                        background should be lightgreen
                    </div>

                    <div className={css({
                        "padding": 30,
                        "backgroundColor": theme.palette.background.paper
                    })}>
                        <Button onClick={() => setIsDarkModeEnabled(!isDarkModeEnabled)} >
                            Currently in {isDarkModeEnabled ? "dark" : "light"} mode, click to toggle
                        </Button>
                    </div>
                    <SecondNestedSelectorExample />
                    <MyTestComponentForMergedClasses />
                    <TestCastingMuiTypographyStyleToCSSObject />
                    <TestPr54 />
                    <TestingStyleOverrides 
                        className={css({ "backgroundColor": "white" })}
                        classes={{
                            "root": css({
                                "backgroundColor": "red",
                                "border": "1px solid black"
                            })
                        }}
                        lightBulbBorderColor="black"
                    />
				    <StyledTab icon={<PhoneIcon />} label="Background should be greenish" />
                    <TestSxComponent />
                </div>
            </>
        );
    }

    const useStyles = makeStyles<void, "child" | "breadcrumbs2_separator" | "childRefTest_wrapper2" | "childRefTest_wrapper1">({
        "name": { App },
        "uniqId": "s4phyZ"
    })((theme, _params, classes) => {

        const childRefTest_wrapper2 = {
            "border": "1px solid black",
            "margin": 30,
            "height": 100,
            "color": "black"
        };

        return {
            "root": {
                "& > h1:nth-child(2)": {
                    "color": theme.palette.primary.main,
                }
            },
            "ovStyled": {
                "color": "darkred"
            },
            "ovInternal": {
                "backgroundColor": "darkblue"
            },
            "parent": {
                "border": "1px solid black",
                "padding": 30,
                [`&:hover .${classes.child}`]: {
                    "background": "red",
                }
            },
            "child": {
                "background": "blue",
                "border": "1px solid black"
            },
            "breadcrumbs_className": {
                "backgroundColor": "lightblue",
                "& .MuiBreadcrumbs-separator": {
                    "color": "red"
                },
                "&:hover .MuiBreadcrumbs-separator": {
                    "color": "blue"
                }
            },

            "breadcrumbs2_root": {
                "backgroundColor": "lightblue",
                [`&:hover .${classes.breadcrumbs2_separator}`]: {
                    "color": "blue"
                }
            },
            "breadcrumbs2_separator": {
                "color": "red"
            },

            "button2_className": {
                "backgroundColor": "red"
            },

            "button2_root": {
                "backgroundColor": "red"
            },

            "testCx_bgYellow": {
                "backgroundColor": "yellow"
            },
            "testCx_bgCyan": {
                "backgroundColor": "cyan"
            },

            "childRefTest_wrapper": {
                "border": "1px solid black",
                [`&:hover .${classes.childRefTest_wrapper1}`]: {
                    "backgroundColor": "cyan"
                }
            },
            "childRefTest_wrapper1": {
                ...childRefTest_wrapper2
            },
            childRefTest_wrapper2,
            "childRefTest_textColorPink": {
                "color": "pink"
            },
            "mq": {
                "height": 100,
                "backgroundColor": "lightgreen",
                "@media (max-width: 960px)": {
                    "backgroundColor": "cyan"
                }
            },
        };
    });

    return { App };

})();

function MyComponent(props: { className?: string; colorSmall: string; }) {
    return (
        <div className={props.className}>
            The background color should turn from limegreen to cyan when the window
            inner with goes below 960px.
            Font should be red
        </div>
    );
}

const MyComponentStyled = withStyles(
    MyComponent,
    (theme, props) => ({
        "root": {
            "backgroundColor": theme.palette.primary.main,
            "height": 100,
            "marginTop": 20
        },
        "@media (max-width: 960px)": {
            "root": {
                "backgroundColor": props.colorSmall
            },
        }
    })
);

const MyStyledButton = withStyles(
    Button,
    {
        "text": {
            "color": "red",
            "textTransform": "unset"
        },
        "@media (max-width: 960px)": {
            "text": {
                "color": "blue"
            },
        }
    },
    { "name": "MyStyledButton" }
);

const MyAnchorStyled = withStyles(
    "a",
    (theme, { href }) => ({
        "root": {
            "border": "1px solid black",
            "backgroundColor":
                href?.startsWith("https") ?
                    theme.palette.primary.main :
                    "red"
        }
    })
);


const MyBreadcrumbs = withStyles(
    Breadcrumbs,
    (theme, _props, classes) => ({
        "ol": {
            [`& .${classes.separator}`]: {
                "color": theme.palette.primary.main
            }
        }
    }),
    { "uniqId": "mVgGsK" }
);

const { SecondNestedSelectorExample } = (() => {

    const SecondNestedSelectorExample = memo(() => {

        const { classes, cx } = useStyles({ "color": "primary" });

        return (
            <div className={classes.root}>
                <div className={classes.child}>
                    The Background take the primary theme color when the mouse is hover the parent.
                </div>
                <div className={cx(classes.child, classes.small)}>
                    The Background take the primary theme color when the mouse is hover the parent.
                    I am smaller than the other child.
                </div>
            </div>
        );

    });
    SecondNestedSelectorExample.displayName = "SecondNestedSelectorExample";

    const useStyles = makeStyles<{ color: "primary" | "secondary" }, "child" | "small">({
        "name": { SecondNestedSelectorExample },
        "uniqId": "2rd8IJ"
    })(
        (theme, { color }, classes) => ({
            "root": {
                "padding": 30,
                [`&:hover .${classes.child}`]: {
                    "backgroundColor": theme.palette[color].main,
                },
            },
            "small": {},
            "child": {
                "border": "1px solid black",
                "height": 50,
                [`&.${classes.small}`]: {
                    "height": 30,
                }
            },
        })
    );

    return { SecondNestedSelectorExample };

})();


const { MyTestComponentForMergedClasses } = (() => {

    const useStyles = makeStyles()({
        "foo": {
            "border": "3px dotted black",
            "backgroundColor": "red"
        },
        "bar": {
            "color": "pink"
        }
    });

    type Props = {
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    };

    const MyTestComponentForMergedClassesInternal = (props: Props) => {

        const { classes } = useStyles(undefined, { props });

        return (
            <div className={classes.foo}>
                <span className={classes.bar}>The background should be green, the box should have a dotted border and the text should be pink</span>
            </div>
        );

    };


    const MyTestComponentForMergedClasses = () => {

        const { css } = useStyles();

        return <MyTestComponentForMergedClassesInternal classes={{ "foo": css({ "backgroundColor": "green" }) }} />;

    };

    return { MyTestComponentForMergedClasses };

})();

const { TestCastingMuiTypographyStyleToCSSObject } = (() => {

    const useStyles = makeStyles()(theme => ({
        "root": {
            ...(theme.typography.subtitle2 as CSSObject),
            "color": "red"
        }
    }));

    const TestCastingMuiTypographyStyleToCSSObject = () => {

        const { classes } = useStyles();

        return (
            <>
                <Typography variant="subtitle2">This text should be italic</Typography>
                <span className={classes.root}>This text should be italic and red</span>
            </>
        );

    };

    return { TestCastingMuiTypographyStyleToCSSObject };

})();

const { TestPr54 } = (() => {

    const CustomInputBase = withStyles(
        InputBase,
        {
            "input": {
                "backgroundColor": "red",
                "color": "pink"
            }
        }
    );

    const StyledInput = withStyles(CustomInputBase, theme => ({
        "input": {
            "backgroundColor": theme.palette.primary.main
        }
    }));

    const TestPr54 = () => (
        <>
            <span>The Input below should have a lime green background and when you type the text should be pink</span>
            <StyledInput />
        </>
    );

    return { TestPr54 };

})();


const { TestingStyleOverrides } = (() => {

    type Props = {
        className?: string;
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
        lightBulbBorderColor: string;
    }

    function TestingStyleOverrides(props: Props) {

        const { className } = props;

        const [isOn, toggleIsOn] = useReducer(isOn => !isOn, false);

        const { classes, cx } = useStyles(undefined, { props, "ownerState": { isOn } });

        return (
            <div className={cx(classes.root, className)} >
                <div className={classes.lightBulb}></div>
                <button onClick={toggleIsOn}>{`Turn ${isOn?"off":"on"}`}</button>
                <p>Div should have a border, background should be white</p>
                <p>Light bulb should have black border, it should be yellow when turned on.</p>
            </div>
        );

    }

    const useStyles = makeStyles({ "name": { TestingStyleOverrides } })({
        "root": {
            "border": "1px solid black",
            "width": 500,
            "height": 200,
            "position": "relative",
            "color": "black"
        },
        "lightBulb": {
            "position": "absolute",
            "width": 50,
            "height": 50,
            "top": 120,
            "left": 500/2 - 50,
            "borderRadius": "50%"
        }
    });

    return { TestingStyleOverrides };

})();


const StyledTab = withStyles(Tab, {
	"root": {
		"backgroundColor": "red"
	},
	"labelIcon": {
		"backgroundColor": "green"
	}
});


const { TestSxComponent } = (() => {

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

    return { TestSxComponent };

})();