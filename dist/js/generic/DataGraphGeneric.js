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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var DataGraphGeneric_exports = {};
__export(DataGraphGeneric_exports, {
  default: () => DataGraphGeneric_default
});
module.exports = __toCommonJS(DataGraphGeneric_exports);
var import_GraphGeneric = __toESM(require("./GraphGeneric"));
class DataGraphGeneric extends import_GraphGeneric.default {
  constructor(ops = {}) {
    super(ops);
    this.serviced = {};
    this.storeResult = ops.storeResult || false;
  }
  /**
   * Initializes a dfs setup with promise
   * @param node
   * @returns {Promise<DataGraph>}
   */
  dfsWithPromise(node) {
    return __async(this, null, function* () {
      this.dfsInit(node);
      this.promisesToAwait = [];
      this.continueDfs();
      return this;
    });
  }
  /**
   * Continues the dfs algorithm with promise
   * @param ops
   * @returns {Promise<DataGraph>}
   */
  continueDfs() {
    return __async(this, arguments, function* (ops = {}) {
      while (this.stack.length) {
        let current = this.stack.pop();
        let node = this.list[current];
        let neighbors = null;
        if (this.ops.getNeighbors && typeof this.ops.getNeighbors === "function") {
          neighbors = this.ops.getNeighbors(node);
        } else {
          neighbors = node[this.keys.neighbors];
        }
        if (!neighbors.length && !this.serviced[current] && current !== void 0) {
          const serviceOps = this.ops.getServiceOptions(current, this.url);
          this.promisesToAwait.push(this.service(serviceOps));
        } else {
          if (neighbors.length) {
            if (this.storeResult) this.result.push(node);
            neighbors.forEach((function(neighbor, index) {
              const neighborNode = this.getItem(neighbor);
              let id = neighborNode[this.keys.id];
              if (!this.visited[id]) {
                this.appendList(id, neighborNode);
                this.visited[id] = true;
                this.stack.push(id);
              }
            }).bind(this));
          } else {
            node[this.keys.neighbors] = [];
            if (this.storeResult) this.result.push(node);
          }
        }
      }
      yield Promise.all(this.promisesToAwait);
      this.ops.onDataAcquired(this);
      return this;
    });
  }
}
var DataGraphGeneric_default = DataGraphGeneric;
