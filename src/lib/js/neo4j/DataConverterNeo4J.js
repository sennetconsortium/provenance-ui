import DataConverter from '../DataConverter'
import $ from 'jquery'

class DataConverterNeo4J extends DataConverter {
    constructor(data, map, ops = {}) {
        super(data, map, ops)
        this.keys = {
            generatedBy: this.map.keys.generatedBy || 'wasGeneratedBy',
            prov: this.map.keys.prov || 'prov:type',
            type: this.map.keys.type || 'sennet:entity_type',
            nodes: this.map.keys.nodes || ['entity'],
            relationships: this.map.keys.relationships || {
                // The keys in the data object and the corresponding prop that cross-references the parent entity.
                // Generally:
                    // USED starts at activity, ends at entity
                    // GENERATED starts at entity, ends at activity
                used: 'prov:entity',
                wasGeneratedBy: 'prov:activity',
                // The values of each prop should match above
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

    isActivity(key) {
        return key === 'activity'
    }
    hierarchy(rootId, hasDescendants) {
        this.dict = {}
        try {
            let id
            let shouldAddRoot = false
            let suffix = hasDescendants ? 'Root' : ''
            let treeRoot = {
                type: 'Root',
                subType: 'Root',
                id: rootId + suffix,
                activityId: rootId + suffix+'--Activity'
            }

            // Create dictionaries for constant time access
            for (let key in this.keys.relationships) {
                let data = this.data[key]
                if (data) {
                    let idKey = this.keys.relationships[key]
                    this.dict[key] = {}
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
                    item.type = item[this.keys.prov]
                    item.subType = item[this.keys.type] || item.type
                    id = item[this.getPropFromMap()]

                    const genKey =
                        this.keys.relationships.dataProps.generatedBy
                    const propKey = this.keys.relationships[genKey]

                    let actId = id;
                    if (!this.isActivity(key)) {
                        const usedKey = this.keys.relationships.dataProps.used
                        let used = this.dict[usedKey][id]
                        actId = used ? this.getNodeIdFromValue(used[propKey]) : null
                    }

                    let gen = this.dict[genKey][actId]
                    if (!gen) {
                        shouldAddRoot = true;
                    }
                    $.extend(item, {
                        id: id,
                        activityAsParent: gen ? actId : treeRoot.activityId,
                        entityAsParent: gen ? this.getNodeIdFromValue(
                            gen[this.map.keys.startNode]
                        ) : treeRoot.id
                    })

                    if (id === rootId) {
                        if (!hasDescendants) {
                            item.activityAsParent = null
                            item.entityAsParent = null
                            treeRoot = item
                        }
                        if (hasDescendants) {
                            this.result.push(item)
                        }
                    } else {
                        this.result.push(item)
                    }

                }
            }
            if (shouldAddRoot) {
                this.result.push(treeRoot)
            }
        } catch (e) {
            console.error(e)
        }
        return this
    }
}

export default DataConverterNeo4J
