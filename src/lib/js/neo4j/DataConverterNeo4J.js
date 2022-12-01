import DataConverter from '../DataConverter'
import $ from 'jquery'

class DataConverterNeo4J extends DataConverter {

    constructor(data, map, ops = {}) {
        super(data, map, ops)
        this.keys = {
            activity: this.map.keys.activity || {
                keyName: 'activity',
                entityName: 'Activity'
            },
            generatedBy: this.map.keys.generatedBy || 'wasGeneratedBy',
            prov: this.map.keys.prov || 'prov:type',
            type: this.map.keys.type || 'sennet:entity_type',
            nodes: this.map.keys.nodes || ['entity', 'activity'],
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
        return key === this.keys.activity.keyName
    }

    hierarchy(rootId, hasDescendants) {
        this.dict = {}
        try {
            let id
            let shouldAddRoot = false
            let suffix = hasDescendants ? 'Root' : ''
            const activityId = rootId + suffix+'--'+this.keys.activity.entityName
            let treeRoot = {
                className: 'is-inserted',
                type: 'Root',
                subType: 'Root',
                id: rootId + suffix,
                activityId: activityId
            }

            // Create dictionaries for constant time access
            for (let key in this.keys.relationships) {
                let data = this.data[key]
                if (data) {
                    let idKey = this.keys.relationships[key]
                    this.dict[key] = {}
                    for (let _prop in data) {
                        id = this.getNodeIdFromValue(data[_prop][idKey])
                        if (!this.dict[key][id]) {
                            this.dict[key][id] = []
                        }
                        this.dict[key][id].push(data[_prop])
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

                    let actId = id
                    let used = [null]

                    // Find the used dict list of the current id to backtrack to get to parent(s):
                    // [Ec] <--used-- [A] <--generated-- [Ep]
                    // Given a current entity, Ec, if it has a parent entity, Ep,
                    // it will have a 'used' activity detail, A,
                    // which will in turn point up to the parent from the 'generated' activity detail
                    if (!this.isActivity(key)) {
                        const usedKey = this.keys.relationships.dataProps.used
                        used = this.dict[usedKey] ? this.dict[usedKey][id] : null
                        used = used ? used : [null] // add this so the next loop runs at least once
                    }

                    for(let u of used) {
                        actId = u ? this.getNodeIdFromValue(u[propKey]) : (!this.isActivity(key) ? null : actId)
                        let generated = this.dict[genKey] ? this.dict[genKey][actId] : null

                        // No parent, current entity is the root or a descendant of the current
                        if (!generated) {
                            shouldAddRoot = true;
                            generated = [null] // we should add this to get to add the root
                        }

                        for (let gen of generated) {
                            const entityId = gen ? this.getNodeIdFromValue(
                                gen[this.map.keys.startNode]
                            ) : treeRoot.id

                            // Do a deep copy to avoid reference mutations
                            let _item = JSON.parse(JSON.stringify(item))
                            $.extend(_item, {
                                id: id,
                                activityAsParent: !this.isActivity(key) ? (gen ? actId : treeRoot.activityId) : entityId,
                                entityAsParent: entityId
                            })

                            this.setProperties(_item, _item.subType)

                            if (id === rootId) {
                                if (!hasDescendants) {
                                    // Must clear this so that the d3.stratify will not result in no root issue
                                    // Roots cannot have parents.
                                    _item.activityAsParent = null
                                    _item.entityAsParent = null
                                    // use the original item object
                                    treeRoot = _item
                                }
                                if (hasDescendants) {
                                    this.result.push(_item)
                                }
                            } else {
                                this.result.push(_item)
                            }
                        }

                    }

                }
            }
            if (shouldAddRoot) {
                this.result.push(treeRoot)
                if (hasDescendants) {
                    this.result.push({
                        ...treeRoot,
                        type: this.keys.activity.entityName,
                        subType: this.keys.activity.entityName,
                        entityAsParent: treeRoot.id,
                        activityAsParent: treeRoot.id,
                        id: activityId
                    })
                }
            }
        } catch (e) {
            console.error(e)
        }
        return this
    }
}

export default DataConverterNeo4J
