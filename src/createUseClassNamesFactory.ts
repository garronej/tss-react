

import "minimal-polyfills/Object.fromEntries";
import { css } from "@emotion/css";
import type { CSSObject } from "@emotion/css";
import { objectKeys } from "evt/tools/typeSafety/objectKeys";

/** 
 * 
 * Implementation of JSS createStyles() based on @emotion/react
 * 
 * const { useClassNames } = createUseClassNames<Props & { color: "red" | "blue" }>()({
 *    (theme, { color })=> ({
 *        "root": { color }
 *    })
 * });
 * 
 * 
 * function MyComponent(props: Props){
 * 
 *     const [ color, setColor ]= useState<"red" | "blue">("red");
 * 
 *     const { classNames }=useClassNames({...props, color });
 * 
 *     return <span className={classNames.root}>hello world</span>;
 * 
 * }
 * 
 */
export function createUseClassNamesFactory<Theme extends Object = {}>(
    params: {
        useTheme(): Theme;
    }
) {

    const { useTheme } = params;

    function createUseClassNames<Params extends Record<string, unknown>>() {

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


