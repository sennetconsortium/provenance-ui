"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _Graph = _interopRequireDefault(require("./Graph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DataGraph extends _Graph.default {
  constructor() {
    let ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(ops);
    this.serviced = {};
    this.storeResult = ops.storeResult || false;
  }
  async dfsWithPromise(node) {
    this.root = node;
    const id = node[this.keys.id];
    this.visited[id] = true;
    this.stack.push(id);
    if (this.list[id] === undefined) {
      this.list[id] = node;
    }
    this.promisesToAwait = [];
    this.continueDfs();
    return this;
  }
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
      if (!neighbors.length && !this.serviced[current]) {
        this.promisesToAwait.push(this.service({
          url: this.url + current,
          id: current
        }));
      } else {
        if (neighbors.length) {
          if (this.storeResult) this.result.push(node);
          neighbors.forEach(function (neighbor, index) {
            let id = neighbor[this.keys.id];
            if (!this.visited[id]) {
              if (this.list[id] === undefined) {
                this.list[id] = neighbor;
              }
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
var _default = DataGraph;
exports.default = _default;