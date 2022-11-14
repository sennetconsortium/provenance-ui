import { useContext } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import Legend from './lib/components/Legend'
import sample from './data/sample'

function App() {
    const { contextData, options, loading } = useContext(AppContext)
    const colorMap = {
        "Dataset": "#8ecb93",
        "Activity": "#f16766",
        "Sample": "#ebb5c8",
        "Source": "#ffc255"
    }

    return (
        <div className={`c-App`}>
            { loading && <ProvenanceUI data={sample} /> }
            { !loading && contextData && <ProvenanceUI data={contextData} ops={ options } /> }
            <Legend colorMap={colorMap} />
        </div>
    )
}

export default App