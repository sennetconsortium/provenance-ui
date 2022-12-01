"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _loglevel = _interopRequireDefault(require("loglevel"));
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Toggle(_ref) {
  let {
    context,
    data,
    selectorId = 'provenanceTree',
    ariaLabel = 'Toggle',
    text = '',
    className = ''
  } = _ref;
  const toggleData = e => {
    const $el = (0, _jquery.default)(e.currentTarget);
    const className = 'hide-activities';
    $el.toggleClass(className);
    if (context !== null) {
      context($el.hasClass(className), selectorId);
    }
  };
  return /*#__PURE__*/_react.default.createElement("label", {
    className: "c-toggle ".concat(className)
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "c-toggle__text"
  }, text), /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    onClick: toggleData
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "c-toggle__slider c-toggle__slider--round",
    "aria-label": ariaLabel
  }));
}
var _default = Toggle;
exports.default = _default;