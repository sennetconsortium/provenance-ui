"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
var _neo4jd = _interopRequireDefault(require("../js/neo4jd3"));
var _useD = _interopRequireDefault(require("../hooks/useD3"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 *
 * @param data Object Required if no dataUrl is provided
 * @param dataUrl String Required if no data is provided
 * @param ops Object<Object>
 *     @param ops.highlight Array<Object>
 *          @param ops.higlight.class String
 *          @param ops.highlight.property String
 *          @param ops.highlight.value String
 *     @param ops.noStyles Boolean Whether to set styles
 *     @param ops.colorMaps Object The color maps for each node class/type and hex code
 *     @param ops.setNodeLabels Boolean Whether to set labels on the nodes
 *     @param ops.idNavigate Object Url settings for the entity id property
 *          @param ops.idNavigate.url The url 
 *          @param ops.idNavigate.prop The name of the id property in the dataset
 *     @param ops.onNodeDoubleClick Function Pass a custom function to run on double click of a node
 *     @param ops.onRelationshipDoubleClick Function Pass a custom function to run on double click of an edge/relationship
 *     @param ops.nodeRadius Integer
 * @returns {JSX.Element}
 * @constructor
 */
function ProvenanceUI(_ref) {
  let {
    children,
    data,
    options = {},
    dataUrl = null
  } = _ref;
  (0, _useD.default)();
  const [graphData, setGraphData] = (0, _react.useState)(data);
  const [graphDataUrl, setDataUrl] = (0, _react.useState)(dataUrl);
  const selectorId = options.selectorId || 'neo4jd3';
  const addVisitedClass = () => {
    (0, _jquery.default)("#".concat(selectorId)).on('click', '.node', function (e) {
      (0, _jquery.default)(e.currentTarget).addClass('is-visited');
    });
  };
  (0, _react.useEffect)(() => {
    if (!options.noStyles) {
      Promise.resolve("../ProvenanceUI.css").then(s => _interopRequireWildcard(require(s)));
    }
    let neo4jd3 = new _neo4jd.default("#".concat(selectorId), {
      highlight: options.highlight || [{
        class: 'Dataset',
        property: 'sennet_id',
        value: 'SNT264.VWKZ.629'
      }, {
        class: 'Source',
        property: 'sennet_id',
        value: 'SNT385.FJPB.242'
      }],
      setNodeLabels: options.setNodeLabels !== undefined ? options.setNodeLabels : true,
      colorMaps: options.colorMaps || {
        "Dataset": "#8ecb93",
        "Activity": "#f16766",
        "Sample": "#ebb5c8",
        "Source": "#ffc255"
      },
      idNavigate: options.idNavigate || {
        prop: ''
      },
      minCollision: options.minCollison || 60,
      neo4jData: graphData,
      neo4jDataUrl: graphDataUrl,
      nodeRadius: options.nodeRadius || 25,
      onNodeDoubleClick: options.onNodeDoubleClick || function (node) {
        switch (node.action) {
          case 'url':
            window.open(node.properties.url, '_blank');
            break;
          default:
            break;
        }
      },
      onRelationshipDoubleClick: options.onRelationshipDoubleClick || function (relationship) {
        // console.log('double click on relationship: ' + JSON.stringify(relationship));
      },
      zoomFit: options.zoomFit || false
    });
    window.ProvenanceUId3 = neo4jd3;
    addVisitedClass();
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "c-provenance js-provenance"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: selectorId
  }), children);
}
ProvenanceUI.propTypes = {
  options: _propTypes.default.object,
  data: _propTypes.default.object,
  dataUrl: _propTypes.default.string,
  children: _propTypes.default.node
};
var _default = ProvenanceUI;
exports.default = _default;