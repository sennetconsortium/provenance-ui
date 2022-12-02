import log from 'loglevel'
import GraphGeneric from '../lib/js/generic/GraphGeneric'
import DataConverterNeo4J from '../lib/js/neo4j/DataConverterNeo4J'
import $ from 'jquery'
import dataMap from '../data/neo4j/map.sample'

async function Neo4JGraphObject(serviceOps) {
    const feature = 'neo4j';
    const { token, url, getOptions, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = { token, url }
    const itemId = '6f23a02d5a3058561f420c07519fa6c7'
    //const itemId = 'd0012eff666fb2531d97f379d03de635' // linear
    //const itemId = '7784dc1fe53baed4369692732a29a74d' // large
    //const itemId = 'cc71575241d56f13189e84333f366bd0' // descendants
    //const itemId = '2025e00b9c4be9eb228dfb0bf51d12f1'

    const handleResult = async (result) => {
        log.debug(`${feature}: Result from fetch`, result)
        let keys = ['used', 'wasGeneratedBy']
        let hasDescendants = false
        for (let key of keys) {
            if (result.descendants) {
                for (let _prop in result.descendants[key]) {
                    result[key] = result[key] || {}
                    hasDescendants = true
                    // Must update key to avoid key collisions with original result.used and result.wasGeneratedBy
                    result[key][`des${_prop}`] = result.descendants[key][_prop]
                }
            }

        }
        if (result.descendants) {
            $.extend(result.activity, result.descendants.activity)
            $.extend(result.entity, result.descendants.entity)
            log.debug(`${feature}: Result width appended descendants...`, result)
        }
        
        const converter = new DataConverterNeo4J(result, dataMap)
        converter.buildAdjacencyList(itemId, hasDescendants)
        log.debug('Converter details...', converter)
        setContextData({stratify: converter.result})
        let ops = getOptions()
        const colorMap = {
            "Dataset": "#8ecb93",
            "Activity": "#f16766",
            "Sample": "#ebb5c8",
            "Source": "#ffc255"
        }
        ops = { ...ops, highlight: [{id: itemId}], colorMap}
        setOptions(ops)
        setLoading(false)

    }

    if (token.length && url.length && itemId.length) {
        const graph = new GraphGeneric(graphOps)
        return graph.service({ callback: handleResult, url: url.replace('{id}', itemId) })
    }
}

export default Neo4JGraphObject