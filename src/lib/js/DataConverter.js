class DataConverter {
    constructor(data, map, ops = {}) {
        this.ops = ops
        this.data = data
        this.map = map
        this.relationships = []
        this.nodes = []
        this.error = null
        this.actvityTypeName = this.map.actvityTypeName || 'Activity'
    }

    isActivity(item) {
        return item.isActivity || (this.keys && this.keys.prov ? item[this.keys.prov] === this.actvityTypeName : false)
    }

    /**
     * Returns a parent entity type from provided list object
     * @param id
     * @returns {*|string}
     */
    getParentEntityTypeFromId(id) {
        const rootKeys = Object.assign({}, ...Object.entries(this.map.root).map(([a,b]) => ({ [b]: a })))
        try {
            const type = this.list[id] ? this.list[id][rootKeys.labels] : ''
            return type
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * Returns a property name from the map.root
     * @param key {string}
     * @returns {string}
     */
    getPropFromMap(key = 'id') {
        let result = '_id'
        for (let prop in this.map.root) {
            if (this.map.root[prop] === key ) {
                return prop
            }
        }
        return result
    }

    formatNode(item) {
        let data = {}
        let type;

        // Capture properties wanted for
        for (let prop in item) {
            let value = item[this.map.root[prop]] !== undefined ? item[this.map.root[prop]] : item[prop];
            if (this.map.root[prop]) {
                 if (this.map.root[prop] === 'labels' || (this.map.root[prop] === 'category' && this.isActivity(item))) {
                    data.labels = item.labels || [value]
                    type = value
                } else if (prop === this.map.actor.dataProp && this.isActivity(item) ) {
                    data.properties = {
                        [this.map.actor.visualProp]: item[this.map.actor.dataProp]
                    }
                    data.text = this.evaluateCallbackOnValue(prop, value)
                } else if (this.map.root[prop] === 'text') {
                    data.text = this.isActivity(item) ? this.evaluateCallbackOnValue(prop, value) : 
                    (this.ops.setTextForNoneActivity ? item[this.getPropFromMap('labels')] : '')
                }  else {
                    data[this.map.root[prop]] = this.evaluateCallbackOnValue(prop, value)

                }
            }
        }

        data.properties = data.properties || {}
        for (let gProp of this.map.props) {
            data.properties[gProp] = item[gProp]
        }

        if (type && typeof this.map.typeProps[type] === 'object') {
            for (let tProp of this.map.typeProps[type]) {
                if (item[tProp] !== undefined) {
                    data.properties[tProp] = this.evaluateCallbackOnValue(tProp, item[tProp])
                }

            }
        }

        data.parentType = item.parentId ? this.getParentEntityTypeFromId(item.parentId) : this.getParentEntityType(item)
        this.nodes.push(data)
    }

    getParentEntityType(item) {
        return ''
    }

    /**
     * Returns a particular node as a highlight
     * @param prop {string}
     * @param index {int}
     * @returns {{property: string, class: string, value: string}}
     */
    getNodeAsHighlight(prop, index = 0) {
        const node = this.nodes[index]
        return {
            'class': node.labels[0],
            property: prop,
            value: node.properties[prop]
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
        return val
    }

    /**
     * Formats a date timestamp.
     * @param val
     * @returns {string}
     */
    formatDateTimestamp(val) {
        return new Date(val * 1000).toLocaleString()
    }

    /**
     * Formats a date.
     * @param val
     * @returns {string}
     */
    formatDate(val) {
        return new Date(val).toLocaleString()
    }

    /**
     * Formats a given name into "Last name, F." initial format
     * @param val
     * @returns {string|*}
     */
    lastNameFirstInitial(val) {
        let name = val.split(' ')
        return name.length > 1 ? `${name[1]}, ${name[0][0]}.` : val
    }

    /**
     * Determines if a callback should be run.
     * @param prop {string}
     * @param value
     * @returns {string|*}
     */
    evaluateCallbackOnValue(prop, value) {
        return this.map.callbacks[prop]
            ? this.valueCallback(this.map.callbacks[prop], value) : value;
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
        }
    }
}

export default DataConverter