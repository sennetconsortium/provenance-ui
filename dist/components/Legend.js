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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Legend = _ref => {
  let {
    children,
    colorMap,
    filterNodes,
    actionMap
  } = _ref;
  const [colors] = (0, _react.useState)(colorMap);
  const [filterable] = (0, _react.useState)(filterNodes);
  const loaded = (0, _react.useRef)(false);
  (0, _react.useEffect)(() => {
    if (filterable && !loaded.current) setEvents();
  });
  const setEvents = () => {
    loaded.current = true;
    const stickClass = 'stickFilters';
    const selectors = {
      legendItem: '.js-legend__item',
      legendTrigger: '.js-legend--trigger',
      provenance: '.js-provenance'
    };
    const classFns = {
      add: 'addClass',
      remove: 'removeClass'
    };
    const getItem = e => {
      return (0, _jquery.default)(e.currentTarget).parents(selectors.legendItem);
    };
    const toggleClass = function toggleClass(e) {
      let fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'addClass';
      let className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'has-hover';
      const $el = getItem(e);
      const node = $el.data('node');
      $el[fn](className).parent()[fn](className);
      (0, _jquery.default)(".node--".concat(node))[fn](className);
      if (!((0, _jquery.default)(".node").hasClass('has-hover') && fn === classFns.remove)) {
        (0, _jquery.default)(selectors.provenance)[fn](className);
      }
    };
    (0, _jquery.default)(selectors.legendTrigger).on('click', e => {
      e.stopPropagation();
      e.preventDefault();
      const fn = getItem(e).hasClass(stickClass) ? classFns.remove : classFns.add;
      toggleClass(e, fn);
      toggleClass(e, fn, stickClass);
    });
    (0, _jquery.default)(selectors.legendTrigger).on('mouseover', e => {
      if (!(0, _jquery.default)(selectors.provenance).hasClass(stickClass)) toggleClass(e);
    }).on('mouseleave', e => {
      if (!(0, _jquery.default)(selectors.provenance).hasClass(stickClass)) toggleClass(e, 'removeClass');
    });
  };
  const buildLegend = () => {
    let result = [];
    for (let type in colors) {
      result.push( /*#__PURE__*/_react.default.createElement("li", {
        className: "c-legend__item c-legend__item--".concat(type, " js-legend__item"),
        key: "legend--".concat(type),
        "data-node": type
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "c-legend__color js-legend--trigger c-legend__color--".concat(type),
        style: {
          backgroundColor: colors[type]
        }
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "c-legend__label"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "c-legend__label__text js-legend--trigger"
      }, type), actionMap[type] && /*#__PURE__*/_react.default.createElement(_Toggle.default, {
        context: actionMap[type].callback,
        selectorId: actionMap[type].selectorId,
        className: "c-legend__action ".concat(actionMap[type].className),
        ariaLabel: actionMap[type].ariaLabel
      }))));
    }
    return result;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "c-legend ".concat(filterable ? 'c-legend--filterable' : '')
  }, /*#__PURE__*/_react.default.createElement("ul", null, buildLegend(), children));
};
Legend.defaultProps = {
  filterNodes: true,
  actionMap: {}
};
Legend.propTypes = {
  colorMap: _propTypes.default.object.isRequired,
  actionMap: _propTypes.default.object,
  children: _propTypes.default.object,
  filterNodes: _propTypes.default.bool
};
var _default = Legend;
exports.default = _default;