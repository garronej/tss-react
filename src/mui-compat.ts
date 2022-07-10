import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "./compat";

/** @see <https://docs.tss-react.dev/setup> */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    useTheme,
});
