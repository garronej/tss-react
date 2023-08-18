import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { createTss } from "./tss";

/** @see <https://react-dsfr.etalab.studio/css-in-js#tss-react> */
export const { tss } = createTss({
    "useContext": function useDsfrContext() {
        const { isDark } = useIsDark();
        return { isDark };
    }
});

export const useStyles = tss.create({});
