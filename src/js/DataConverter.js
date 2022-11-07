/**
 * map = {
 *     // Map Specific properties from raw data to required properties of the ProvenanceUI API
 *     root: {
 *         entity_type: 'labels',
 *         'uuid': 'id'
 *     },
 *
 *     // Capture common properties from raw data into the properties sub object of the ProvenanceUI API
 *     properties: ['uuid', 'sennet_id'],
 *
 *     // Capture specific properties from type raw data into the properties sub object of the ProvenanceUI API
 *     typeProperties: {
 *         'Source': ['source_type'],
 *         'Sample': ['sample_category],
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
        this.nodes = rawData.nodes;
        this.result = []
        this.map = map
        this.reformatNodes()
    }

    formatDate(val) {
        return new Date(val * 1000).toLocaleString()
    }

    valueCallback(cb, val) {
        if (typeof cb === 'string') {
            if (cb === 'formatDate') {
                return this.formatDate(val)
            }
            return val;
        } else {
            return cb(val)
        }
    }

    // TODO: Write converter for relationships
    reformatRelationships() {

    }

    reformatNodes() {
        let data = {}
        for (let item of this.nodes) {
            let type;

            // Capture properties wanted for
            for (let prop of item) {
                let value = this.item[prop];
                if (this.map.root[prop]) {
                    if (this.map.root[prop] === 'labels') {
                        this.data.labels = [value]
                        type = value;
                    }  else {
                        this.data[this.map.root[prop]] = this.map.callbacks[prop]
                            ? this.valueCallback(this.map.callbacks[prop], value) : value;
                    }
                }
            }
            this.data.properties = {}
            for (let gProp of this.map.properties) {
                this.data.properties[gProp] = item[gProp]
            }

            if (type) {
                for (let tProp of this.map.typeProperties[type]) {
                    this.data.properties[tProp] = item[tProp]
                }
            }
            this.result.push(data)
        }
        return this;
    }
    
    getResult() {
        return this.result;
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