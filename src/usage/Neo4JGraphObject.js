import log from 'loglevel'
import GraphGeneric from '../lib/js/generic/GraphGeneric'
import DataConverterNeo4J from '../lib/js/neo4j/DataConverterNeo4J'
import $ from 'jquery'
import dataMap from '../data/neo4j/map.sample'

async function Neo4JGraphObject(serviceOps) {
    const feature = 'neo4j';
    const { token, url, getOptions, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = {  token, url }
    const itemId = 'ee13898b5fa54d1d0d1630a763cf996c' //'ed98c78f9abab37be52fcba09e0c4793'

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
        const imageMap = {
            "Sample|sennet:sample_category|organ": null,
            "Source": null,
        }
        const imageMapActions = {
            // "Sample|sennet:sample_category|organ": {
            //     color: "#ebb5c8",
            // showMain: true,
            // showMainGlow: true,
            //     type: 'rect'
            // },
            "Sample|sennet:sample_category|organ": {
                type: 'rect',
                height: 25,
                width: 50,
            },
            // "Source": {
            //     fn: 'append',
            //     color: "#ffc255",
            //     type: 'g',
            //     data: [
            //         {
            //             draw: 'm14.98,29.55C10.15,24.72,5.29,19.86.44,15.01,5.29,10.16,10.15,5.3,14.99.46c4.84,4.84,9.7,9.7,14.54,14.54-4.83,4.83-9.7,9.7-14.55,14.55Z'
            //         }
            //     ]
            // }
        }
        ops.propertyPrefixClear = 'sennet:'
        ops.displayEdgeLabels = false
        ops = { ...ops, highlight: [{id: itemId}], colorMap, imageMap, imageMapActions}
        setOptions(ops)
        setLoading(false)
    }

    if (url.length && itemId.length) {
        const graph = new GraphGeneric(graphOps)
        return graph.service({ callback: handleResult, url: url.replace('{id}', itemId) })
    }
}

export default Neo4JGraphObject