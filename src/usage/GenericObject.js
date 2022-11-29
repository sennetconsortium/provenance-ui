import DataGraphGeneric from '../lib/js/generic/DataGraphGeneric'
import GraphGeneric from '../lib/js/generic/GraphGeneric'
import log from 'loglevel'

async function  GenericObject(serviceOps) {
    const feature = 'generic';
    const { token, url, itemId, getOptions, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = { token, url, keys: {neighbors: 'direct_ancestors'} }
    let options = null;
    let data = null
    const handleResult = async (result) => {
        log.debug(`${feature}: Result from fetch`, result)

        const getNeighbors = (node) => {
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

            // TODO Update usage here. Use dataGraph.list to create hierarchy model

            setOptions(options)
            setContextData(data)
            setLoading(false)
        }

        // Traverse the data and fetch all neighbors for each node.
        const dataGraph = new DataGraphGeneric({... graphOps, getNeighbors, onDataAcquired })
        await dataGraph.dfsWithPromise(getRootNode())

        
    }
    if (token.length && url.length && itemId.length) {
        const graph = new GraphGeneric(graphOps)
        graph.service({ callback: handleResult, url: url.replace('{id}', itemId) })
    }

}

export default GenericObject