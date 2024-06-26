import log from 'loglevel'
import GraphGeneric from '../lib/js/generic/GraphGeneric'
import DataConverterNeo4J from '../lib/js/neo4j/DataConverterNeo4J'
import $ from 'jquery'
import dataMap from '../data/neo4j/map.sample'

async function Neo4JGraphObject(serviceOps) {
    const feature = 'neo4j';
    const { token, url, getOptions, itemId, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = {  token, url }

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
            "Sample|sennet:sample_category|Organ": '/images/shapes/triangle.svg',
            "Dataset|sennet:creation_action|Multi-Assay Split": null,
            "Source": null,
        }
        const imageMapActions = {
            "Sample|sennet:sample_category|Organ": {
                fn: 'append',
                type: 'image',
                color: '#ff0000',
                showMain: true,
                showMainGlow: true,
            },
            "Dataset|sennet:creation_action|Multi-Assay Split": {
                fn: 'append',
                color: '#00ff00',
                type: 'g',
                data: [
                    {
                        tag: 'polygon',
                        property: 'points',
                        draw: '1,27.9 15,1.1 29,27.9'
                    }
                ]
            }
            // "Sample|sennet:sample_category|Organ": {
            //     type: 'rect',
            //     height: 25,
            //     width: 50,
            // },
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
        ops = { ...ops, highlight: [{id: itemId}], colorMap, imageMap, imageMapActions, initParentKey: DataConverterNeo4J.KEY_P_ENTITY}
        setOptions(ops)
        setLoading(false)
    }

    if (url.length && itemId.length) {
        const graph = new GraphGeneric(graphOps)
        return graph.service({ callback: handleResult, url: url.replace('{id}', itemId), headers: serviceOps.getOptions().headers  })
    }
}

export default Neo4JGraphObject