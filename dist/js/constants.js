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
var constants_exports = {};
__export(constants_exports, {
  CLASS_NAMES: () => CLASS_NAMES,
  SELECTORS: () => SELECTORS,
  SELECTOR_ID: () => SELECTOR_ID,
  isEdge: () => isEdge
});
module.exports = __toCommonJS(constants_exports);
const SELECTOR_ID = "provenanceTree";
const isEdge = ($el) => {
  return $el.data("node") === "Edge";
};
const CLASS_NAMES = {
  disabled: "is-disabled",
  hover: "has-hover",
  toggled: "has-toggled"
};
const SELECTORS = {
  legend: {
    legendItem: ".js-legend__item",
    legendTrigger: ".js-legend--trigger"
  }
};
