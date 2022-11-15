"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _Graph = _interopRequireDefault(require("./Graph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Converts any data object to neo4j formatted data for the visualization.
 * Requires provision of a properties map. See example below.
 * @author dbmi.pitt.edu
 * @param rawData {object}
 * @param map {object}
 * @param list {object} Key value pair of nodes and the corresponding node data with all its neighbors
 * map = {
 *     // Map Specific properties from raw data to required properties of the ProvenanceUI API
 *     root: {
 *         entity_type: 'labels',
 *         'uuid': 'id',
 *         'created_by_user_displayname': 'text'
 *     },
 *     actor: {
 *         dataProp: 'created_by_user_displayname',
 *         visualProp: 'researcher'
 *     },
 *     // Capture common properties from raw data into the properties sub object of the ProvenanceUI API
 *     props: ['uuid', 'sennet_id'],
 *
 *     // Capture specific properties from type raw data into the properties sub object of the ProvenanceUI API
 *     typeProps: {
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
  constructor(rawData, map, list) {
    this.rawNodes = rawData;
    this.relationships = [];
    this.nodes = [];
    this.map = map;
    this.error = null;
    this.list = list || {};
  }

  /**
   * Formats a date.
   * @param val
   * @returns {string}
   */
  formatDate(val) {
    return new Date(val * 1000).toLocaleString();
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
   * Returns a parent entity type from provided list object
   * @param id
   * @returns {*|string}
   */
  getParentEntityTypeFromId(id) {
    const rootKeys = Object.assign({}, ...Object.entries(this.map.root).map(_ref => {
      let [a, b] = _ref;
      return {
        [b]: a
      };
    }));
    try {
      const type = this.list[id] ? this.list[id][rootKeys.labels] : '';
      return type;
    } catch (e) {
      console.error(e);
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
   * Returns a particular node as a highlight
   * @param prop {string}
   * @param index {int}
   * @returns {{property: string, class: string, value: string}}
   */
  getNodeAsHighlight(prop) {
    let index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const node = this.nodes[index];
    return {
      'class': node.labels[0],
      property: prop,
      value: node.properties[prop]
    };
  }

  /**
   * Returns a property name from the map.root
   * @param key {string}
   * @returns {string}
   */
  getPropFromMap() {
    let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id';
    let result = '_id';
    for (let prop in this.map.root) {
      if (this.map.root[prop] === key) {
        return prop;
      }
    }
    return result;
  }

  /**
   * Formats the relationships for the graph visualization.
   */
  reformatRelationships() {
    let i = 0;
    const idProp = this.getPropFromMap();
    const actorProp = this.map.actor.dataProp;
    for (let item of this.rawNodes) {
      if (item.endNode) {
        this.relationships.push({
          id: i,
          type: item.type,
          startNode: item.startNode,
          endNode: item.endNode,
          parentType: this.getParentEntityTypeFromId(item.startNode),
          properties: {
            [idProp]: item[idProp],
            [this.map.actor.visualProp || 'actor']: item[actorProp]
          }
        });
        i++;
      }
    }
  }
  runFormatting(nodes) {
    let graph = new _Graph.default();
    graph.dfs(nodes);
    this.rawNodes = graph.getResult();
    this.reformatNodes();
    this.reformatRelationships();
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

  /**
   * Reformates node entities for graph visualization.
   * @returns {DataConverter}
   */
  reformatNodes() {
    try {
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
            } else if (prop === this.map.actor.dataProp && item.isActivity) {
              data.properties = {
                [this.map.actor.visualProp]: item[this.map.actor.dataProp]
              };
              data.text = this.evaluateCallbackOnValue(prop, value);
            } else if (this.map.root[prop] === 'text') {
              data.text = item.isActivity ? this.evaluateCallbackOnValue(prop, value) : item[this.getPropFromMap('labels')];
            } else {
              data[this.map.root[prop]] = this.evaluateCallbackOnValue(prop, value);
            }
          }
        }
        data.properties = data.properties || {};
        for (let gProp of this.map.props) {
          data.properties[gProp] = item[gProp];
        }
        if (type && typeof this.map.typeProps[type] === 'object') {
          for (let tProp of this.map.typeProps[type]) {
            data.properties[tProp] = this.evaluateCallbackOnValue(tProp, item[tProp]);
          }
        }
        data.parentType = this.getParentEntityTypeFromId(item.parentId);
        this.nodes.push(data);
      }
    } catch (e) {
      this.error = e;
    }
    return this;
  }

  /**
   * Returns all node
   * @returns {[]}
   */
  getNodes() {
    return this.nodes;
  }

  /**
   * Return all relationships
   * @returns {[]}
   */
  getRelationships() {
    return this.relationships;
  }

  /**
   * Return neo4jFormatted data
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