"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseClassNamesFactory = void 0;
require("./tools/Object.fromEntries");
var objectKeys_1 = require("./tools/objectKeys");
/**
 * https://github.com/garronej/tss-react
 *
 * */
function createUseClassNamesFactory(params) {
    var useTheme = params.useTheme, css = params.css;
    function createUseClassNames() {
        return function (getCssObjects) {
            function useClassNames(params) {
                var theme = useTheme();
                var cssObjects = getCssObjects(theme, params);
                return {
                    "classNames": Object.fromEntries(objectKeys_1.objectKeys(cssObjects)
                        .map(function (key) { return [key, css(cssObjects[key])]; })),
                };
            }
            return { useClassNames: useClassNames };
        };
    }
    return { createUseClassNames: createUseClassNames };
}
exports.createUseClassNamesFactory = createUseClassNamesFactory;
//# sourceMappingURL=createUseClassNamesFactory.js.map