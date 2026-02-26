/** 2/26/2026, 3:04:05 PM | Provenance 3.0.0 | git+https://github.com/sennetconsortium/provenance-ui.git **/
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var GraphGeneric_exports = {};
__export(GraphGeneric_exports, {
  default: () => GraphGeneric_default
});
module.exports = __toCommonJS(GraphGeneric_exports);
class GraphGeneric {
  constructor(ops = {}) {
    this.ops = ops;
    this.token = ops.token;
    this.url = ops.url;
    this.keys = ops.keys || {};
    this.keys.id = this.keys.id || "uuid";
    this.keys.neighbors = this.keys.neighbors || "ancestors";
    this.visited = {};
    this.stack = [];
    this.list = ops.list || {};
    this.result = [];
    this.root = null;
  }
  /**
   * Makes a ajax call
   * @param ops {object}
   * @returns {Promise<Graph>}
   */
  service() {
    return __async(this, arguments, function* (ops = {}) {
      try {
        let headers = ops.headers || new Headers();
        headers.append("Content-Type", "application/json");
        if (this.token) {
          headers.append("Authorization", "Bearer " + this.token);
        }
        let response = yield fetch(ops.url || this.url, {
          method: ops.method || "GET",
          headers,
          body: ops.body || null
        });
        const result = yield response.json();
        if (ops.callback && typeof ops.callback === "function") {
          ops.callback(result, ops);
        } else {
          this.stack.push(ops.id);
          this.list[ops.id] = this.ops.onAfterServiceResolveResult ? this.ops.onAfterServiceResolveResult(result) : this.getItem(result);
          this.serviced[ops.id] = true;
          this.continueDfs();
        }
      } catch (e) {
        console.error(e);
      }
      return this;
    });
  }
  dfsInit(node) {
    this.root = node;
    const id = node[this.keys.id];
    this.visited[id] = true;
    this.stack.push(id);
    this.list[id] = node;
  }
  /**
   * DFS initialization
   * @param node {object}
   */
  dfs(node) {
    this.dfsInit(node);
  }
  continueDfs(ops = {}) {
  }
  /**
   * Returns an item from object or object array
   * @param obj
   * @returns {*}
   */
  getItem(obj) {
    if (typeof obj === "object") {
      return obj.length ? obj[0] : obj;
    } else {
      return obj;
    }
  }
  appendList(id, obj) {
    if (this.list[id] === void 0) {
      this.list[id] = this.getItem(obj);
    }
  }
  /**
   * Returns result
   * @returns {[]}
   */
  getResult() {
    return this.result;
  }
}
var GraphGeneric_default = GraphGeneric;
