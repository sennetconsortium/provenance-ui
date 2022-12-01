import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import ProvenanceTree from '../js/ProvenanceTree'


function ProvenanceUI({ children, data, options = {} }) {
    const selectorId = options.selectorId || 'provenanceTree'
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

        if (!initialized.current) {
            initialized.current = true
            window.ProvenanceTreeD3 = window.ProvenanceTreeD3 || {}
            window.ProvenanceTreeD3[selectorId] = ProvenanceTree(`#${selectorId}`, {...options, data })
        }

        addVisitedClass()
    }, []);

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
