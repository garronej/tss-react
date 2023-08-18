import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "../index";
import { createTss } from "../tss";
import { useMuiThemeStyleOverridesPlugin } from "./themeStyleOverridesPlugin";

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
