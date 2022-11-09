"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * Uses DFS algorithm to find all nodes and neighbors.
 */
class Graph {
  /**
   * Traverses a graph dataset.
   * @param ops Object
   * @param ops.token String Auth token
   * @param ops.idKey String The name of the id property in the data
   * @param ops.neighborsKey String The name of the neighbors property in the data
   * @param ops.edgeLabels Object<String> {actor, entity}
   * @param ops.actorLabels Array<String>
   */
  constructor() {
    let ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.token = ops.token;
    this.idKey = ops.idKey || 'uuid';
    this.neighborsKey = ops.neighborsKey || 'ancestors';
    this.edgeLabels = ops.edgeLabels || {
      actor: 'USED',
      entity: 'WAS_GENERATED_BY'
    };
    this.actorLabels = ops.actorLabels || ['Activity'];
    this.traverseAll = false;
    this.result = [];
    this.actIndex = -1;
    this.visited = {};
    this.list = {};
    this.stack = [];
  }
  async service() {
    let ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const _t = this;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.token);
    return await fetch(ops.url || this.url, {
      method: ops.method || 'GET',
      headers: headers,
      body: ops.raw
    }).then(response => response.json()).then(result => {
      _t.list[result[_t.idKey]] = result;
      _t.stack.push(result[_t.idKey]);
      _t.continueDfs(result, ops);
      return result;
    }).catch(error => {
      return error;
    });
  }
  dfs(node) {
    this.visited[node[this.idKey]] = true;
    this.stack.push(node[this.idKey]);
    this.list[node[this.idKey]] = node;
    this.continueDfs({
      startNode: node[this.idKey],
      isRoot: true
    });
  }
  continueDfs(ops) {
    const _t = this;
    while (this.stack.length) {
      let current = this.stack.pop();
      //console.log(current)
      let node = this.list[current];
      //console.log(node)
      if (node && !node[this.neighborsKey] && this.traverseAll) {
        this.service({
          parent: current,
          activityIndex: this.actIndex
        });
      } else {
        ++_t.actIndex;
        this.result.push(_objectSpread(_objectSpread({}, node), {}, {
          startNode: current,
          endNode: this.getNodeId(this.actIndex),
          type: this.edgeLabels.entity,
          id: current
        }));
        if (node[this.neighborsKey] && node[this.neighborsKey].length) {
          node[this.neighborsKey].forEach(function (neighbor, index) {
            let n = neighbor[_t.idKey];
            if (!_t.visited[n]) {
              _t.addActor(node, n);
              _t.list[n] = neighbor;
              _t.visited[n] = true;
              _t.stack.push(n);
            }
          });
        } else {
          this.addActor(node);
        }
      }
    }
  }

  /**
   *
   * @param node Object
   * @param nodeId String
   */
  addActor(node, nodeId) {
    this.result.push(_objectSpread(_objectSpread({}, node), {}, {
      startNode: this.getNodeId(this.actIndex),
      endNode: nodeId,
      type: this.edgeLabels.actor,
      labels: this.actorLabels,
      id: this.getNodeId(this.actIndex),
      isActivity: true
    }));
  }
  getNodeId(id) {
    return 'Acv-' + id;
  }
  getResult() {
    return this.result;
  }
}
var _default = Graph;
exports.default = _default;