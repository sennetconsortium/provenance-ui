import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

function ProvenanceUI({ children, data, options = {}, dataUrl = null }) {
    const selectorId = options.selectorId || 'neo4jd3'

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
    }, []);

    return (
        <div className='c-provenance js-provenance'>
            <div id={selectorId}></div>
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
