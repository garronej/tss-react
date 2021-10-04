
import { makeStyles, withStyles } from "makeStyles";
import { GlobalStyles } from "tss-react";
import { styled } from "@material-ui/core";
import Button from "@material-ui/core/Button"
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const useStyles = makeStyles()((theme, _params, createRef) => {

	const child = {
		"ref": createRef(),
		"background": "blue",
		"border": "1px solid black"
	};

	const breadcrumbs2_separator = {
		"ref": createRef(),
		"color": "red"
	};

	const childRefTest_wrapper2 = {
		"border": "1px solid black",
		"margin": 30,
		"height": 100,
		"color": "black"
	} as const;

	const childRefTest_wrapper1 = {
		"ref": createRef(),
		...childRefTest_wrapper2
	} as const;

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
			[`&:hover .${child.ref}`]: {
				"background": "red",
			}
		},
		child,
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
			[`&:hover .${breadcrumbs2_separator.ref}`]: {
				"color": "blue"
			}
		},
		breadcrumbs2_separator,

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
			[`&:hover .${childRefTest_wrapper1.ref}`]: {
				"backgroundColor": "cyan"
			}
		},
		childRefTest_wrapper1,
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
		}
	};
});


const H1 = styled('h1')({
	"color": "yellow"
});

export function App(props: { className?: string; }) {
	const { className } = props;
	const { classes, css, cx } = useStyles();

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
					inner with goes is below 960px
				</div>

				<MyComponentStyled
					className={css({ "color": "red" })}
					colorSmall="cyan"
				/>
				<MyStyledButton>
					The text should turn from red to blue when the
					window inner width goes below 960px
				</MyStyledButton>


			</div>
		</>
	);
}

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
			"color": "red"
		},
		"@media (max-width: 960px)": {
			"text": {
				"color": "blue"
			},
		}
	}
);
