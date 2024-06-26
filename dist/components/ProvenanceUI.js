"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jquery = _interopRequireDefault(require("jquery"));
var _ProvenanceTree = _interopRequireDefault(require("../js/ProvenanceTree"));
var _useD = _interopRequireDefault(require("../hooks/useD3"));
var _constants = require("../js/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
      Promise.resolve("../ProvenanceUI.css").then(s => _interopRequireWildcard(require(s)));
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
var _default = ProvenanceUI;
exports.default = _default;