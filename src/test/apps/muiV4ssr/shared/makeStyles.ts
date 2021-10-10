import { createMakeAndWithStyles } from "tss-react";
import { useTheme } from "@material-ui/core/styles";

export const { makeStyles, useStyles, withStyles } = createMakeAndWithStyles({ useTheme });