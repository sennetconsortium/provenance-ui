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
var Toggle_exports = {};
__export(Toggle_exports, {
  default: () => Toggle_default
});
module.exports = __toCommonJS(Toggle_exports);
var import_react = __toESM(require("react"));
var import_jquery = __toESM(require("jquery"));
var import_prop_types = __toESM(require("prop-types"));
var import_constants = require("../js/constants");
function Toggle({ context, icon = true, selectorId = import_constants.SELECTOR_ID, ariaLabel = "Toggle", text = "", className = "", disabled = false }) {
  const toggleData = (e) => {
    const $el = (0, import_jquery.default)(e.currentTarget);
    const toggled = import_constants.CLASS_NAMES.toggled;
    $el.toggleClass(toggled);
    const $p = $el.parents(import_constants.SELECTORS.legend.legendItem);
    if (!(0, import_constants.isEdge)($p)) {
      $p.toggleClass(import_constants.CLASS_NAMES.disabled);
    }
    const $trigger = $p.find(import_constants.SELECTORS.legend.legendTrigger);
    if (!(0, import_constants.isEdge)($p) && $p.hasClass(import_constants.CLASS_NAMES.hover)) {
      $trigger.eq(0).trigger("click", { force: true });
    }
    if (context !== null) {
      context(e, $el.hasClass(toggled), selectorId);
    }
  };
  return /* @__PURE__ */ import_react.default.createElement("label", { className: "c-toggle ".concat(className, " ").concat(disabled ? import_constants.CLASS_NAMES.toggled : "") }, !icon && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("span", { className: "c-toggle__text" }, text), /* @__PURE__ */ import_react.default.createElement("span", { className: "c-toggle__main" }, /* @__PURE__ */ import_react.default.createElement("input", { type: "checkbox", onClick: toggleData }), /* @__PURE__ */ import_react.default.createElement("span", { className: "c-toggle__slider c-toggle__slider--round", "aria-label": ariaLabel }))), icon && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("span", { className: "c-toggle__icon fa fa-eye ".concat(disabled ? import_constants.CLASS_NAMES.toggled : ""), "aria-label": ariaLabel, onClick: toggleData, title: ariaLabel })));
}
Toggle.propTypes = {
  context: import_prop_types.default.func,
  icon: import_prop_types.default.bool,
  disabled: import_prop_types.default.bool,
  selectorId: import_prop_types.default.string,
  ariaLabel: import_prop_types.default.string,
  text: import_prop_types.default.string,
  className: import_prop_types.default.string
};
var Toggle_default = Toggle;
