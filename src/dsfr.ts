import { useColors } from "@codegouvfr/react-dsfr";
import { createMakeAndWithStyles } from "./index";

/** @see <https://docs.tss-react.dev/setup> */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    "useTheme": useColors,
});
