import { useContext } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import sample from './data/sample'

function App() {
    const { contextData } = useContext(AppContext)

    return (
        <div className={`c-App`}>
            <ProvenanceUI data={contextData || sample} />
        </div>
    )
}

export default App