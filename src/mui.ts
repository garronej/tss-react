import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "./index";
import { unstable_styleFunctionSx as styleFunctionSx } from "@mui/system";
import type { CSSObject } from "./types";

/** @see <https://docs.tss-react.dev/setup> */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    useTheme,
});

export const { makeStyles: makeSxStyles, withStyles: withSxStyles } =
    createMakeAndWithStyles({
        useTheme,
        "customObjectToCSSObject": ({ customObject: sx, theme }) =>
            styleFunctionSx({ sx, theme }) as CSSObject,
    });
