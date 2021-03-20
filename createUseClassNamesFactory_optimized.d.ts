import "./tools/Object.fromEntries";
import type { CSSObject } from "@emotion/css";
/**
 * !EXPERIMENTAL!
 *
 * Functionally equivalent from the exported but with optimization
 * mechanism implemented.
 *
 * Implementation of JSS createStyles() based on @emotion/react
 *
 * const { useCssRecord } = createUseClassNames<Props & { color: "red" | "blue" }>()({
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
 *     const { classNames }=useClassName({...props, color });
 *
 *     return <span className={classNames.root}>hello world</span>;
 *
 * }
 *
 */
export declare function createUseClassNamesFactory<Theme extends Object = {}>(params: {
    useTheme(): Theme;
}): {
    createUseClassNames: <Params extends Record<string, unknown> = {}>() => <Key extends string>(getCssObjects: (theme: Theme, params: Params) => Record<Key, CSSObject>) => {
        useClassNames: (params: Params) => {
            classNames: Record<Key, string>;
        };
    };
};
