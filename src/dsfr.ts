import { useColors } from "@codegouvfr/react-dsfr/useColors";
import { createMakeAndWithStyles } from "./index";

/** @deprecated: Please use import { makeStyles } from "@codegouvfr/react-dsfr/tss"; instead. */
export const { makeStyles, withStyles, useStyles } = createMakeAndWithStyles({
    "useTheme": useColors
});
