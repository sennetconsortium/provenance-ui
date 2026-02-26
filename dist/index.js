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
var index_exports = {};
__export(index_exports, {
  DataConverter: () => import_DataConverter.default,
  DataConverterGeneric: () => import_DataConverterGeneric.default,
  DataConverterNeo4J: () => import_DataConverterNeo4J.default,
  DataGraphGeneric: () => import_DataGraphGeneric.default,
  GraphGeneric: () => import_GraphGeneric.default,
  Legend: () => import_Legend.default,
  PUI: () => PUI,
  ProvenanceTree: () => import_ProvenanceTree.default,
  ProvenanceUI: () => import_ProvenanceUI.default,
  Toggle: () => import_Toggle.default,
  useD3: () => import_useD3.default,
  useHelpHtml: () => import_useHelpHtml.default
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"));
var import_ProvenanceUI = __toESM(require("./components/ProvenanceUI"));
var import_Legend = __toESM(require("./components/Legend"));
var import_Toggle = __toESM(require("./components/Toggle"));
var import_GraphGeneric = __toESM(require("./js/generic/GraphGeneric"));
var import_DataGraphGeneric = __toESM(require("./js/generic/DataGraphGeneric"));
var import_DataConverter = __toESM(require("./js/DataConverter"));
var import_DataConverterNeo4J = __toESM(require("./js/neo4j/DataConverterNeo4J"));
var import_DataConverterGeneric = __toESM(require("./js/generic/DataConverterGeneric"));
var import_ProvenanceTree = __toESM(require("./js/ProvenanceTree"));
var PUI = __toESM(require("./js/constants"));
var import_useD3 = __toESM(require("./hooks/useD3"));
var import_useHelpHtml = __toESM(require("./hooks/useHelpHtml"));
