import { createMakeStyles } from "tss-react";
import { getCache } from "tss-react/cache";

export function useTheme() {
    return {
        "limeGreen": "#32CD32",
    };
}

export const { makeStyles, useStyles } = createMakeStyles({
    useTheme,
    "cache": getCache()
});