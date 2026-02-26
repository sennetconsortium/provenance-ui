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
var DataConverterNeo4J_exports = {};
__export(DataConverterNeo4J_exports, {
  default: () => DataConverterNeo4J_default
});
module.exports = __toCommonJS(DataConverterNeo4J_exports);
var import_DataConverter = __toESM(require("../DataConverter"));
class DataConverterNeo4J extends import_DataConverter.default {
  constructor(data, map, ops = {}) {
    super(data, map, ops);
    if (this.error) return this;
    const keys = this.keys;
    this.keys = {
      activity: this.map.keys && this.map.keys.activity || {
        keyName: "activity",
        entityName: "Activity"
      },
      type: keys.type,
      subType: keys.subType,
      nodes: this.map.keys && this.map.keys.nodes || ["entity", "activity"],
      relationships: this.map.keys && this.map.keys.relationships || {
        // The keys in the data object and the corresponding prop that cross-references the parent entity.
        // Generally:
        // USED starts at activity, ends at entity
        // GENERATED starts at entity, ends at activity
        // So: [E0] <-- used -- [A] <-- gen -- [E1]
        // Therefore:
        //  dict.used[A.id] = E0.id  , this reads: the parent id of a used activity, A, is E0.id
        //  dict.gen[E1.id] = A.id  , this reads: the parent id of gen entity, E1, is A.id
        used: { id: "prov:activity", val: "prov:entity" },
        wasGeneratedBy: { id: "prov:entity", val: "prov:activity" },
        // The values of each prop should match above
        dataProps: { used: "used", generatedBy: "wasGeneratedBy" }
      }
    };
    this.result = [];
    this.list = {};
  }
  /**
   * Retrieves an id from a string value with delimiters
   * @param value
   * @returns {*}
   */
  getNodeIdFromValue(value) {
    let parts = value.split(this.map.delimiter || "/");
    return parts[parts.length - 1];
  }
  /**
   * Determines if given key is of activity
   * @param key
   * @returns {boolean}
   */
  isActivity(key) {
    return key === this.keys.activity.keyName;
  }
  /**
   * Creates an adjacency list object
   * @param rootId {string}
   * @returns {DataConverterNeo4J}
   */
  buildAdjacencyList(rootId) {
    if (this.error) return this;
    this.dict = {};
    let id;
    try {
      const suffix = "Root";
      const activityId = rootId + suffix + "--" + this.keys.activity.entityName;
      let treeRoot = {
        className: "is-inserted",
        type: "Root",
        subType: "Root",
        id: rootId + suffix,
        activityId,
        entityAsParent: null,
        activityAsParent: null
      };
      for (let key in this.keys.relationships) {
        let data = this.data[key];
        if (data) {
          let dataKeys = this.keys.relationships[key];
          this.dict[key] = {};
          for (let _prop in data) {
            id = this.getNodeIdFromValue(data[_prop][dataKeys.id]);
            if (!this.dict[key][id]) {
              this.dict[key][id] = [];
            }
            let val = this.getNodeIdFromValue(data[_prop][dataKeys.val]);
            this.dict[key][id].push(val);
          }
        }
      }
      for (let key of this.keys.nodes) {
        let item;
        let data = this.data[key];
        for (let _prop in data) {
          item = data[_prop];
          item.type = item[this.keys.type];
          item.subType = item[this.keys.subType] || item.type;
          if (this.map.root.text) {
            item.text = item[this.map.root.text];
          }
          id = item[this.map.root.id];
          item.id = id;
          const usedKey = this.keys.relationships.dataProps.used;
          if (this.isActivity(key)) {
            const used = this.dict[usedKey] ? this.dict[usedKey][id] || [null] : [null];
            for (let eId of used) {
              let _item = JSON.parse(JSON.stringify(item));
              _item.entityAsParent = eId || treeRoot.id;
              _item.activityAsParent = eId || treeRoot.id;
              this.setProperties(_item, _item.subType);
              this.result.push(_item);
            }
          } else {
            const genKey = this.keys.relationships.dataProps.generatedBy;
            for (let actId of this.dict[genKey][id]) {
              let _item = JSON.parse(JSON.stringify(item));
              _item.activityAsParent = actId;
              const used = this.dict[usedKey] ? this.dict[usedKey][actId] || [null] : [null];
              for (let eId of used) {
                let _item2 = JSON.parse(JSON.stringify(_item));
                _item2.entityAsParent = eId || treeRoot.id;
                this.setProperties(_item2, _item2.subType);
                this.result.push(_item2);
              }
            }
          }
        }
      }
      this.result.push(treeRoot);
    } catch (e) {
      console.error(e);
    }
    return this;
  }
}
var DataConverterNeo4J_default = DataConverterNeo4J;
