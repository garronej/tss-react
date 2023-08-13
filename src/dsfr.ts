import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { createTss } from "./tss";

function useContext() {
    const { isDark } = useIsDark();

    return { isDark };
}

/** @see <https://react-dsfr.etalab.studio/css-in-js#tss-react> */
export const { tss } = createTss({ useContext });

export const useStyles = tss.createUseStyles(() => ({}));
