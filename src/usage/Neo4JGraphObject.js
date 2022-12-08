import log from 'loglevel'
import GraphGeneric from '../lib/js/generic/GraphGeneric'
import DataConverterNeo4J from '../lib/js/neo4j/DataConverterNeo4J'
import $ from 'jquery'
import dataMap from '../data/neo4j/map.sample'

async function Neo4JGraphObject(serviceOps) {
    const feature = 'neo4j';
    const { token, url, getOptions, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = {  token, url }
    //const itemId = 'ed98c78f9abab37be52fcba09e0c4793'
    //const itemId = '72aab3268f36551302fbd86800a06d3d'
    //const itemId = '99b5197c93c7804b3382b0fca4f351d2'  // cris cross
    //const itemId = '7ab09dd912a7d0bc468095e6986c22a7' //single
    const itemId = '72aab3268f36551302fbd86800a06d3d'

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