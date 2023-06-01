import { useTheme } from "@mui/material";
import { createMakeAndWithStyles } from "./index";

/** @see <https://docs.tss-react.dev/setup> */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    useTheme
});
