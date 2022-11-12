import { useContext } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import sample from './data/sample'

function App() {
    const { contextData, options, loading } = useContext(AppContext)

    return (
        <div className={`c-App`}>
            { loading && <ProvenanceUI data={sample} /> }
            { !loading && contextData && <ProvenanceUI data={contextData} ops={ options } /> }
        </div>
    )
}

export default App