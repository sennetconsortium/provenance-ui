import React from 'react'
import NodeToggle from '../js/NodeToggle'
import $ from 'jquery'

function Toggle({ context, data}) {
    const toggleData = (e) => {
        const $el =  $(e.currentTarget)
        const className = 'hide-activities'
        $el.toggleClass(className)
        if ($el.hasClass(className)) {
           const result = NodeToggle(data.results[0].data[0].graph)
           console.log('After toogle', result)
           data.results[0].data[0].graph = result
           context(data)
        
        }
    }
    return (
        <button onClick={toggleData}>Toggle</button>
    )
}

export default Toggle