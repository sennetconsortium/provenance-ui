"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _Graph = _interopRequireDefault(require("./Graph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * map = {
 *     // Map Specific properties from raw data to required properties of the ProvenanceUI API
 *     root: {
 *         entity_type: 'labels',
 *         'uuid': 'id',
 *         'created_by_user_displayname': 'text'
 *     },
 *
 *     // Capture common properties from raw data into the properties sub object of the ProvenanceUI API
 *     properties: ['uuid', 'sennet_id'],
 *
 *     // Capture specific properties from type raw data into the properties sub object of the ProvenanceUI API
 *     typeProperties: {
 *         'Source': ['source_type'],
 *         'Sample': ['sample_category'],
 *         'Activity': ['created_timestamp', 'created_by_user_displayname']
 *     },
 *
 *     // Run callbacks on the values
 *     callbacks: {
 *         'some_prop_name': function(val) {},
 *         'created_timestamp': 'formatDate'
 *     }
 * }
 */

class DataConverter {
  constructor(rawData, map) {
    this.rawNodes = rawData;
    this.relationships = [];
    this.nodes = [];
    this.map = map;
  }
  formatDate(val) {
    return new Date(val * 1000).toLocaleString();
  }
  valueCallback(cb, val) {
    if (typeof cb === 'string') {
      if (cb === 'formatDate') {
        return this.formatDate(val);
      }
      return val;
    } else {
      return cb(val);
    }
  }
  getRootAsHighlight(prop) {
    const node = this.nodes[0];
    return {
      'class': node.labels[0],
      property: prop,
      value: node.properties[prop]
    };
  }
  reformatRelationships() {
    let i = 0;
    for (let item of this.rawNodes) {
      if (item.endNode) {
        this.relationships.push({
          id: i,
          type: item.type,
          startNode: item.startNode,
          endNode: item.endNode,
          properties: {}
        });
        i++;
      }
    }
  }
  runFormatting() {
    let graph = new _Graph.default();
    graph.dfs(this.rawNodes);
    this.rawNodes = graph.getResult();
    this.reformatNodes();
  }
  reformatNodes() {
    for (let item of this.rawNodes) {
      let data = {};
      let type;

      // Capture properties wanted for
      for (let prop in item) {
        let value = item[this.map.root[prop]] !== undefined ? item[this.map.root[prop]] : item[prop];
        if (this.map.root[prop]) {
          if (this.map.root[prop] === 'labels') {
            data.labels = item.labels || [value];
            type = value;
          } else {
            data[this.map.root[prop]] = this.map.callbacks[prop] ? this.valueCallback(this.map.callbacks[prop], value) : value;
          }
        }
      }
      data.properties = {};
      for (let gProp of this.map.properties) {
        data.properties[gProp] = item[gProp];
      }
      if (type) {
        for (let tProp of this.map.typeProperties[type]) {
          data.properties[tProp] = item[tProp];
        }
      }
      this.nodes.push(data);
    }
    return this;
  }
  getNodes() {
    return this.nodes;
  }
  getRelationships() {
    return this.relationships;
  }

  /**
   *
   * @param data
   * @returns {{results: [{data: [{graph: {relationships: *, nodes: *}}], columns: []}], errors: *[]}}
   */
  getNeo4jFormat(data) {
    return {
      results: [{
        columns: data.columns,
        data: [{
          graph: {
            nodes: data.nodes,
            relationships: data.relationships
          }
        }]
      }],
      errors: []
    };
  }
}
var _default = DataConverter;
exports.default = _default;