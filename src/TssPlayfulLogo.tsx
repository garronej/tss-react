
import { useState, useEffect } from "react";
import { makeStyles } from "theme";
import { useConstCallback } from "powerhooks";
import Slider from "@mui/material/Slider";
import tssTextImgUrl from "assets/tss_text.png";
import tssSquareImgUrl from "assets/tss_square.png";
import { useWindowInnerSize } from "powerhooks/useWindowInnerSize";
import { breakpointsValues } from "onyxia-ui";


export type Props = {
	className?: string;
	id?: string;
	onLoad?: () => void;
};

const transitionDuration = 700;
const targetSliderValuePr = 83;

export function TssPlayfulLogo(props: Props) {
	const {
		id,
		className,
		onLoad: onLoadProp,
	} = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const onLoad = useConstCallback(() => {
		setIsImageLoaded(true);
		onLoadProp?.();
	});

	const [sliderPercentageValue, setSliderPercentageValue] = useState(0);

	const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);


	useEffect(() => {

		if (!isImageLoaded) {
			return;
		}

		(async () => {

			await new Promise((resolve) => setTimeout(resolve, 1200));

			setSliderPercentageValue(targetSliderValuePr);

			await new Promise((resolve) => setTimeout(resolve, transitionDuration));

			setIsTransitionEnabled(false);

		})();

	}, [isImageLoaded]);

	const size = (function useClosure() {

		const { windowInnerWidth } = useWindowInnerSize();

		if( windowInnerWidth < breakpointsValues.sm ){
			return "small";
		}

		return "big";

	})();

	const { classes, cx } = useStyles({
		isImageLoaded,
		isTransitionEnabled,
		sliderPercentageValue,
		size
	});


	return (
		<div id={id} className={cx(classes.root, className)} >
			<img
				className={classes.squareImg}
				src={tssSquareImgUrl}
				alt="Blue square"
			/>
			<img
				className={classes.textImg}
				onLoad={onLoad}
				src={tssTextImgUrl}
				alt="TSS text"
			/>
			<Slider
				min={0}
				max={100}
				className={classes.slider}
				value={sliderPercentageValue}
				onChange={(_e, offset) => setSliderPercentageValue(offset as number)}
			/>
		</div>
	);
}

const useStyles = makeStyles<{ 
	isImageLoaded: boolean; 
	isTransitionEnabled: boolean; 
	sliderPercentageValue: number; 
	size: "big" | "small";
}>({
	"name": { TssPlayfulLogo },
})((theme, { isImageLoaded, isTransitionEnabled, sliderPercentageValue, size }) => ({
	"root": {
		"position": "relative",
		"&&": {
			"width": (()=>{
				switch(size){
					case "big": return 460;
					case "small": return 300;
				}
			})(),
		}
	},
	"squareImg": {
		"width": isImageLoaded ? "100%" : undefined,
		"height": isImageLoaded ? "auto" : undefined,
		"zIndex": -1
	},
	"textImg": {
		"position": "absolute",
		"top": "0",
		/*
		When root width is 460px;

		slider: 0%   -> left: -82px
		slider: 100% -> left: 16px
		slider: x%   -> left: -82px + 98px * x / 100

		When root width is 300px;

		slider: 0%   -> left: -53px
		slider: 100% -> left: 10px
		slider: x%   -> left: -53px + 63px * x / 100
		*/
		"left": (()=>{
			switch(size){
				case "big": return `calc(-82px + 98px * ${sliderPercentageValue} / 100)`;
				case "small": return `calc(-53px + 63px * ${sliderPercentageValue} / 100)`;
			}
		})(),
		"transition": !isTransitionEnabled ? undefined : `left ${transitionDuration}ms ease-in-out`,
		"width": isImageLoaded ? "100%" : undefined,
		"height": isImageLoaded ? "auto" : undefined,
	},
	"slider": {
		"position": "relative",
		"left": 4,
		"width": "calc(100% - 4px * 2)",
		"marginTop": theme.spacing(3)
	},
}));