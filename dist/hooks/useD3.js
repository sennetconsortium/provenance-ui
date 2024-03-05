"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = require("react");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var _default = useD3;
exports.default = _default;