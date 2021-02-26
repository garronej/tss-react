"use strict";
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
exports.areSameSet = void 0;
function areSameSet(set1, set2) {
    var e_1, _a;
    if (set1.size !== set2.size) {
        return false;
    }
    try {
        for (var set1_1 = __values(set1), set1_1_1 = set1_1.next(); !set1_1_1.done; set1_1_1 = set1_1.next()) {
            var elem = set1_1_1.value;
            if (!set2.has(elem)) {
                return false;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (set1_1_1 && !set1_1_1.done && (_a = set1_1.return)) _a.call(set1_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}
exports.areSameSet = areSameSet;
//# sourceMappingURL=areSameSet.js.map