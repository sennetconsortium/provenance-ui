import GraphGeneric from './GraphGeneric'
import DataConverter from '../DataConverter'

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
class DataConverterGeneric extends DataConverter {
    constructor(data, map, list) {
        super(data, map)
        this.error = null
        this.list = list || {}
    }

    /**
     * Formats the relationships for the graph visualization.
     */
    reformatRelationships() {
        let i = 0;
        const idProp = this.getPropFromMap()
        const actorProp = this.map.actor.dataProp
        for (let item of this.data) {
            if (item.endNode) {
                this.relationships.push({
                    id: i,
                    type: item.type,
                    startNode: item.startNode,
                    endNode: item.endNode,
                    parentType: this.getParentEntityTypeFromId(item.startNode),
                    properties: {
                        [idProp] : item[idProp],
                        [this.map.actor.visualProp || 'actor']: item[actorProp]
                    }
                })
                i++
            }

        }
    }

    runFormatting(nodes) {
        let graph = new GraphGeneric()
        graph.dfs(nodes)
        this.data = graph.getResult()
        this.reformatNodes()
        this.reformatRelationships()
    }

    /**
     * Reformates node entities for graph visualization.
     * @returns {DataConverter}
     */
    reformatNodes() {
        try {
            for (let item of this.data) {
                this.formatNode(item)
            }
        } catch (e) {
            console.error(e)
            this.error = e
        }

        return this;
    }

}

export default DataConverterGeneric