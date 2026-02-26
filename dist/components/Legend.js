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
var Legend_exports = {};
__export(Legend_exports, {
  default: () => Legend_default
});
module.exports = __toCommonJS(Legend_exports);
var import_react = __toESM(require("react"));
var import_prop_types = __toESM(require("prop-types"));
var import_jquery = __toESM(require("jquery"));
var import_Toggle = __toESM(require("./Toggle"));
var import_constants = require("../js/constants");
var import_sweetalert2 = __toESM(require("sweetalert2"));
var import_useHelpHtml = __toESM(require("../hooks/useHelpHtml"));
const Legend = ({ children, colorMap, filterNodes = true, actionMap = {}, selectorId = import_constants.SELECTOR_ID, className = "", help = {}, otherLegend = {} }) => {
  const [colors] = (0, import_react.useState)(colorMap);
  const [filterable] = (0, import_react.useState)(filterNodes);
  const { html } = (0, import_useHelpHtml.default)(help);
  const loaded = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (filterable && !loaded.current) setEvents();
  });
  const showHelp = () => {
    import_sweetalert2.default.fire({
      customClass: {
        container: "c-help",
        title: "c-help__title",
        confirmButton: "c-help__btn"
      },
      width: help.width || 700,
      title: "".concat(help.title || help.label),
      html,
      showCloseButton: true,
      confirmButtonText: "Close"
    });
  };
  const setEvents = () => {
    loaded.current = true;
    const stickClass = "has-activeFilters";
    const selectors = import_constants.SELECTORS.legend;
    const classFns = {
      add: "addClass",
      remove: "removeClass"
    };
    const getItem = (e) => {
      return (0, import_jquery.default)(e.currentTarget).parents(selectors.legendItem);
    };
    const toggleClass = (e, fn = "addClass", className2 = import_constants.CLASS_NAMES.hover) => {
      const $el = getItem(e);
      const node = $el.attr("data-filter") || $el.data("node");
      $el[fn](className2).parent()[fn](className2);
      (0, import_jquery.default)("#".concat(selectorId, " .node--").concat(node))[fn](className2);
      if ((0, import_constants.isEdge)($el)) {
        (0, import_jquery.default)("#".concat(selectorId)).find(".links, #arrowhead")[fn](className2);
      }
      if (!((0, import_jquery.default)("#".concat(selectorId, " .node")).hasClass(import_constants.CLASS_NAMES.hover) && fn === classFns.remove)) {
        (0, import_jquery.default)("#".concat(selectorId))[fn](className2);
      }
    };
    const $trigger = (0, import_jquery.default)(".c-legend--".concat(selectorId, "  ").concat(selectors.legendTrigger));
    $trigger.on("click", (e, data) => {
      e.stopPropagation();
      e.preventDefault();
      if (!getItem(e).hasClass(import_constants.CLASS_NAMES.disabled) || (data == null ? void 0 : data.force)) {
        const fn = getItem(e).hasClass(stickClass) ? classFns.remove : classFns.add;
        toggleClass(e, fn);
        toggleClass(e, fn, stickClass);
        try {
          const node = getItem(e).data("node");
          if (fn === classFns.remove) {
            delete window.ProvenanceTreeD3[selectorId].legendFilters[node];
          } else {
            window.ProvenanceTreeD3[selectorId].legendFilters[node] = true;
          }
        } catch (e2) {
          console.error(e2);
        }
      }
    });
    $trigger.on("mouseover", (e) => {
      if (!getItem(e).hasClass(import_constants.CLASS_NAMES.disabled)) {
        if (!(0, import_jquery.default)("#".concat(selectorId)).hasClass(stickClass)) toggleClass(e);
      }
    }).on("mouseleave", (e) => {
      if (!(0, import_jquery.default)("#".concat(selectorId)).hasClass(stickClass)) toggleClass(e, "removeClass");
    });
    (0, import_jquery.default)(".c-legend--".concat(selectorId, " .js-legend--help")).on("click", (e) => {
      showHelp();
    });
  };
  const buildLegend = () => {
    var _a;
    let result = [];
    let helpLabel;
    if (help) {
      help.label = helpLabel = help.label || "Help";
      colors[help.label] = "transparent";
    }
    const isHelp = (key) => key === helpLabel;
    const isOther = (key) => otherLegend[key] !== void 0;
    const hasFilter = (key) => otherLegend[key].filterValue !== void 0;
    const getColor = (key) => typeof colors[key] === "string" ? colors[key] : colors[key].color || "transparent";
    const keyToClassName = (key) => key.replaceAll(" ", "-");
    const getJsClassName = (key) => isHelp(key) ? "js-legend--help" : isOther(key) && !hasFilter(key) ? "js-legend--".concat(keyToClassName(key)) : "js-legend--trigger";
    const getTitle = (key) => isOther(key) && otherLegend[key].title ? otherLegend[key].title : null;
    let action;
    import_jquery.default.extend(colors, otherLegend);
    for (let key in colors) {
      action = actionMap[key];
      result.push(
        /* @__PURE__ */ import_react.default.createElement(
          "li",
          {
            className: "c-legend__item c-legend__item--".concat(keyToClassName(key), "  ").concat(isHelp(key) || isOther(key) && !hasFilter(key) ? "" : "js-legend__item", " ").concat(action && action.disabled ? import_constants.CLASS_NAMES.disabled : ""),
            key: "legend--".concat(key),
            "data-node": isOther(key) ? otherLegend[key].nodeKey || key : key,
            "data-filter": isOther(key) ? otherLegend[key].filterValue : void 0,
            onClick: isOther(key) && otherLegend[key].callback ? (e) => otherLegend[key].callback(e, selectorId, key) : null,
            title: getTitle(key)
          },
          /* @__PURE__ */ import_react.default.createElement("span", { className: "c-legend__color ".concat(getJsClassName(key), " c-legend__color--").concat(keyToClassName(key)) }, /* @__PURE__ */ import_react.default.createElement("span", { style: { backgroundColor: getColor(key) }, className: (_a = otherLegend[key]) == null ? void 0 : _a.iconContainerClass }, isHelp(key) && /* @__PURE__ */ import_react.default.createElement("i", { className: "fa fa-question-circle-o", role: "presentation" }), isOther(key) && otherLegend[key].icon && /* @__PURE__ */ import_react.default.createElement("i", { className: "fa ".concat(otherLegend[key].icon), role: "presentation" }))),
          /* @__PURE__ */ import_react.default.createElement("span", { className: "c-legend__label" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "c-legend__label__text ".concat(getJsClassName(key)) }, colors[key].name ? colors[key].name : key), action && /* @__PURE__ */ import_react.default.createElement(
            import_Toggle.default,
            {
              context: action.callback,
              selectorId: action.selectorId || selectorId,
              className: "c-legend__action ".concat(action.className),
              disabled: action.visible !== void 0 ? !action.visible : action.disabled,
              ariaLabel: action.ariaLabel
            }
          ))
        )
      );
    }
    return result;
  };
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "c-legend c-legend--".concat(selectorId, " ").concat(filterable ? "c-legend--filterable" : "", " ").concat(className) }, /* @__PURE__ */ import_react.default.createElement("ul", null, buildLegend(), children));
};
Legend.propTypes = {
  colorMap: import_prop_types.default.object.isRequired,
  help: import_prop_types.default.object,
  otherLegend: import_prop_types.default.object,
  actionMap: import_prop_types.default.object,
  children: import_prop_types.default.object,
  filterNodes: import_prop_types.default.bool,
  selectorId: import_prop_types.default.string,
  className: import_prop_types.default.string
};
var Legend_default = Legend;
