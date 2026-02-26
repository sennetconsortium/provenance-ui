/** 2/26/2026, 3:04:05 PM | Provenance 3.0.0 | git+https://github.com/sennetconsortium/provenance-ui.git **/
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var ProvenanceUI_exports = {};
__export(ProvenanceUI_exports, {
  default: () => ProvenanceUI_default
});
module.exports = __toCommonJS(ProvenanceUI_exports);
var import_react = __toESM(require("react"));
var import_prop_types = __toESM(require("prop-types"));
var import_jquery = __toESM(require("jquery"));
var import_ProvenanceTree = __toESM(require("../js/ProvenanceTree"));
var import_useD3 = __toESM(require("../hooks/useD3"));
var import_constants = require("../js/constants");
function ProvenanceUI({ children, data, options = { includeStyles: false } }) {
  var _a;
  const { d3, error, loading } = (0, import_useD3.default)();
  const selectorId = options.selectorId || import_constants.SELECTOR_ID;
  const initialized = (0, import_react.useRef)(false);
  const addVisitedClass = () => {
    (0, import_jquery.default)("#".concat(selectorId)).on("click", ".node", function(e) {
      (0, import_jquery.default)(e.currentTarget).addClass("is-visited");
    });
  };
  (0, import_react.useEffect)(() => {
    if (options.includeStyles !== void 0) {
      if ((options == null ? void 0 : options.includeStyles) === true) {
        Promise.resolve().then(() => __toESM(require("../ProvenanceUI.css")));
      }
    }
    addVisitedClass();
  });
  if ((options.dontCheckInitialized || !initialized.current) && !loading && !error) {
    initialized.current = true;
    window.ProvenanceTreeD3 = window.ProvenanceTreeD3 || {};
    window.ProvenanceTreeD3[selectorId] = (0, import_ProvenanceTree.default)(d3, "#".concat(selectorId), __spreadProps(__spreadValues({}, options), { data }));
    if ((_a = options.callbacks) == null ? void 0 : _a.onInitializationComplete) {
      options.callbacks.onInitializationComplete(selectorId);
    }
  }
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "c-provenance c-provenance--Tree js-provenance", id: selectorId, style: { minHeight: options.minHeight || 300 } }, children);
}
ProvenanceUI.propTypes = {
  options: import_prop_types.default.object,
  data: import_prop_types.default.object,
  dataUrl: import_prop_types.default.string,
  children: import_prop_types.default.node
};
var ProvenanceUI_default = ProvenanceUI;
