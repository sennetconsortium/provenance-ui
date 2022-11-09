import {createContext, useState, useEffect} from 'react'
import log from 'loglevel'

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [contextData, setContextData] = useState(null)

    const getEnv = (key) => {
        return process.env[`REACT_APP_${key}`]
    }

    useEffect(() => {
        log.setLevel(getEnv('LOG_LEVEL'))
        const token = getEnv('API_TOKEN')
        const url = getEnv('API_URL')
    }, [])

    return (
        <AppContext.Provider
            value={{
                contextData,
                setContextData
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
