import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "./compat";
import { createTss } from "./tss";

/** @see <https://docs.tss-react.dev/setup> */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    useTheme
});

function useContext() {
    const theme = useTheme();
    return { theme };
}

export const { tss } = createTss({ useContext });
