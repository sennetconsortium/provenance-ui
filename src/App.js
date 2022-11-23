import { useContext, useState, useEffect } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import Legend from './lib/components/Legend'
import Toggle from './lib/components/Toggle'
import sample from './data/sample'
import ProvenanceTree from './lib/js/ProvenanceTree'

function App() {
    const { contextData, options, loading } = useContext(AppContext)
    const [data, setData] = useState(null)

    useEffect(() => {
        setData(contextData)
        let svg = ProvenanceTree('#provenanceTree', {})
        console.log(svg)
        import (`./lib/ProvenanceUI.css`)
    })

    const toggleData = (data, isFiltered) => {
        setData(data)
        const ui = window.ProvenanceUId3
        const charge = ui.options.simulation.charge
        ui.setCharge(isFiltered ? charge * 4 : charge)
        ui.setTransition(true)
        ui.clearCanvas()
        ui.updateWithNeo4jData(data)
    }

    return (
        <div className={`c-App`}>

            <div className='c-provenance c-provenance--Tree' id='provenanceTree'></div>
            {/*{  <ProvenanceUI data={sample} /> }*/}
            {/*{ !loading && data && <ProvenanceUI data={data} options={ options } /> }*/}
            {/*{ options.colorMap && <Legend colorMap={options.colorMap} /> }*/}
            {/*{ !loading && data && <Toggle data={data} context={ toggleData } /> }*/}
        </div>
    )
}

export default App