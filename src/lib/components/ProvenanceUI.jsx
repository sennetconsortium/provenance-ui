import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import ProvenanceTree from '../js/ProvenanceTree'
import useD3 from '../hooks/useD3'
import { SELECTOR_ID } from '../js/constants'

function ProvenanceUI({ children, data, options = {} }) {
    const { d3, error, loading } = useD3()
    const selectorId = options.selectorId || SELECTOR_ID
    const initialized = useRef(false)

    const addVisitedClass = () => {
        $(`#${selectorId}`).on('click', '.node', function(e) {
            $(e.currentTarget).addClass('is-visited')
        })
    }

    useEffect(() => {
        if (!options.noStyles) {
            import (`../ProvenanceUI.css`)
        }
        
        addVisitedClass()
    });

    if ((options.dontCheckInitialized || !initialized.current) && !loading && !error) {
        initialized.current = true
        window.ProvenanceTreeD3 = window.ProvenanceTreeD3 || {}
        window.ProvenanceTreeD3[selectorId] = ProvenanceTree(d3,`#${selectorId}`, {...options, data })
        if (options.callbacks?.onInitializationComplete) {
            options.callbacks.onInitializationComplete(selectorId)
        }
    }

    return (
        <div className='c-provenance c-provenance--Tree js-provenance' id={selectorId} style={{minHeight: options.minHeight || 300}}>
            {children}
        </div>
    );
}

ProvenanceUI.propTypes = {
    options: PropTypes.object,
    data: PropTypes.object,
    dataUrl: PropTypes.string,
    children: PropTypes.node
}

export default ProvenanceUI;
