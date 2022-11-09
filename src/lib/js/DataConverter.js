import Graph from './Graph'
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
        this.relationships = []
        this.nodes = []
        this.map = map
    }

    formatDate(val) {
        return new Date(val * 1000).toLocaleString()
    }

    lastNameFirstInitial(val) {
        let name = val.split(' ')
        return name.length > 1 ? `${name[1]}, ${name[0][0]}.` : val
    }

    valueCallback(cb, val) {

        if (typeof cb === 'string') {
            if (typeof this[cb]  === 'function') {
                return this[cb](val)
            }
            return val;
        } else {
            try {
                return cb(val)
            } catch (e) {
                console.log(e)
            }

        }
    }

    getRootAsHighlight(prop) {
        const node = this.nodes[0]
        return {
            'class': node.labels[0],
            property: prop,
            value: node.properties[prop]
        }
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
                })
                i++
            }

        }
    }

    runFormatting(nodes) {
        let graph = new Graph()
        graph.dfs(nodes)
        this.rawNodes = graph.getResult()
        this.reformatNodes()
        this.reformatRelationships()
    }

    reformatNodes() {

        for (let item of this.rawNodes) {
            let data = {}
            let type;

            // Capture properties wanted for
            for (let prop in item) {
                let value = item[this.map.root[prop]] !== undefined ? item[this.map.root[prop]] : item[prop];
                if (this.map.root[prop]) {
                    if (this.map.root[prop] === 'labels') {
                        data.labels = item.labels || [value]
                        type = value;
                    }  else {
                        data[this.map.root[prop]] = this.map.callbacks[prop]
                            ? this.valueCallback(this.map.callbacks[prop], value) : value;
                    }
                }
            }
            data.properties = {}
            for (let gProp of this.map.properties) {
                data.properties[gProp] = item[gProp]
            }

            if (type) {
                for (let tProp of this.map.typeProperties[type]) {
                    data.properties[tProp] = item[tProp]
                }
            }
            this.nodes.push(data)
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
        }
    }
}

export default DataConverter