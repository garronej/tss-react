// NOTE: We can't test directly with tss-react/mui because there 
// there is a dual package situation that occurs when linking tss-react locally.  
// It will work fine in actual projects though.  

import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles, createTss } from "tss-react";
import { useMuiThemeStyleOverridesPlugin } from "tss-react/mui";

/** @see <https://docs.tss-react.dev/setup> */
export const { makeStyles, withStyles } = createMakeAndWithStyles({
    useTheme
});

export const { tss } = createTss({
    "useContext": function useContext() {
        const theme = useTheme();
        return { theme };
    },
    "usePlugin": useMuiThemeStyleOverridesPlugin
});

export const useStyles = tss.create({});