import NeoGraphGeneric from '../lib/js/generic/NeoGraphGeneric'
import DataGraphGeneric from '../lib/js/generic/DataGraphGeneric'
import GraphGeneric from '../lib/js/generic/GraphGeneric'
import DataConverterGeneric from '../lib/js/generic/DataConverterGeneric'
import dataMap from '../data/generic/map.sample'
import log from 'loglevel'

async function  GenericObject(serviceOps) {
    const { token, url, itemId, getOptions, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = { token, url, keys: {neighbors: 'direct_ancestors'} }
    let options = null;
    let data = null
    const handleResult = async (result) => {

        const rawData = result.descendants ? (!result.descendants.length ? result : result.descendants) : result
        log.debug('Result from fetch', result)
        log.debug('Raw data', rawData)
        const getNeighbors = (node) => {
            let neighbors = node[graphOps.keys.neighbors]
            if (!neighbors) {
                neighbors = node['direct_ancestor'] ? [node['direct_ancestor']] : []
            }
            return neighbors
        }

        const onDataAcquired = (dataGraph) => {
            // delete dataGraph.list[undefined]
            // console.log('undefined', dataGraph.list[undefined])
            log.debug('DataGraph', dataGraph.list)

            // Traverse graph data and create graph properties
            const neoGraph = new NeoGraphGeneric({... graphOps, getNeighbors, list: dataGraph.list })
            neoGraph.dfs(rawData.length ? rawData[0] : rawData)
            log.debug('NeoGraph', neoGraph.getResult())

            // Convert the data into a format usable by the graph visual, i.e. neo4j format
            const converter = new DataConverterGeneric(neoGraph.getResult(), dataMap, dataGraph.list)
            converter.reformatNodes()
            converter.reformatRelationships()

            const neoData = converter.getNeo4jFormat({
                columns: ['user', 'entity'],
                nodes: converter.getNodes(),
                relationships: converter.getRelationships()
            })

            log.debug('NeoData for graph visual ...', neoData)

            const neighbors = getNeighbors(result)
            let highlight = [{
                class: result[dataMap.highlight.labels],
                property: dataMap.highlight.prop,
                value: result[dataMap.highlight.prop]
            }]
            for (let n of neighbors ) {
                highlight.push({
                    class: n[dataMap.highlight.labels],
                    property: dataMap.highlight.prop,
                    isSecondary: true,
                    value: n[dataMap.highlight.prop]
                })
            }
            const colorMap = {
                "Dataset": "#8ecb93",
                "Activity": "#f16766",
                "Sample": "#ebb5c8",
                "Source": "#ffc255"
            }
            const ops =  {...getOptions(), highlight, colorMap}
            log.debug('Options', ops)
            options = ops;
            data = neoData
            setOptions(options)
            setContextData(data)
            setLoading(false)
            return {data, options}
        }

        // Traverse the data and fetch all neighbors for each node.
        const dataGraph = new DataGraphGeneric({... graphOps, getNeighbors, onDataAcquired })
        let dataResult = await dataGraph.dfsWithPromise(rawData.length ? rawData[0] : rawData)
        return dataResult
    }
    if (token.length && url.length && itemId.length) {
        const graph = new GraphGeneric(graphOps)
        return graph.service({ callback: handleResult, url: url + itemId })
    }

}

export default GenericObject