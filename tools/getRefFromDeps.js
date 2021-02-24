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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefFromDepsFactory = void 0;
var memoizee_1 = __importDefault(require("memoizee"));
function getRefFromDepsFactory(params) {
    var max = params.max;
    var memoizedByNumberOfArgument = new Map();
    function getRefFromDeps(deps) {
        var memoized = memoizedByNumberOfArgument.get(deps.length);
        if (memoized !== undefined) {
            return memoized.apply(void 0, __spreadArray([], __read(deps)));
        }
        memoizedByNumberOfArgument.set(deps.length, memoizee_1.default(function () {
            var _deps = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _deps[_i] = arguments[_i];
            }
            return ({});
        }, {
            "length": deps.length,
            max: max
        }));
        return getRefFromDeps(deps);
    }
    return { getRefFromDeps: getRefFromDeps };
}
exports.getRefFromDepsFactory = getRefFromDepsFactory;
//# sourceMappingURL=getRefFromDeps.js.map