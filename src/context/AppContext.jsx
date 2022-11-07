import { createContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [data, setData] = useState()
  return (
    <AppContext.Provider
      value={{
        data,
        setData
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
