import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "./index";

/** @see <https://docs.tss-react.dev/setup> */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    useTheme,
});
