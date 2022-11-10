import {createContext, useState, useEffect} from 'react'
import log from 'loglevel'
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
        let ops = getEnv('OPTIONS')
        log.debug('Environment options', ops)
        try {
            if (ops) {
                setOptions(JSON.parse(ops))
            }
        } catch (e) {
            log.debug('Issue parsing options', e)
        }


        let graph = new Graph({ token, url })
        const handleResult = (result) => {
            graph.dfs(result)
            log.debug('Graph', graph.getResult())
            const converter = new DataConverter(graph.getResult(), dataMap)
            converter.reformatNodes()
            converter.reformatRelationships()
            const neoData = converter.getNeo4jFormat({
                columns: ['user', 'entity'],
                nodes: converter.getNodes(),
                relationships: converter.getRelationships()
            })
            log.debug('Data', neoData)
            setContextData(neoData)
        }
        if (token.length && url.length) {
            setLoading(true)

            graph.service({ callback: handleResult })
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
