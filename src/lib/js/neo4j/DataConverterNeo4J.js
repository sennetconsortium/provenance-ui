import DataConverter from '../DataConverter'

class DataConverterNeo4J extends DataConverter {
    constructor(data, map, ops = {}) {
        super(data, map, ops)
        this.keys = {
            generatedBy: this.map.keys.generatedBy || 'wasGeneratedBy',
            prov: this.map.keys.prov || 'prov:type',
            type: this.map.keys.type || 'sennet:entity_type',
            nodes: this.map.keys.nodes || ['activity', 'entity'],
            relationships: this.map.keys.relationships || {
                used: 'prov:entity',
                wasGeneratedBy: 'prov:activity',
                dataProps: { used: 'used', generatedBy: 'wasGeneratedBy' }
            }
        }
        this.result = []
        this.list = {}
    }

    getNodeIdFromValue(value) {
        let parts = value.split(this.map.delimiters.node || '/')
        return parts[parts.length - 1]
    }

    hierarchy(root) {
        root = root || this.data.root
        this.dict = {}

        try {
            let id

            // Create dictionaries for constant time access
            for (let key in this.keys.relationships) {
                let data = this.data[key]
                if (data) {
                    let idKey = this.keys.relationships[key]
                    for (let _prop in data) {
                        id = this.getNodeIdFromValue(data[_prop][idKey])
                        this.dict[key][id] = data[_prop]
                    }
                }
            }

            for (let key of this.keys.nodes) {
                let data = this.data[key]
                for (let _prop in data) {
                    let item = data[_prop]
                    id = item[this.getPropFromMap()]
                    const usedDict = this.keys.relationships.dataProps.used
                    let used = this.dict[usedDict][id]
                    const genDict =
                        this.keys.relationships.dataProps.generatedBy
                    const propKey = this.keys.relationships[genDict]
                    let actId = this.getNodeIdFromValue(used[propKey])
                    let gen = this.dict[genDict][actId]
                    this.result.push(...item, {
                        activityAsParent: actId,
                        entityAsParent: this.getNodeIdFromValue(
                            gen[this.map.keys.startNode]
                        )
                    })
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export default DataConverterNeo4J
