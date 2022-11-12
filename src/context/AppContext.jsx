import {createContext, useState, useEffect} from 'react'
import log from 'loglevel'
import NeoGraph from '../lib/js/NeoGraph'
import DataGraph from '../lib/js/DataGraph'
import Graph from '../lib/js/Graph'
import DataConverter from '../lib/js/DataConverter'
import dataMap from '../data/map.sample'

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [contextData, setContextData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState({})

    const getEnv = (key) => {
        return process.env[`REACT_APP_${key}`]
    }

    useEffect(() => {
        log.setLevel(getEnv('LOG_LEVEL'))
        const token = getEnv('API_TOKEN')
        const url = getEnv('API_URL')
        const itemId = getEnv('API_ITEM_ID')
        let ops = getEnv('OPTIONS')
        log.debug('Environment options', ops)
        try {
            if (ops) {
                setOptions(JSON.parse(ops))
            }
        } catch (e) {
            log.debug('Issue parsing options', e)
        }

        const graphOps = { token, url, keys: {neighbors: 'direct_ancestors'} }


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

            const continueVisual = (dataGraph) => {
                // Traverse graph data and create graph properties
                const neoGraph = new NeoGraph({... graphOps, getNeighbors, list: dataGraph.list, isNeo: true })
                //neoGraph.dfs(dataGraph.getResult()[])
                neoGraph.dfs(rawData)
                log.debug('NeoGraph', neoGraph.getResult())

                // Convert the data into a format usable by the graph visual, i.e. neo4j format
                const converter = new DataConverter(neoGraph.getResult(), dataMap)
                converter.reformatNodes()
                converter.reformatRelationships()

                const neoData = converter.getNeo4jFormat({
                    columns: ['user', 'entity'],
                    nodes: converter.getNodes(),
                    relationships: converter.getRelationships()
                })

                log.debug('NeoData for graph visual ...', neoData)
                setContextData(neoData)
                setLoading(false)
            }

            // Traverse the data and fetch all neighbors for each node.
            const dataGraph = new DataGraph({... graphOps, getNeighbors, continueVisual })
            await dataGraph.dfsWithPromise(rawData)
            log.debug('DataGraph', dataGraph.list)
            return dataGraph
        }
        if (token.length && url.length && itemId.length) {
            setLoading(true)
            const graph = new Graph(graphOps)
            graph.service({ callback: handleResult, url: url + itemId })
        }
    }, [])

    return (
        <AppContext.Provider
            value={{
                contextData,
                setContextData,
                loading,
                options
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
