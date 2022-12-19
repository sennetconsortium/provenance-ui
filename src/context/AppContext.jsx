import { createContext, useState, useEffect, useRef } from 'react'
import log from 'loglevel'

import GenericObject from '../usage/GenericObject'
import Neo4JGraphObject from '../usage/Neo4JGraphObject'

const AppContext = createContext()

/**
 * This sets up an example for usage and testing by developer. Use the .env to pass in values.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */

export const AppProvider = ({ children }) => {
    const [contextData, setContextData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState({})
    const initialized = useRef(false)

    const getEnv = (key) => {
        return process.env[`REACT_APP_${key}`]
    }

    useEffect(() => {
        if (initialized.current) return
        initialized.current = true
        log.setLevel(getEnv('LOG_LEVEL') || 'silent')
        const token = getEnv('API_TOKEN')
        const url = getEnv('API_URL')
        const itemId = getEnv('API_ITEM_ID')
        const feature = getEnv('API_FEATURE')

        const getOptions = () => {
            let ops = getEnv('OPTIONS')
            log.debug('Environment options', ops)
            try {
                if (ops) {
                    return JSON.parse(ops)
                }
            } catch (e) {
                log.debug('Issue parsing options', e)
            }

            return {
                simulation: { charge: -100 },
                minHeight: 600,
                idNavigate: {
                    props: ['sennet:uuid', 'sennet:protocol_url'],
                    url: 'http://localhost:3000/{subType}?uuid={id}',
                    exclude: { Activity: ['sennet:uuid'] }
                }
            }
        }

        const handleFeature = async (fn) => {
            setLoading(true)
            await fn({
                token,
                url,
                itemId,
                getOptions,
                setOptions,
                setContextData,
                setLoading
            })
        }

        if (feature === 'generic') {
            handleFeature(GenericObject)
        } else if (feature === 'neo4j') {
            handleFeature(Neo4JGraphObject)
        } else {
            console.error('Current features are generic or neo4j.')
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
