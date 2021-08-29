import { createMakeStyles } from "tss-react";
import { getCache } from "tss-react/cache";
import { useTheme } from "@material-ui/core/styles";

export const { makeStyles, useStyles } = createMakeStyles({
    useTheme,
    "cache": getCache()
});