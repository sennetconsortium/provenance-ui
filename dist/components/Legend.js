"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Legend = _ref => {
  let {
    colorMap,
    filterNodes
  } = _ref;
  const [colors, setColors] = (0, _react.useState)(colorMap);
  const [filterable, setFilterable] = (0, _react.useState)(filterNodes);
  const loaded = (0, _react.useRef)(false);
  const $previous = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    if (filterable && !loaded.current) setEvents();
  }, []);
  const setEvents = () => {
    loaded.current = true;
    const stickClass = 'stickFilters';
    const selectors = {
      legendItem: '.js-legend__item',
      provenance: '.js-provenance'
    };
    const classFns = {
      add: 'addClass',
      remove: 'removeClass'
    };
    const toggleClass = function toggleClass(e) {
      let fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'addClass';
      let className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'has-hover';
      const $el = e ? (0, _jquery.default)(e.currentTarget) : $previous.current;
      if (className === stickClass) {
        $previous.current = e ? $el : null;
      }
      const node = $el.data('node');
      $el[fn](className).parent()[fn](className);
      (0, _jquery.default)(".node--".concat(node))[fn](className);
      (0, _jquery.default)(selectors.provenance)[fn](className);
    };

    // $(selectors.legendItem).on('click', (e) => {
    //     e.stopPropagation()
    //     e.preventDefault()
    //
    //     const fn = $(e.currentTarget).hasClass(stickClass) ? classFns.remove : classFns.add
    //     let r = (fn === classFns.add) ? toggleClass(e) : toggleClass(e, classFns.remove)
    //     //if ($previous.current && $(e.currentTarget) !== $previous.current) toggleClass(null, classFns.remove, stickClass)
    //     toggleClass(e, fn, stickClass)
    // })

    (0, _jquery.default)(selectors.legendItem).on('mouseover', e => {
      if (!(0, _jquery.default)(selectors.provenance).hasClass(stickClass)) toggleClass(e);
    }).on('mouseleave', e => {
      if (!(0, _jquery.default)(selectors.provenance).hasClass(stickClass)) toggleClass(e, 'removeClass');
    });
  };
  const buildLegend = () => {
    let result = [];
    for (let type in colors) {
      result.push( /*#__PURE__*/React.createElement("li", {
        className: "c-legend__item js-legend__item",
        key: "legend--".concat(type),
        "data-node": type
      }, /*#__PURE__*/React.createElement("span", {
        className: "c-legend__color c-legend__color--".concat(type),
        style: {
          backgroundColor: colors[type]
        }
      }), /*#__PURE__*/React.createElement("span", {
        className: "c-legend__label"
      }, /*#__PURE__*/React.createElement("span", null, type))));
    }
    return result;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "c-legend ".concat(filterable ? 'c-legend--filterable' : '')
  }, buildLegend());
};
Legend.defaultProps = {
  filterNodes: true
};
Legend.propTypes = {
  colorMap: _propTypes.default.object.isRequired,
  filterNodes: _propTypes.default.bool
};
var _default = Legend;
exports.default = _default;