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
Object.defineProperty(exports, "__esModule", { value: true });
if (!Object.fromEntries) {
    Object.defineProperty(Object, "fromEntries", {
        "value": function (entries) {
            if (!entries || !entries[Symbol.iterator]) {
                throw new Error('Object.fromEntries() requires a single iterable argument');
            }
            var o = {};
            Object.keys(entries).forEach(function (key) {
                var _a = __read(entries[key], 2), k = _a[0], v = _a[1];
                o[k] = v;
            });
            return o;
        }
    });
}
//# sourceMappingURL=Object.fromEntries.js.map