"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jquery = _interopRequireDefault(require("jquery"));
var _ProvenanceTree = _interopRequireDefault(require("../js/ProvenanceTree"));
var _useD = _interopRequireDefault(require("../hooks/useD3"));
var _constants = require("../js/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ProvenanceUI(_ref) {
  let {
    children,
    data,
    options = {}
  } = _ref;
  const {
    d3,
    error,
    loading
  } = (0, _useD.default)();
  const selectorId = options.selectorId || _constants.SELECTOR_ID;
  const initialized = (0, _react.useRef)(false);
  const addVisitedClass = () => {
    (0, _jquery.default)("#".concat(selectorId)).on('click', '.node', function (e) {
      (0, _jquery.default)(e.currentTarget).addClass('is-visited');
    });
  };
  (0, _react.useEffect)(() => {
    if (!options.noStyles) {
      (specifier => new Promise(r => r(specifier)).then(s => _interopRequireWildcard(require(s))))("../ProvenanceUI.css");
    }
    addVisitedClass();
  });
  if ((options.dontCheckInitialized || !initialized.current) && !loading && !error) {
    var _options$callbacks;
    initialized.current = true;
    window.ProvenanceTreeD3 = window.ProvenanceTreeD3 || {};
    window.ProvenanceTreeD3[selectorId] = (0, _ProvenanceTree.default)(d3, "#".concat(selectorId), _objectSpread(_objectSpread({}, options), {}, {
      data
    }));
    if ((_options$callbacks = options.callbacks) !== null && _options$callbacks !== void 0 && _options$callbacks.onInitializationComplete) {
      options.callbacks.onInitializationComplete(selectorId);
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "c-provenance c-provenance--Tree js-provenance",
    id: selectorId,
    style: {
      minHeight: options.minHeight || 300
    }
  }, children);
}
ProvenanceUI.propTypes = {
  options: _propTypes.default.object,
  data: _propTypes.default.object,
  dataUrl: _propTypes.default.string,
  children: _propTypes.default.node
};
var _default = exports.default = ProvenanceUI;