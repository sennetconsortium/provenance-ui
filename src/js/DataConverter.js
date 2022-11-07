/**
 * map = {
 *     root: {
 *         entity_type: 'labels'
 *     },
 *     properties: ['uuid', 'sennet_id']
 *     typeProperties: {
 *         'Source': ['source_type'],
 *         'Sample': ['sample_category],
 *         'Activity': ['created_timestamp', 'created_by_user_displayname']
 *     },
 *     callbacks: {
 *         'created_timestamp': function() {}
 *     }
 * }
 */

class DataConverter {
    constructor(rawData, map) {
        this.rawData = rawData;
        this.result = []
        this.map = map
        this.reformat()
    }

    reformat() {
        let data = {}
        for (let item of this.rawData) {
            let type;
            for (let prop of item) {
                if (this.map.root[prop]) {
                    if (this.map.root[prop] === 'labels') {
                        this.data.labels = [this.item[prop]]
                        type = this.item[prop];
                    } else {
                        this.data[this.map.root[prop]] = this.item[prop];
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
}

export default DataConverter