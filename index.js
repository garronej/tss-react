"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseClassNamesFactory = void 0;
__exportStar(require("@emotion/css"), exports);
var css_1 = require("@emotion/css");
var createUseClassNamesFactory_1 = require("./createUseClassNamesFactory");
/** https://github.com/garronej/tss-react */
function createUseClassNamesFactory(params) {
    var useTheme = params.useTheme;
    return createUseClassNamesFactory_1.createUseClassNamesFactory({ useTheme: useTheme, css: css_1.css });
}
exports.createUseClassNamesFactory = createUseClassNamesFactory;
//# sourceMappingURL=index.js.map