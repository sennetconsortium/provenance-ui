import React from 'react'
import log from 'loglevel'
import $ from 'jquery'

function Toggle({ context, data, selectorId = 'provenanceTree', ariaLabel = 'Toggle', text='', className = ''}) {

    const toggleData = (e) => {
        const $el = $(e.currentTarget)
        const className = 'hide-activities'
        $el.toggleClass(className)
        if (context !== null) {
            context($el.hasClass(className), selectorId)
        }
    }

    return (
        <label className={`c-toggle ${className}`} >
            <span className='c-toggle__text'>{text}</span>
            <input type="checkbox" onClick={toggleData} />
            <span className="c-toggle__slider c-toggle__slider--round" aria-label={ariaLabel}></span>
        </label>
    )
}

export default Toggle