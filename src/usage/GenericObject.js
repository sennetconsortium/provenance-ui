import DataGraphGeneric from '../lib/js/generic/DataGraphGeneric'
import GraphGeneric from '../lib/js/generic/GraphGeneric'
import log from 'loglevel'
import dataMap from "../data/generic/map.sample";
import DataConverterGeneric from '../lib/js/generic/DataConverterGeneric'

async function  GenericObject(serviceOps) {
    const feature = 'generic';
    const { token, url, itemId, getOptions, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = { token, url, keys: {neighbors: 'direct_ancestors'} }
    let data = null

    const getServiceOptions = (id, url) => {
        const body =  JSON.stringify({"query":{"bool":{"must":{"match":{"uuid":id}}}}})
        return {url: url.replace('{id}', id), id, body: body, method: 'POST'}
    }

    const onAfterServiceResolveResult = (result) => {
        const r = result.hits.hits[0]
        if (r) {
            return r._source
        } else {
            return result
        }
    }

    const handleResult = async (result) => {
        result = onAfterServiceResolveResult(result)
        log.debug(`${feature}: Result from fetch`, result)

        const getNeighbors = (node) => {
            if (!node) return []
            let neighbors = node[graphOps.keys.neighbors]
            if (!neighbors) {
                neighbors = node['direct_ancestor'] ? [node['direct_ancestor']] : []
            }
            return neighbors
        }

        const getRootNode = () => {
            return result.length ? result[0] : result
        }

        const onDataAcquired = (dataGraph) => {

            log.debug(`${feature}: DataGraph`, dataGraph.list)

            const converter = new DataConverterGeneric(dataGraph.root, dataMap, {list: dataGraph.list, getNeighbors, getServiceOptions})
            converter.stratify()
            data = {root: converter.list[itemId]}

            log.debug(`${feature}: For visual`, data)

            let ops = getOptions()
            const colorMap = {
                "Dataset": "#8e98cb",
                "Sample": "#ebb5c8",
                "Source": "#ffc255"
            }
            const onEdgeLabel = (d) => {
                return 'USED'
            }
            const callbacks = {
                onEdgeLabel
            }
            ops = { ...ops, reverseRelationships: false, reverseEdgeLabels: false, callbacks, dontCheckInitialized: true, highlight: [{id: itemId}], colorMap}

            setOptions(ops)
            setContextData(data)
            setLoading(false)
        }

        // Traverse the data and fetch all neighbors for each node.
        const dataGraph = new DataGraphGeneric({...graphOps, getNeighbors, onDataAcquired, onAfterServiceResolveResult, getServiceOptions })
        await dataGraph.dfsWithPromise(getRootNode())
    }

    if (token.length && url.length && itemId.length) {
        const graph = new GraphGeneric(graphOps)
        const serviceOps = getServiceOptions(itemId, url)
        serviceOps.callback = handleResult
        await graph.service(serviceOps)
    }

}

export default GenericObject