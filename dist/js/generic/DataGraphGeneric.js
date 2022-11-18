"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _GraphGeneric = _interopRequireDefault(require("./GraphGeneric"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Uses DFS algorithm to gather all data and relationships via ajax calls.
 * @author dbmi.pitt.edu
 *
 **/
class DataGraphGeneric extends _GraphGeneric.default {
  constructor() {
    let ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(ops);
    this.serviced = {};
    this.storeResult = ops.storeResult || false;
  }

  /**
   * Initializes a dfs setup with promise
   * @param node
   * @returns {Promise<DataGraph>}
   */
  async dfsWithPromise(node) {
    this.dfsInit(node);
    this.promisesToAwait = [];
    this.continueDfs();
    return this;
  }

  /**
   * Continues the dfs algorithm with promise
   * @param ops
   * @returns {Promise<DataGraph>}
   */
  async continueDfs() {
    let ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    while (this.stack.length) {
      let current = this.stack.pop();
      let node = this.list[current];

      // Handle
      let neighbors = null;
      if (this.ops.getNeighbors && typeof this.ops.getNeighbors === 'function') {
        neighbors = this.ops.getNeighbors(node);
      } else {
        neighbors = node[this.keys.neighbors];
      }
      if (!neighbors.length && !this.serviced[current] && current !== undefined) {
        this.promisesToAwait.push(this.service({
          url: this.url.replace('{id}', current),
          id: current
        }));
      } else {
        if (neighbors.length) {
          if (this.storeResult) this.result.push(node);
          neighbors.forEach(function (neighbor, index) {
            const neighborNode = this.getItem(neighbor);
            let id = neighborNode[this.keys.id];
            if (!this.visited[id]) {
              this.appendList(id, neighborNode);
              this.visited[id] = true;
              this.stack.push(id);
            }
          }.bind(this));
        } else {
          node[this.keys.neighbors] = [];
          if (this.storeResult) this.result.push(node);
        }
      }
    }
    await Promise.all(this.promisesToAwait);
    this.ops.onDataAcquired(this);
    return this;
  }
}
var _default = DataGraphGeneric;
exports.default = _default;