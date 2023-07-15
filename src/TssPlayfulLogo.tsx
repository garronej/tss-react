
import { useState, useEffect } from "react";
import { makeStyles } from "theme";
import { useConstCallback } from "powerhooks";
import Slider from "@mui/material/Slider";
import tssTextImgUrl from "assets/tss_text.png";
import tssSquareImgUrl from "assets/tss_square.png";


export type Props = {
	className?: string;
	id?: string;
	onLoad?: () => void;
};

const goodOffset = 83;
const maxOffset = 100;
const transitionDuration = 700;

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

	const [offset, setOffset] = useState(0);

	const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);


	useEffect(()=>{

		if(!isImageLoaded){
			return;
		}

		(async ()=>{

			await new Promise((resolve) => setTimeout(resolve, 1200));

			setOffset(goodOffset);

			await new Promise((resolve) => setTimeout(resolve, transitionDuration));

			setIsTransitionEnabled(false);

		})();

	}, [isImageLoaded]);

	const { classes, cx } = useStyles({
		isImageLoaded,
		isTransitionEnabled,
		offset
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
				data-offset={offset}
				src={tssTextImgUrl}
				alt="TSS text"
			/>
			<Slider
				min={0}
				max={maxOffset}
				className={classes.slider}
				value={offset}
				onChange={(_e, offset) => setOffset(offset as number)}
			/>
		</div>
	);
}

const useStyles = makeStyles<{ isImageLoaded: boolean; isTransitionEnabled: boolean; offset: number; }>({
	"name": { TssPlayfulLogo },
})((theme, { isImageLoaded, isTransitionEnabled, offset }) => ({
	"root": {
		"position": "relative"
	},
	"squareImg": {
		"width": isImageLoaded ? "100%" : undefined,
		"height": isImageLoaded ? "auto" : undefined,
		"zIndex": -1
	},
	"textImg": {
		"position": "absolute",
		"top": "0",
		"left": offset - maxOffset,
		"transition": !isTransitionEnabled ? undefined : `left ${transitionDuration}ms ease-in-out`,
		"width": isImageLoaded ? "100%" : undefined,
		"height": isImageLoaded ? "auto" : undefined,
	},
	"slider": {
		"position": "relative",
		"left": 4,
		"width": 366,
		"marginTop": theme.spacing(3),
	},
}));