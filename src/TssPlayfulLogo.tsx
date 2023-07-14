
import { useState } from "react";
import { makeStyles } from "theme";
import { useConstCallback } from "powerhooks";
import tssTextImgUrl from "assets/tss_text.png";
import tssSquareImgUrl from "assets/tss_square.png";

export type Props = {
	className?: string;
	id?: string;
	onLoad?: () => void;
};

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

	const { classes, cx } = useStyles({
		isImageLoaded,
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
		</div>
	);
}

const useStyles = makeStyles<{ isImageLoaded: boolean; }>({
	"name": { TssPlayfulLogo },
})((_theme, { isImageLoaded }) => ({
	"root": {
		"position": "relative",
	},
	"squareImg": {
		"width": isImageLoaded ? "100%" : undefined,
		"height": isImageLoaded ? "auto" : undefined,
		"zIndex": -1
	},
	"textImg": {
		"position": "absolute",
		"top": "0",
		"left": "0",
		"width": isImageLoaded ? "100%" : undefined,
		"height": isImageLoaded ? "auto" : undefined,
	},
}));