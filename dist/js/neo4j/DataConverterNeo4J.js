"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _DataConverter = _interopRequireDefault(require("../DataConverter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * This converts a data object in Neo4J format to an adjacency list that will be later
 * used in d3.stratify to create the hierarchy model.
 * @author dbmi.pitt.edu
 */
class DataConverterNeo4J extends _DataConverter.default {
  constructor(data, map) {
    let ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    super(data, map, ops);
    if (this.error) return this;
    const keys = this.keys;
    this.keys = {
      activity: this.map.keys && this.map.keys.activity || {
        keyName: 'activity',
        entityName: 'Activity'
      },
      type: keys.type,
      subType: keys.subType,
      nodes: this.map.keys && this.map.keys.nodes || ['entity', 'activity'],
      relationships: this.map.keys && this.map.keys.relationships || {
        // The keys in the data object and the corresponding prop that cross-references the parent entity.
        // Generally:
        // USED starts at activity, ends at entity
        // GENERATED starts at entity, ends at activity
        // So: [E0] <-- used -- [A] <-- gen -- [E1]
        // Therefore:
        //  dict.used[A.id] = E0.id  , this reads: the parent id of a used activity, A, is E0.id
        //  dict.gen[E1.id] = A.id  , this reads: the parent id of gen entity, E1, is A.id
        used: {
          id: 'prov:activity',
          val: 'prov:entity'
        },
        wasGeneratedBy: {
          id: 'prov:entity',
          val: 'prov:activity'
        },
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

  /**
   * Retrieves an id from a string value with delimiters
   * @param value
   * @returns {*}
   */
  getNodeIdFromValue(value) {
    let parts = value.split(this.map.delimiter || '/');
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
      const suffix = 'Root';
      const activityId = rootId + suffix + '--' + this.keys.activity.entityName;
      let treeRoot = {
        className: 'is-inserted',
        type: 'Root',
        subType: 'Root',
        id: rootId + suffix,
        activityId: activityId,
        entityAsParent: null,
        activityAsParent: null
      };

      // Create dictionaries for constant time access
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
            const used = this.dict[usedKey] ? this.dict[usedKey][id] || [null] : [null]; // create a [null] for Activity of Source that may point to inserted Root
            for (let eId of used) {
              let _item = JSON.parse(JSON.stringify(item));
              _item.entityAsParent = eId || treeRoot.id; // (redundant as on toggle the Activities will not be in the dataset anyway
              _item.activityAsParent = eId || treeRoot.id; // Activities point to entity Id as parent
              this.setProperties(_item, _item.subType);
              this.result.push(_item);
            }
          } else {
            // Entity
            const genKey = this.keys.relationships.dataProps.generatedBy;
            for (let actId of this.dict[genKey][id]) {
              let _item = JSON.parse(JSON.stringify(item));
              _item.activityAsParent = actId;
              const used = this.dict[usedKey] ? this.dict[usedKey][actId] || [null] : [null]; // create a [null] for Source that may point to inserted Root
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
var _default = exports.default = DataConverterNeo4J;