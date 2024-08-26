"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _jquery = _interopRequireDefault(require("jquery"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("../js/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Toggle(_ref) {
  let {
    context,
    icon = true,
    selectorId = _constants.SELECTOR_ID,
    ariaLabel = 'Toggle',
    text = '',
    className = '',
    disabled = false
  } = _ref;
  const toggleData = e => {
    const $el = (0, _jquery.default)(e.currentTarget);
    const toggled = _constants.CLASS_NAMES.toggled;
    $el.toggleClass(toggled);
    const $p = $el.parents(_constants.SELECTORS.legend.legendItem);
    if (!(0, _constants.isEdge)($p)) {
      $p.toggleClass(_constants.CLASS_NAMES.disabled);
    }
    const $trigger = $p.find(_constants.SELECTORS.legend.legendTrigger);
    if (!(0, _constants.isEdge)($p) && $p.hasClass(_constants.CLASS_NAMES.hover)) {
      $trigger.eq(0).trigger('click', {
        force: true
      });
    }
    if (context !== null) {
      context(e, $el.hasClass(toggled), selectorId);
    }
  };
  return /*#__PURE__*/_react.default.createElement("label", {
    className: "c-toggle ".concat(className, " ").concat(disabled ? _constants.CLASS_NAMES.toggled : '')
  }, !icon && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "c-toggle__text"
  }, text), /*#__PURE__*/_react.default.createElement("span", {
    className: "c-toggle__main"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    onClick: toggleData
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "c-toggle__slider c-toggle__slider--round",
    "aria-label": ariaLabel
  }))), icon && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "c-toggle__icon fa fa-eye ".concat(disabled ? _constants.CLASS_NAMES.toggled : ''),
    "aria-label": ariaLabel,
    onClick: toggleData,
    title: ariaLabel
  })));
}
Toggle.propTypes = {
  context: _propTypes.default.func,
  icon: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  selectorId: _propTypes.default.string,
  ariaLabel: _propTypes.default.string,
  text: _propTypes.default.string,
  className: _propTypes.default.string
};
var _default = Toggle;
exports.default = _default;