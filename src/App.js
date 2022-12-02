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
    }, [setData, contextData])

    const toggleData = (hideActivity, selectorId) => {
        const ui = window.ProvenanceTreeD3[selectorId]
        ui.toggleData({filter: hideActivity ? 'Activity' : '', parentKey: hideActivity ? DataConverterNeo4J.KEY_P_ENTITY : DataConverterNeo4J.KEY_P_ACT})
    }

    const toggleEdgeLabels = (hideActivity, selectorId) => {
        const ui = window.ProvenanceTreeD3[selectorId]
        ui.toggleEdgeLabels()
    }

    const actionMap = {
        Activity: {
            callback: toggleData,
            selectorId: 'provenanceTree',
            className: 'c-toggle--eye',
            ariaLabel: 'Toggle Activity Nodes'
        },
        Edge: {
            callback: toggleEdgeLabels,
            selectorId: 'provenanceTree',
            className: 'c-toggle--eye',
            ariaLabel: 'Toggle Edge Labels'
        }
    }

    return (
        <div className={`c-App`}>

            {/*{  <ProvenanceUI data={{root: sampleTree}} options={{...options, selectorId: 'graph--other'}} /> }*/}
            { !loading && data && <ProvenanceUI data={data} options={ options } /> }
            { options.colorMap && <Legend colorMap={{...options.colorMap, Edge: '#a5abb6'}} actionMap={actionMap}>

            </Legend> }

        </div>
    )
}

export default App