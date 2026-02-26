/** 2/26/2026, 3:04:05 PM | Provenance 3.0.0 | git+https://github.com/sennetconsortium/provenance-ui.git **/
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var DataConverterGeneric_exports = {};
__export(DataConverterGeneric_exports, {
  default: () => DataConverterGeneric_default
});
module.exports = __toCommonJS(DataConverterGeneric_exports);
var import_DataConverter = __toESM(require("../DataConverter"));
class DataConverterGeneric extends import_DataConverter.default {
  constructor(data, map, ops = {}) {
    super(data, map, ops);
    if (this.error) return this;
    this.list = ops.list || {};
  }
  stratify() {
    if (this.error) return this;
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
      n.type = n[this.keys.type] || "Entity";
      n.subType = n[this.keys.subType] || n.type;
      if (this.map.root.text) {
        n.text = n[this.map.root.text];
      }
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
var DataConverterGeneric_default = DataConverterGeneric;
