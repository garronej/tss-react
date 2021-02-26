export * from "@emotion/css";
/** https://github.com/garronej/tss-react */
export declare function createUseClassNamesFactory<Theme extends Object = {}>(params: {
    useTheme(): Theme;
}): {
    createUseClassNames: <Params extends Record<string, unknown>>() => <Key extends string>(getCssObjects: (theme: Theme, params: Params) => Record<Key, import("@emotion/serialize").CSSObject>) => {
        useClassNames: (params: Params) => {
            classNames: Record<Key, string>;
        };
    };
};
