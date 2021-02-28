"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseClassNamesFactory = void 0;
require("./tools/Object.fromEntries");
var assert_1 = require("evt/tools/typeSafety/assert");
var typeGuard_1 = require("evt/tools/typeSafety/typeGuard");
var getRefFromDeps_1 = require("./tools/getRefFromDeps");
var areSameSet_1 = require("./tools/areSameSet");
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var css_1 = require("@emotion/css");
var objectKeys_1 = require("./tools/objectKeys");
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
function createUseClassNamesFactory(params) {
    var useTheme = params.useTheme;
    function createUseClassNames() {
        return function (getCssObjects) {
            var getClassNamesAndAccessedParamsKeys = function (theme, params) {
                var accessedParamsKeys = new Set();
                var cssObjects = getCssObjects(theme, new Proxy(params, {
                    "get": function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var _a = __read(args, 2), prop = _a[1];
                        assert_1.assert(typeof prop === "string" &&
                            typeGuard_1.typeGuard(prop));
                        accessedParamsKeys.add(prop);
                        return Reflect.get.apply(Reflect, __spreadArray([], __read(args)));
                    }
                }));
                return {
                    "classNames": Object.fromEntries(objectKeys_1.objectKeys(cssObjects)
                        .map(function (key) { return [key, css_1.css(cssObjects[key])]; })),
                    accessedParamsKeys: accessedParamsKeys
                };
            };
            var arrayOfAccessedParamsKeys = [];
            var classNamesByRef = new WeakMap_1.Polyfill();
            var getRef = (function () {
                var getDeps = function (accessedParamsKeys, params) {
                    return __spreadArray([], __read(accessedParamsKeys)).map(function (key) { return params[key]; });
                };
                var getRefFromDeps = getRefFromDeps_1.getRefFromDepsFactory({ "max": 50 }).getRefFromDeps;
                function getRef(theme, accessedParamsKeys, params) {
                    return getRefFromDeps(__spreadArray([theme], __read(getDeps(accessedParamsKeys, params))));
                }
                return { getRef: getRef };
            })().getRef;
            function useClassNames(params) {
                var e_1, _a;
                var theme = useTheme();
                try {
                    for (var arrayOfAccessedParamsKeys_1 = __values(arrayOfAccessedParamsKeys), arrayOfAccessedParamsKeys_1_1 = arrayOfAccessedParamsKeys_1.next(); !arrayOfAccessedParamsKeys_1_1.done; arrayOfAccessedParamsKeys_1_1 = arrayOfAccessedParamsKeys_1.next()) {
                        var accessedParamsKeys_1 = arrayOfAccessedParamsKeys_1_1.value;
                        var classNames_1 = classNamesByRef.get(getRef(theme, accessedParamsKeys_1, params));
                        if (classNames_1 !== undefined) {
                            return { classNames: classNames_1 };
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (arrayOfAccessedParamsKeys_1_1 && !arrayOfAccessedParamsKeys_1_1.done && (_a = arrayOfAccessedParamsKeys_1.return)) _a.call(arrayOfAccessedParamsKeys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var _b = getClassNamesAndAccessedParamsKeys(theme, params), classNames = _b.classNames, accessedParamsKeys = _b.accessedParamsKeys;
                if (arrayOfAccessedParamsKeys.every(function (accessedParamsKeys_i) { return !areSameSet_1.areSameSet(accessedParamsKeys_i, accessedParamsKeys); })) {
                    arrayOfAccessedParamsKeys.push(accessedParamsKeys);
                }
                classNamesByRef.set(getRef(theme, accessedParamsKeys, params), classNames);
                return { classNames: classNames };
            }
            return { useClassNames: useClassNames };
        };
    }
    return { createUseClassNames: createUseClassNames };
}
exports.createUseClassNamesFactory = createUseClassNamesFactory;
//# sourceMappingURL=createUseClassNamesFactory_optimized.js.map