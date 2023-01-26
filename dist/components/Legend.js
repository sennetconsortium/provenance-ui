"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jquery = _interopRequireDefault(require("jquery"));
var _Toggle = _interopRequireDefault(require("./Toggle"));
var _constants = require("../js/constants");
var _sweetalert = _interopRequireDefault(require("sweetalert2"));
var _useHelpHtml = _interopRequireDefault(require("../hooks/useHelpHtml"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Legend = _ref => {
  let {
    children,
    colorMap,
    filterNodes,
    actionMap,
    selectorId,
    className,
    help,
    otherLegend
  } = _ref;
  const [colors] = (0, _react.useState)(colorMap);
  const [filterable] = (0, _react.useState)(filterNodes);
  const {
    html
  } = (0, _useHelpHtml.default)(help);
  const loaded = (0, _react.useRef)(false);
  (0, _react.useEffect)(() => {
    if (filterable && !loaded.current) setEvents();
  });
  const showHelp = () => {
    _sweetalert.default.fire({
      customClass: {
        container: 'c-help',
        title: 'c-help__title',
        confirmButton: 'c-help__btn'
      },
      width: help.width || 700,
      title: "".concat(help.title || help.label),
      html: html,
      showCloseButton: true,
      confirmButtonText: 'Close'
    });
  };
  const setEvents = () => {
    loaded.current = true;
    const stickClass = 'has-activeFilters';
    const selectors = _constants.SELECTORS.legend;
    const classFns = {
      add: 'addClass',
      remove: 'removeClass'
    };
    const getItem = e => {
      return (0, _jquery.default)(e.currentTarget).parents(selectors.legendItem);
    };
    const toggleClass = function toggleClass(e) {
      let fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'addClass';
      let className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.CLASS_NAMES.hover;
      const $el = getItem(e);
      const node = $el.data('node');
      $el[fn](className).parent()[fn](className);
      (0, _jquery.default)("#".concat(selectorId, " .node--").concat(node))[fn](className);
      if ((0, _constants.isEdge)($el)) {
        (0, _jquery.default)("#".concat(selectorId)).find('.links, #arrowhead')[fn](className);
      }
      if (!((0, _jquery.default)("#".concat(selectorId, " .node")).hasClass(_constants.CLASS_NAMES.hover) && fn === classFns.remove)) {
        (0, _jquery.default)("#".concat(selectorId))[fn](className);
      }
    };
    const $trigger = (0, _jquery.default)(".c-legend--".concat(selectorId, "  ").concat(selectors.legendTrigger));
    $trigger.on('click', (e, data) => {
      e.stopPropagation();
      e.preventDefault();
      if (!getItem(e).hasClass(_constants.CLASS_NAMES.disabled) || data.force) {
        const fn = getItem(e).hasClass(stickClass) ? classFns.remove : classFns.add;
        toggleClass(e, fn);
        toggleClass(e, fn, stickClass);
        try {
          const node = getItem(e).data('node');
          if (fn === classFns.remove) {
            delete window.ProvenanceTreeD3[selectorId].legendFilters[node];
          } else {
            window.ProvenanceTreeD3[selectorId].legendFilters[node] = true;
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
    $trigger.on('mouseover', e => {
      if (!getItem(e).hasClass(_constants.CLASS_NAMES.disabled)) {
        if (!(0, _jquery.default)("#".concat(selectorId)).hasClass(stickClass)) toggleClass(e);
      }
    }).on('mouseleave', e => {
      if (!(0, _jquery.default)("#".concat(selectorId)).hasClass(stickClass)) toggleClass(e, 'removeClass');
    });
    (0, _jquery.default)(".c-legend--".concat(selectorId, " .js-legend--help")).on('click', e => {
      showHelp();
    });
  };
  const buildLegend = () => {
    let result = [];
    let helpLabel;
    if (help) {
      help.label = helpLabel = help.label || 'Help';
      colors[help.label] = 'transparent';
    }
    const isHelp = key => key === helpLabel;
    const isOther = key => otherLegend[key] !== undefined;
    const isHelpOrOther = key => isHelp(key) || isOther(key);
    const getColor = key => typeof colors[key] === 'string' ? colors[key] : colors[key].color || 'transparent';
    const getJsClassName = key => isHelp(key) ? 'js-legend--help' : isOther(key) ? "js-legend--".concat(key) : 'js-legend--trigger';
    let action;
    _jquery.default.extend(colors, otherLegend);
    for (let type in colors) {
      action = actionMap[type];
      result.push( /*#__PURE__*/_react.default.createElement("li", {
        className: "c-legend__item c-legend__item--".concat(type, "  ").concat(isHelpOrOther(type) ? '' : 'js-legend__item', " ").concat(action && action.disabled ? _constants.CLASS_NAMES.disabled : ''),
        key: "legend--".concat(type),
        "data-node": type,
        onClick: isOther(type) && otherLegend[type].callback ? otherLegend[type].callback : null
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "c-legend__color ".concat(getJsClassName(type), " c-legend__color--").concat(type)
      }, /*#__PURE__*/_react.default.createElement("span", {
        style: {
          backgroundColor: getColor(type)
        }
      }, isHelp(type) && /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-question-circle-o",
        role: "presentation"
      }), isOther(type) && /*#__PURE__*/_react.default.createElement("i", {
        className: "fa ".concat(otherLegend[type].icon),
        role: "presentation"
      }))), /*#__PURE__*/_react.default.createElement("span", {
        className: "c-legend__label"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "c-legend__label__text ".concat(getJsClassName(type))
      }, type), action && /*#__PURE__*/_react.default.createElement(_Toggle.default, {
        context: action.callback,
        selectorId: action.selectorId || selectorId,
        className: "c-legend__action ".concat(action.className),
        disabled: action.visible !== undefined ? !action.visible : action.disabled,
        ariaLabel: action.ariaLabel
      }))));
    }
    return result;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "c-legend c-legend--".concat(selectorId, " ").concat(filterable ? 'c-legend--filterable' : '', " ").concat(className)
  }, /*#__PURE__*/_react.default.createElement("ul", null, buildLegend(), children));
};
Legend.defaultProps = {
  filterNodes: true,
  help: {},
  otherLegend: {},
  actionMap: {},
  selectorId: _constants.SELECTOR_ID,
  className: ''
};
Legend.propTypes = {
  colorMap: _propTypes.default.object.isRequired,
  help: _propTypes.default.object,
  otherLegend: _propTypes.default.object,
  actionMap: _propTypes.default.object,
  children: _propTypes.default.object,
  filterNodes: _propTypes.default.bool,
  selectorId: _propTypes.default.string,
  className: _propTypes.default.string
};
var _default = Legend;
exports.default = _default;