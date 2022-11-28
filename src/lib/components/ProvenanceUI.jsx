import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import ProvenanceTree from '../js/ProvenanceTree'

function ProvenanceUI({ children, data, options = {} }) {
    const selectorId = options.selectorId || 'provenanceTree'

    const addVisitedClass = () => {
        $(`#${selectorId}`).on('click', '.node', function(e) {
            $(e.currentTarget).addClass('is-visited')
        })
    }

    useEffect(() => {
        if (!options.noStyles) {
            import (`../ProvenanceUI.css`)
        }

        window.ProvenanceTreeD3 = ProvenanceTree(`#${selectorId}`, {...options, data })

        addVisitedClass()
    }, []);

    return (
        <div className='c-provenance c-provenance--Tree js-provenance' id={selectorId} style={{minHeight: options.minHeight || 500}}>
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
