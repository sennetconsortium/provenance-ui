import { useContext, useState } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import Legend from './lib/components/Legend'
import Toggle from './lib/components/Toggle'
import sample from './data/sample'

function App() {
    const { contextData, options, loading, setContextData } = useContext(AppContext)
    const [toggle, setToggle] = useState(false)

    const toggleData = (data) => {
        setToggle(true)
        setContextData(data)
    }

    return (
        <div className={`c-App`}>
            { loading && <ProvenanceUI data={sample} /> }
            { !loading && contextData && toggle && <ProvenanceUI data={contextData} options={ options } /> }
            { options.colorMap && <Legend colorMap={options.colorMap} /> }
            { !loading && contextData && <Toggle data={contextData} context={ toggleData } /> }
        </div>
    )
}

export default App