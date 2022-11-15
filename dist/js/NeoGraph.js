"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _Graph = _interopRequireDefault(require("./Graph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class NeoGraph extends _Graph.default {
  /**
   * Traverses a graph dataset.
   * @param ops Object
   * @param ops.token String Auth token
   * @param ops.keys.id  String The name of the id property in the data
   * @param ops.keys.neighbors String The name of the neighbors property in the data
   * @param ops.labels.edge Object<String> {actor, entity}
   * @param ops.labels.actor Array<String>
   */
  constructor() {
    let ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(ops);
    this.labels = ops.labels || {};
    this.labels.edge = this.labels.edge || {
      actor: 'USED',
      entity: 'WAS_GENERATED_BY'
    };
    this.labels.actor = this.labels.actor || ['Activity'];
    this.actIndex = -1;
  }

  /**
   * Traverses graph given a root note.
   * @param node {object}
   */
  dfs(node) {
    super.dfs(node);
    while (this.stack.length) {
      let current = this.stack.pop();
      let node = this.list[current];
      ++this.actIndex;
      this.result.push(_objectSpread(_objectSpread({}, node), {}, {
        startNode: current,
        endNode: this.getNodeId(this.actIndex),
        type: this.labels.edge.entity,
        id: current
      }));
      let neighbors = null;
      if (this.ops.getNeighbors && typeof this.ops.getNeighbors === 'function') {
        neighbors = this.ops.getNeighbors(node);
      } else {
        neighbors = node[this.keys.neighbors];
      }
      if (neighbors && neighbors.length) {
        neighbors.forEach(function (neighbor, index) {
          let n = neighbor[this.keys.id];
          this.addActor(node, n, current);
          this.checkVisited(n, neighbor);
        }.bind(this));
      } else {
        this.addActor(node, null, current);
      }
    }
  }

  /**
   * Adds an actor node.
   * @param node {object}
   * @param nodeId {string}
   */
  addActor(node, nodeId, parentId) {
    this.result.push(_objectSpread(_objectSpread({}, node), {}, {
      startNode: this.getNodeId(this.actIndex),
      endNode: nodeId,
      type: this.labels.edge.actor,
      labels: this.labels.actor,
      id: this.getNodeId(this.actIndex),
      isActivity: true,
      parentId: parentId
    }));
  }

  /**
   * Returns a node id.
   * @param id
   * @returns {string}
   */
  getNodeId(id) {
    return 'Act-' + id;
  }
}
var _default = NeoGraph;
exports.default = _default;