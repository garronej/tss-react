import { createMakeStyles } from "tss-react";

export function useTheme() {
    return {
        "limeGreen": "#32CD32",
    };
}

export const { makeStyles, useStyles } = createMakeStyles({ useTheme });