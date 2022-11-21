import log from 'loglevel'
import GraphGeneric from '../lib/js/generic/GraphGeneric'
import DataConverterNeo4J from '../lib/js/neo4j/DataConverterNeo4J'
import $ from 'jquery'
import dataMap from '../data/neo4j/map.sample'

async function Neo4JGraphObject(serviceOps) {
    const feature = 'neo4j';
    const { token, url, getOptions, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = { token, url }
    const itemId = '956574ea660178122546e83e2eb4515d'

    const handleResult = async (result) => {
        log.debug(`${feature}: Result from fetch`, result)
        let keys = ['used', 'wasGeneratedBy']
        for (let key of keys) {
            for (let _prop in result.descendants[key]) {
                result[key] = result[key] || {}
                // Must update key to avoid key collisions with original result.used and result.wasGeneratedBy
                result[key][`des${_prop}`] = result.descendants[key][_prop]
            }
        }
        $.extend(result.activity, result.descendants.activity)
        $.extend(result.entity, result.descendants.entity)
        log.debug(`${feature}: Result width appended descendants...`, result)
        
        const converter = new DataConverterNeo4J(result, dataMap, {setTextForNoneActivity: false})
        converter.flatten()
        converter.reformatNodes()
        converter.reformatRelationships()
        log.debug(`${feature}: Nodes ...`, converter.getNodes())
        log.debug(`${feature}: Relationships ...`, converter.getRelationships())

        const neoData = converter.getNeo4jFormat({
            columns: ['user', 'entity'],
            nodes: converter.getNodes(),
            relationships: converter.getRelationships()
        })

        log.debug(`${feature}: NeoData for graph visual ...`, neoData)

        log.debug('Options', getOptions())
        setOptions(getOptions())
        setContextData(neoData)
        setLoading(false)

    }

    if (token.length && url.length && itemId.length) {
        const graph = new GraphGeneric(graphOps)
        return graph.service({ callback: handleResult, url: url.replace('{id}', itemId) })
    }
}

export default Neo4JGraphObject