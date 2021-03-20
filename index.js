"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseClassNamesFactory = exports.css = exports.cx = exports.sheet = exports.merge = exports.keyframes = exports.injectGlobal = exports.hydrate = exports.getRegisteredStyles = exports.flush = exports.cache = void 0;
var css_1 = require("@emotion/css");
Object.defineProperty(exports, "cache", { enumerable: true, get: function () { return css_1.cache; } });
Object.defineProperty(exports, "flush", { enumerable: true, get: function () { return css_1.flush; } });
Object.defineProperty(exports, "getRegisteredStyles", { enumerable: true, get: function () { return css_1.getRegisteredStyles; } });
Object.defineProperty(exports, "hydrate", { enumerable: true, get: function () { return css_1.hydrate; } });
Object.defineProperty(exports, "injectGlobal", { enumerable: true, get: function () { return css_1.injectGlobal; } });
Object.defineProperty(exports, "keyframes", { enumerable: true, get: function () { return css_1.keyframes; } });
Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return css_1.merge; } });
Object.defineProperty(exports, "sheet", { enumerable: true, get: function () { return css_1.sheet; } });
var css_2 = require("@emotion/css");
//SEE: https://github.com/emotion-js/emotion/pull/2276
exports.cx = css_2.cx;
var css_3 = require("@emotion/css");
Object.defineProperty(exports, "css", { enumerable: true, get: function () { return css_3.css; } });
var createUseClassNamesFactory_1 = require("./createUseClassNamesFactory");
/** https://github.com/garronej/tss-react */
function createUseClassNamesFactory(params) {
    var useTheme = params.useTheme;
    return createUseClassNamesFactory_1.createUseClassNamesFactory({ useTheme: useTheme, css: css_3.css });
}
exports.createUseClassNamesFactory = createUseClassNamesFactory;
//# sourceMappingURL=index.js.map