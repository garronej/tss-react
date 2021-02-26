"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseClassNamesFactory = void 0;
require("minimal-polyfills/Object.fromEntries");
var css_1 = require("@emotion/css");
var objectKeys_1 = require("evt/tools/typeSafety/objectKeys");
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
function createUseClassNamesFactory(params) {
    var useTheme = params.useTheme;
    function createUseClassNames() {
        return function (getCssObjects) {
            function useClassNames(params) {
                var theme = useTheme();
                var cssObjects = getCssObjects(theme, params);
                return {
                    "classNames": Object.fromEntries(objectKeys_1.objectKeys(cssObjects)
                        .map(function (key) { return [key, css_1.css(cssObjects[key])]; })),
                };
            }
            return { useClassNames: useClassNames };
        };
    }
    return { createUseClassNames: createUseClassNames };
}
exports.createUseClassNamesFactory = createUseClassNamesFactory;
//# sourceMappingURL=createUseClassNamesFactory.js.map