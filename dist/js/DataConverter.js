"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class DataConverter {
  /**
   * Base class of the DataConverters
   * @author dbmi.pitt.edu
   * @param data {object}
   * @param map {object}
   * @param ops {object}
   */
  constructor(data, map) {
    let ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    this.error = null;
    if (!map.root || !map.root.id) {
      this.error = 'Data map must include root and root.id values.';
      console.error(this.error);
      return this;
    }
    this.ops = ops;
    this.data = data;
    this.map = map;
    this.keys = {
      type: this.map.root && this.map.root.type || 'type',
      subType: this.map.root && this.map.root.subType || 'subType'
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
    if (type && typeof this.map.typeProps[type] === 'object') {
      for (let tProp of this.map.typeProps[type]) {
        if (item[tProp] !== undefined) {
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
    if (typeof cb === 'string') {
      if (typeof this[cb] === 'function') {
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
    return new Date(val * 1000).toLocaleString();
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
    let name = val.split(' ');
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
_defineProperty(DataConverter, "KEY_P_ENTITY", 'entityAsParent');
_defineProperty(DataConverter, "KEY_P_ACT", 'activityAsParent');
var _default = exports.default = DataConverter;