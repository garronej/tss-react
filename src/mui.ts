import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "./index";
import { unstable_styleFunctionSx as styleFunctionSx } from "@mui/system";
import type { CSSObject } from "./types";
import { SxProps, Theme } from "@mui/material/styles";

/** @see <https://docs.tss-react.dev/setup> */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    useTheme,
});

export const sxToCSSObject = (params: {
    customObject: SxProps<Theme>;
    theme: Theme;
}) => {
    const { customObject: sx, theme } = params;
    return styleFunctionSx({ sx, theme }) as CSSObject;
};

export const { makeStyles: makeSxStyles, withStyles: withSxStyles } =
    createMakeAndWithStyles({
        useTheme,
        "customObjectToCSSObject": sxToCSSObject,
    });
