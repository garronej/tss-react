

import "./tools/Object.fromEntries";
import type { CSSObject } from "@emotion/css";
import { objectKeys } from "./tools/objectKeys";

/** 
 * https://github.com/garronej/tss-react 
 * */
export function createUseClassNamesFactory<Theme extends Object = {}>(
    params: {
        useTheme(): Theme;
        /** The css function as in: import { css } from "@emotion/css" */
        css(cssObject: CSSObject): string
    }
) {

    const { useTheme, css } = params;

    function createUseClassNames<Params extends Record<string, unknown> ={}>() {

        return function <Key extends string>(
            getCssObjects: (theme: Theme, params: Params) => Record<Key, CSSObject>
        ) {

            function useClassNames(params: Params) {

                const theme = useTheme();

                const cssObjects = getCssObjects(theme, params);

                return {
                    "classNames": Object.fromEntries(
                        objectKeys(cssObjects)
                            .map(key => [key, css(cssObjects[key])])
                    ) as Record<Key, string>,
                };

            }

            return { useClassNames };

        }

    }

    return { createUseClassNames };

}


