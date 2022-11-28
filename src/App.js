import { useContext, useState, useEffect } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import Legend from './lib/components/Legend'
import Toggle from './lib/components/Toggle'
import ProvenanceTree from './lib/js/ProvenanceTree'

function App() {
    const { contextData, options, loading } = useContext(AppContext)
    const [data, setData] = useState(null)

    useEffect(() => {
        setData(contextData)
        // let svg = ProvenanceTree('#provenanceTree', {})
        // console.log(svg)
        // import (`./lib/ProvenanceUI.css`)
    })

    const toggleData = (data, isFiltered) => {
        setData(data)
        const ui = window.ProvenanceTreeD3
    }

    return (
        <div className={`c-App`}>

            {/*{  <ProvenanceUI data={sample} /> }*/}
            { !loading && data && <ProvenanceUI data={data} options={ options } /> }
            { options.colorMap && <Legend colorMap={options.colorMap} /> }
            {/*{ !loading && data && <Toggle data={data} context={ toggleData } /> }*/}
        </div>
    )
}

export default App