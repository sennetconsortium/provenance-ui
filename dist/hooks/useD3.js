"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const useD3 = () => {
  const [d3, setD3] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  const [error, setError] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const loadD3 = async () => {
      try {
        const lib = await Promise.resolve().then(() => _interopRequireWildcard(require('d3')));
        setD3(lib);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
        console.error(e);
      }
    };
    loadD3();
    return () => {};
  }, []);
  return {
    d3,
    loading,
    error
  };
};
var _default = exports.default = useD3;