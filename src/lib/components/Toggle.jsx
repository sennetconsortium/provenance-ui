import React from 'react'
import NodeToggle from '../js/NodeToggle'
import log from 'loglevel'
import $ from 'jquery'

function Toggle({ context, data, label = 'Toggle', className = 'btn'}) {
    const toggleData = (e) => {
        const provenanceData = window.provenanceData

        if (provenanceData && provenanceData.all) {
            data = provenanceData.all
        } else {
            window.provenanceData = {
                all: JSON.parse(JSON.stringify(data))
            }
        }

        log.debug('Before toggle', data.results[0].data[0].graph)
        const $el =  $(e.currentTarget)
        const className = 'hide-activities'
        $el.toggleClass(className)
        const _data = Object.assign({}, data)

        if ($el.hasClass(className)) {
            if (window.provenanceData.filtered) {
                context(window.provenanceData.filtered, true)
            } else {
                const result = NodeToggle(_data.results[0].data[0].graph)
                log.debug('After toggle', result)
                _data.results[0].data[0].graph = result
                window.provenanceData.filtered = {... _data }
                context(_data, true)
            }
            
        } else {
            log.debug('Fixed After toggle', _data.results[0].data[0].graph)
            context(_data, false)
        }
    }
    return (
        <button className={className} onClick={toggleData}><span>{label}</span></button>
    )
}

export default Toggle