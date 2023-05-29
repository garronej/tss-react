import { useColors } from "@codegouvfr/react-dsfr/useColors";
import { createMakeAndWithStyles } from "./index";

/** @see <https://react-dsfr.etalab.studio/css-in-js#tss-react> */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    "useTheme": useColors
});
