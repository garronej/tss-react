import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "./index";

export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    useTheme,
});
