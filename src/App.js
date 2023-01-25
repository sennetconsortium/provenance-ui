import React, { useContext, useState, useEffect, useRef } from 'react'
import AppContext from './context/AppContext'
import ProvenanceUI from './lib/components/ProvenanceUI'
import Legend from './lib/components/Legend'
import DataConverterNeo4J from './lib/js/neo4j/DataConverterNeo4J'
import {SELECTOR_ID} from "./lib/js/constants";

function App() {
    const { contextData, options, loading } = useContext(AppContext)
    const [data, setData] = useState(null)
    const initialized = useRef(false)

    useEffect(() => {
        if (contextData !== null && (options.dontCheckInitialized || !initialized.current)) {
            initialized.current = true
            setData(contextData)
        }
    }, [setData, contextData])

    const toggleData = (e, hideActivity, selectorId) => {
        const ui = window.ProvenanceTreeD3[selectorId]

        ui.toggleData({filter: hideActivity ? 'Activity' : '', parentKey: hideActivity ? DataConverterNeo4J.KEY_P_ENTITY : DataConverterNeo4J.KEY_P_ACT})
    }

    const toggleEdgeLabels = (e, hideActivity, selectorId) => {
        const ui = window.ProvenanceTreeD3[selectorId]
        ui.toggleEdgeLabels()
    }

    const actionMap = {
        Activity: {
            callback: toggleData,
            className: 'c-toggle--eye',
            ariaLabel: 'Toggle Activity Nodes',
            disabled: true
        },
        Edge: {
            callback: toggleEdgeLabels,
            className: 'c-toggle--eye',
            ariaLabel: 'Toggle Edge Labels',
            visible: false
        }
    }

    return (
        <div className={`c-App`}>

            {/*{ !loading && data && <ProvenanceUI data={data} options={{...options, selectorId: 'graph--other'}} /> }*/}
            {/*{ options.colorMap && <Legend colorMap={{...options.colorMap, Edge: '#a5abb6'}} actionMap={actionMap} selectorId='graph--other' />}*/}
            { !loading && data && <ProvenanceUI data={data} options={ options } /> }
            { options.colorMap && <Legend colorMap={{...options.colorMap, Edge: '#a5abb6'}} className='c-legend--flex c-legend--btns' help={{title: 'Help, Provenance Graph', infoPanel: '<li>Some entities have different shapes.</li>'}} actionMap={actionMap} selectorId={SELECTOR_ID} />}


        </div>
    )
}

export default App