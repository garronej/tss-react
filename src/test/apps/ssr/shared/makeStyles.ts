import { createMakeStyles, createWithStyles } from "tss-react";
import { useTheme } from "@material-ui/core/styles";

export const { makeStyles, useStyles } = createMakeStyles({ useTheme });
export const { withStyles } = createWithStyles({ useTheme });