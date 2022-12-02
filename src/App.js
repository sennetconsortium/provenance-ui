import React, { useContext, useState, useEffect, useRef } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import Legend from './lib/components/Legend'
import Toggle from './lib/components/Toggle'
import DataConverterNeo4J from "./lib/js/neo4j/DataConverterNeo4J";
import sampleTree from "./data/sample.tree";

function App() {
    const { contextData, options, loading } = useContext(AppContext)
    const [data, setData] = useState(null)
    const initialized = useRef(false)

    useEffect(() => {
        if (contextData !== null && !initialized.current) {
            initialized.current = true
            setData(contextData)
        }
    })

    const toggleData = (hideActivity, selectorId) => {
        const ui = window.ProvenanceTreeD3[selectorId]
        ui.toggleData({filter: hideActivity ? 'Activity' : '', parentKey: hideActivity ? DataConverterNeo4J.KEY_P_ENTITY : DataConverterNeo4J.KEY_P_ACT})
    }

    return (
        <div className={`c-App`}>
            {  <Toggle context={ toggleData } selectorId='graph--other' /> }
            {  <ProvenanceUI data={{root: sampleTree}} options={{...options, selectorId: 'graph--other'}} /> }
            {/*{ !loading && data && <ProvenanceUI data={data} options={ options } /> }*/}
            { options.colorMap && <Legend colorMap={options.colorMap} /> }

        </div>
    )
}

export default App