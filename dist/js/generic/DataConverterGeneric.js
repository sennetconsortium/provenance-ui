"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _DataConverter = _interopRequireDefault(require("../DataConverter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DataConverterGeneric extends _DataConverter.default {
  constructor(data, map) {
    let ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    super(data, map, ops);
    this.list = ops.list || {};
  }
  stratify() {
    let stack = [this.data];
    let visited = {};
    visited[this.data[this.map.root.id]] = true;
    this.result = [];
    while (stack.length) {
      let n = stack.pop();
      const id = n[this.map.root.id];
      n = this.list[id] || n;
      n.id = id;
      n.entityAsParent = visited[n.id] ? visited[n.id].id : null;
      n.type = n[this.map.root.type] || 'Entity';
      n.subType = n[this.map.root.subType] || n.type;
      this.setProperties(n, n.subType);
      n._children = this.ops.getNeighbors(n);
      n.children = [];
      if (n._children && n._children.length) {
        for (let c of n._children) {
          const cId = c[this.map.root.id];
          n.children.push(this.list[cId] || c);
          if (!visited[cId]) {
            visited[cId] = n;
            stack.push(c);
          }
        }
      }
    }
  }
}
var _default = DataConverterGeneric;
exports.default = _default;