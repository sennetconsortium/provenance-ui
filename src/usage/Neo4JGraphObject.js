import log from 'loglevel'
import GraphGeneric from '../lib/js/generic/GraphGeneric'
import DataConverterNeo4J from '../lib/js/neo4j/DataConverterNeo4J'
import $ from 'jquery'
import dataMap from '../data/neo4j/map.sample'

async function Neo4JGraphObject(serviceOps) {
    const feature = 'neo4j';
    const { token, url, getOptions, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = {  token, url }
    const itemId = '1a6c71594de9e37d3568a2c4d762ef78'

    const handleResult = async (result) => {
        log.debug(`${feature}: Result from fetch`, result)
        let keys = ['used', 'wasGeneratedBy']
        for (let key of keys) {
            if (result.descendants) {
                for (let _prop in result.descendants[key]) {
                    result[key] = result[key] || {}
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
        converter.buildAdjacencyList(itemId)
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

    if (url.length && itemId.length) {
        const graph = new GraphGeneric(graphOps)
        return graph.service({ callback: handleResult, url: url.replace('{id}', itemId) })
    }
}

export default Neo4JGraphObject