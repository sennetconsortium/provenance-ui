"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _visitedNode = _interopRequireDefault(require("../assets/visited-node.jpg"));
var _currentNode = _interopRequireDefault(require("../assets/current-node.jpg"));
var _theGraph = _interopRequireDefault(require("../assets/the-graph.jpg"));
var _infoPanel = _interopRequireDefault(require("../assets/info-panel.jpg"));
var _legend = _interopRequireDefault(require("../assets/legend.jpg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const helpHtml = "\n<div class='c-help__body' style=\"text-align: left;\">\n    <p>The provenance graph allows users to view ancestry and descendants of a particular entity.</p>\n    <h4>The Graph</h4>\n    <img src=\"".concat(_theGraph.default, "\" alt=\"provenance graph\" width=\"100%\" />\n    <p>The graph is fully interactive. Features include:</p>\n    <ul>\n        <li>\n            Users may drag (<i class='fa fa-arrows' role='presentation'></i>) nodes around.\n        </li>\n        <li>\n            Clicking any node reveals its <a href=\"#info-panel\">info panel</a>.\n        </li>\n        <li>\n            The graph is zoomable. Use the mouse scroll wheel to control the zoom/scale of the graph.\n        </li>\n    </ul>\n    <h5 class=\"mgn-v\">Interactions &amp; Colors</h5>\n    <table>\n        <tr>\n            <th>Graphic</th>\n            <th>Description</th>\n        </tr>\n        <tr>\n            <td><img src=\"").concat(_currentNode.default, "\" alt=\"current node\" /></td>\n            <td>Entity of the current page is denoted by a lime colored halo.</td>\n        </tr>\n        <tr>\n            <td><img src=\"").concat(_visitedNode.default, "\" alt=\"visited node\" /></td>\n            <td>Visited nodes are denoted by a faint blue halo.</td>\n        </tr>\n    </table>\n    <h4 id=\"info-panel\">The Info Panel</h4>\n    <img src=\"").concat(_infoPanel.default, "\" alt=\"node info panel\" width=\"100%\" />\n    <ul>\n    <li>The info panel gives additional details about a particular node.</li>\n    <li>Some detail cells link to their respective domain page, denoted by an external link icon (<i class='fa fa-external-link' role='presentation'></i>). </li>\n    </ul>\n    <h4>The Legend</h4>\n    <img src=\"").concat(_legend.default, "\" alt=\"provenance legengd\" width=\"100%\" />\n    <ul>\n      <li>Legend items are filterable, clicking on a legend item toggles the entity's color map highlight.</li>\n      <li>The eye icon (<i class='fa fa-eye' role='presentation'></i>) after legend labels toggles the visibility of the respective item on the graph.</li>\n    </ul>\n</div>");
var _default = helpHtml;
exports.default = _default;