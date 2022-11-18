"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/es.regexp.to-string.js");
var _DataConverter = _interopRequireDefault(require("../DataConverter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DataConverterNeo4J extends _DataConverter.default {
  constructor(data, map) {
    let ops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    super(data, map, ops);
    this.keys = {
      generatedBy: this.map.keys.generatedBy || 'wasGeneratedBy',
      prov: this.map.keys.prov || 'prov:type',
      type: this.map.keys.type || 'sennet:entity_type',
      nodes: this.map.keys.nodes || ['activity', 'entity'],
      relationships: this.map.keys.relationships || ["wasGeneratedBy", "used"]
    };
    this.list = {};
  }
  getRelationshipType(key) {
    return this.map.labels ? this.map.labels.edge[key] : key;
  }
  getNodeIdFromValue(value) {
    let parts = value.split(this.map.delimiters.node || '/');
    return parts[parts.length - 1];
  }

  /**
   * Formats the relationships for the graph visualization.
   */
  reformatRelationships() {
    try {
      for (let key of this.keys.relationships) {
        let i = 0;
        for (let _prop in this.data[key]) {
          const node = this.data[key][_prop];
          const startNode = key === this.keys.generatedBy ? this.getNodeIdFromValue(node[this.map.keys.startNode]) : this.getNodeIdFromValue(node[this.map.keys.endNode]);
          const endNode = key === this.keys.generatedBy ? this.getNodeIdFromValue(node[this.map.keys.endNode]) : this.getNodeIdFromValue(node[this.map.keys.startNode]);
          this.relationships.push({
            id: i.toString(),
            type: this.getRelationshipType(key),
            startNode: startNode,
            endNode: endNode,
            parentType: this.getParentEntityTypeFromId(startNode),
            properties: {
              [this.map.keys.startNode]: this.getNodeIdFromValue(node[this.map.keys.startNode])
            }
          });
          i++;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  flatten() {
    try {
      for (let key of this.keys.nodes) {
        for (let item in this.data[key]) {
          const id = this.data[key][item][this.getPropFromMap()];
          this.list[id] = this.data[key][item];
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  getParentEntityType(item) {
    if (item[this.keys.prov] === this.actvityTypeName) {
      const idProp = this.getPropFromMap();
      for (let _prop in this.data[this.keys.generatedBy]) {
        const node = this.data[this.keys.generatedBy][_prop];
        try {
          if (node[this.map.keys.endNode].indexOf(item[idProp]) !== -1) {
            const parentNode = this.list[this.getNodeIdFromValue(node[this.map.keys.startNode])];
            if (parentNode) {
              return parentNode[this.keys.type];
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
  reformatNodes() {
    try {
      for (let key of this.keys.nodes) {
        for (let _prop in this.data[key]) {
          this.formatNode(this.data[key][_prop]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
var _default = DataConverterNeo4J;
exports.default = _default;