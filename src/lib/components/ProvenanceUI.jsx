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

        ProvenanceTree(`#${selectorId}`, {...options, data })
        if (!options.noStyles) {
            import (`../ProvenanceUI.css`)
        }
        addVisitedClass()
    }, []);

    return (
        <div className='c-provenance c-provenance--Tree' id={selectorId} style={{minHeight: options.minHeight || 800}}>
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
