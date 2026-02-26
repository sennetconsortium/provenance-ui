/** 2/26/2026, 3:04:05 PM | Provenance 3.0.0 | git+https://github.com/sennetconsortium/provenance-ui.git **/
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var DataConverter_exports = {};
__export(DataConverter_exports, {
  default: () => DataConverter_default
});
module.exports = __toCommonJS(DataConverter_exports);
class DataConverter {
  /**
   * Base class of the DataConverters
   * @author dbmi.pitt.edu
   * @param data {object}
   * @param map {object}
   * @param ops {object}
   */
  constructor(data, map, ops = {}) {
    this.error = null;
    if (!map.root || !map.root.id) {
      this.error = "Data map must include root and root.id values.";
      console.error(this.error);
      return this;
    }
    this.ops = ops;
    this.data = data;
    this.map = map;
    this.keys = {
      type: this.map.root && this.map.root.type || "type",
      subType: this.map.root && this.map.root.subType || "subType"
    };
  }
  /**
   * Set properties that will be displayed in info panel.
   * @param item {object}
   * @param type {string}
   */
  setProperties(item, type) {
    item.properties = item.properties || {};
    for (let gProp of this.map.props) {
      item.properties[gProp] = item[gProp];
    }
    if (type && typeof this.map.typeProps[type] === "object") {
      for (let tProp of this.map.typeProps[type]) {
        if (item[tProp] !== void 0) {
          item.properties[tProp] = this.evaluateCallbackOnValue(tProp, item[tProp]);
        }
      }
    }
  }
  /**
   * Runs a callback on a given value
   * @param cb {function}
   * @param val {string}
   * @returns {string}
   */
  valueCallback(cb, val) {
    if (typeof cb === "string") {
      if (typeof this[cb] === "function") {
        return this[cb](val);
      }
      return val;
    } else {
      try {
        return cb(val);
      } catch (e) {
        console.log(e);
      }
    }
    return val;
  }
  /**
   * Formats a date timestamp.
   * @param val
   * @returns {string}
   */
  formatDateTimestamp(val) {
    return new Date(val * 1e3).toLocaleString();
  }
  /**
   * Formats a date.
   * @param val
   * @returns {string}
   */
  formatDate(val) {
    return new Date(val).toLocaleString();
  }
  /**
   * Formats a given name into "Last name, F." initial format
   * @param val
   * @returns {string|*}
   */
  lastNameFirstInitial(val) {
    let name = val.split(" ");
    return name.length > 1 ? "".concat(name[1], ", ").concat(name[0][0], ".") : val;
  }
  /**
   * Determines if a callback should be run.
   * @param prop {string}
   * @param value
   * @returns {string|*}
   */
  evaluateCallbackOnValue(prop, value) {
    return this.map.callbacks[prop] ? this.valueCallback(this.map.callbacks[prop], value) : value;
  }
}
__publicField(DataConverter, "KEY_P_ENTITY", "entityAsParent");
__publicField(DataConverter, "KEY_P_ACT", "activityAsParent");
var DataConverter_default = DataConverter;
