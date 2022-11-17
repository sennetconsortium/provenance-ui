import DataConverter from '../DataConverter'
class DataConverterNeo4J extends DataConverter {
    constructor(data, map) {
        super(data, map)
        this.keys = {
            generatedBy: this.map.keys.generatedBy || 'wasGeneratedBy',
            prov: this.map.keys.prov || 'prov:type',
            type: this.map.keys.type || 'sennet:entity_type',
            nodes: this.map.keys.nodes || ['activity', 'entity'],
            relationships: this.map.keys.relationships || ["wasGeneratedBy", "used"]
        }
        this.list = {}
    }

    getRelationshipType(key) {
        return this.map.labels ? this.map.labels.edge[key] : key
    }

    getNodeIdFromValue(value) {
        let parts = value.split(this.map.delimiters.node || '/')
        return parts[parts.length - 1]
    }

    /**
     * Formats the relationships for the graph visualization.
     */
    reformatRelationships() {
        try {
            for (let key of this.keys.relationships) {
                for (let _prop in this.data[key]) {
                    let i = 0;
                    const idProp = this.getPropFromMap()
                    const actorProp = this.map.actor.dataProp
                    const node = this.data[key][_prop]

                    const startNode = this.getNodeIdFromValue(node[this.map.keys.startNode])
                    this.relationships.push({
                        id: i,
                        type: this.getRelationshipType(key),
                        startNode: startNode,
                        endNode: this.getNodeIdFromValue(node[this.map.keys.endNode]),
                        parentType: this.getParentEntityTypeFromId(startNode),
                        properties: {
                        }
                    })
                    i++

                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    flatten() {
        try {
            for (let key of this.keys.nodes) {
                for (let item in this.data[key]) {
                    const id = this.data[key][item][this.getPropFromMap()]
                    this.list[id] = this.data[key][item]
                }
            }
        } catch (e) {
            console.error(e)
        }
        console.log(this.list)
    }

    getParentEntityType(item) {
        if (item[this.keys.prov] === this.actvityTypeName) {
            const idProp = this.getPropFromMap()
            for (let _prop in this.data[this.keys.generatedBy]) {
                const node = this.data[this.keys.generatedBy][_prop];
                try {
                    if (node[this.map.keys.endNode].indexOf(item[idProp]) !== -1) {
                        const parentNode = this.list[this.getNodeIdFromValue(node[this.map.keys.startNode])]
                        if (parentNode) {
                            return parentNode[this.keys.type]
                        }
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }

    reformatNodes() {
        try {
            for (let key of this.keys.nodes) {
                for (let _prop in this.data[key]) {
                    this.formatNode(this.data[key][_prop])
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export default DataConverterNeo4J