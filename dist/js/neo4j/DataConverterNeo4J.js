"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/es.json.stringify.js");
var _DataConverter = _interopRequireDefault(require("../DataConverter"));
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class DataConverterNeo4J extends _DataConverter.default {
  constructor(data, map) {
    let ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    super(data, map, ops);
    this.keys = {
      generatedBy: this.map.keys.generatedBy || 'wasGeneratedBy',
      prov: this.map.keys.prov || 'prov:type',
      type: this.map.keys.type || 'sennet:entity_type',
      nodes: this.map.keys.nodes || ['entity', 'activity'],
      relationships: this.map.keys.relationships || {
        // The keys in the data object and the corresponding prop that cross-references the parent entity.
        // Generally:
        // USED starts at activity, ends at entity
        // GENERATED starts at entity, ends at activity
        used: 'prov:entity',
        wasGeneratedBy: 'prov:activity',
        // The values of each prop should match above
        dataProps: {
          used: 'used',
          generatedBy: 'wasGeneratedBy'
        }
      }
    };
    this.result = [];
    this.list = {};
  }
  getNodeIdFromValue(value) {
    let parts = value.split(this.map.delimiters.node || '/');
    return parts[parts.length - 1];
  }
  isActivity(key) {
    return key === 'activity';
  }
  hierarchy(rootId, hasDescendants) {
    this.dict = {};
    try {
      let id;
      let shouldAddRoot = false;
      let suffix = hasDescendants ? 'Root' : '';
      const activityId = rootId + suffix + '--Activity';
      let treeRoot = {
        className: 'is-inserted',
        type: 'Root',
        subType: 'Root',
        id: rootId + suffix,
        activityId: activityId
      };

      // Create dictionaries for constant time access
      for (let key in this.keys.relationships) {
        let data = this.data[key];
        if (data) {
          let idKey = this.keys.relationships[key];
          this.dict[key] = {};
          for (let _prop in data) {
            id = this.getNodeIdFromValue(data[_prop][idKey]);
            if (!this.dict[key][id]) {
              this.dict[key][id] = [];
            }
            this.dict[key][id].push(data[_prop]);
          }
        }
      }
      for (let key of this.keys.nodes) {
        let data = this.data[key];
        for (let _prop in data) {
          let item = data[_prop];
          item.type = item[this.keys.prov];
          item.subType = item[this.keys.type] || item.type;
          id = item[this.getPropFromMap()];
          const genKey = this.keys.relationships.dataProps.generatedBy;
          const propKey = this.keys.relationships[genKey];
          let actId = id;
          let used = [null];
          if (!this.isActivity(key)) {
            const usedKey = this.keys.relationships.dataProps.used;
            used = this.dict[usedKey][id];
            used = used ? used : [null];
          }
          let x = 0;
          for (let u of used) {
            actId = u ? this.getNodeIdFromValue(u[propKey]) : !this.isActivity(key) ? null : actId;
            console.log(actId);
            let generated = this.dict[genKey][actId];
            if (!generated) {
              shouldAddRoot = true;
              generated = [null];
            }
            x++;
            for (let gen of generated) {
              const entityId = gen ? this.getNodeIdFromValue(gen[this.map.keys.startNode]) : treeRoot.id;
              let _item = JSON.parse(JSON.stringify(item));
              _jquery.default.extend(_item, {
                id: id,
                activityAsParent: !this.isActivity(key) ? gen ? actId : treeRoot.activityId : entityId,
                entityAsParent: entityId
              });
              this.setProperties(_item, _item.subType);
              if (id === rootId) {
                if (!hasDescendants) {
                  _item.activityAsParent = null;
                  _item.entityAsParent = null;
                  treeRoot = _item;
                }
                if (hasDescendants) {
                  this.result.push(_item);
                }
              } else {
                this.result.push(_item);
              }
            }
          }
        }
      }
      if (shouldAddRoot) {
        this.result.push(treeRoot);
        if (hasDescendants) {
          this.result.push(_objectSpread(_objectSpread({}, treeRoot), {}, {
            type: 'Activity',
            subType: 'Activity',
            entityAsParent: treeRoot.id,
            activityAsParent: treeRoot.id,
            id: activityId
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
    return this;
  }
}
var _default = DataConverterNeo4J;
exports.default = _default;