import "minimal-polyfills/Object.fromEntries";
import type { CSSObject } from "@emotion/css";
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
export declare function createUseClassNamesFactory<Theme extends Object = {}>(params: {
    useTheme(): Theme;
}): {
    createUseClassNames: <Params extends Record<string, unknown>>() => <Key extends string>(getCssObjects: (themeWrap: {
        theme: Theme;
    }, params: Params) => Record<Key, CSSObject>) => {
        useClassNames: (params: Params) => {
            classNames: Record<Key, string>;
        };
    };
};
