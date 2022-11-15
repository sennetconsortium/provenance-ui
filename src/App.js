import { useContext } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import Legend from './lib/components/Legend'
import sample from './data/sample'

function App() {
    const { contextData, options, loading } = useContext(AppContext)

    return (
        <div className={`c-App`}>
            { loading && <ProvenanceUI data={sample} /> }
            { !loading && contextData && <ProvenanceUI data={contextData} options={ options } /> }
            { options.colorMap && <Legend colorMap={options.colorMap} /> }
        </div>
    )
}

export default App