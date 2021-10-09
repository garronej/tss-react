
import { createMakeStyles, createWithStyles } from "tss-react";
import { useTheme } from "@mui/material/styles";

export const { makeStyles, useStyles } = createMakeStyles({ useTheme });
export const { withStyles } = createWithStyles({ useTheme });
