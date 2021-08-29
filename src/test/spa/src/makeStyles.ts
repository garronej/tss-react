
import { createMakeStyles } from "tss-react";
import { useTheme } from "@material-ui/core/styles";
import createCache from "tss-react/@emotion/cache"; //or "@emotion/cache"

export const muiCache = createCache({
	"key": "mui",
	"prepend": true
});

export const tssCache = createCache({
	"key": "tss-react",
});

export const { makeStyles, useStyles } = createMakeStyles({ 
	useTheme, 
	"cache": tssCache 
});
