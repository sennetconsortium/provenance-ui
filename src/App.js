import { useContext } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import sample from './data/sample'

function App() {
    const { contextData, options } = useContext(AppContext)

    return (
        <div className={`c-App`}>
            <ProvenanceUI data={sample} />
            { contextData && <ProvenanceUI data={contextData} ops={ options } /> }
        </div>
    )
}

export default App