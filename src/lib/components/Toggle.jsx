import React from 'react'
import $ from 'jquery'

function Toggle({ context, icon = true, selectorId = 'provenanceTree', ariaLabel = 'Toggle', text='', className = ''}) {

    const toggleData = (e) => {
        const $el = $(e.currentTarget)
        const className = 'has-toggled'
        $el.toggleClass(className)
        if (context !== null) {
            context($el.hasClass(className), selectorId)
        }
    }

    return (
        <label className={`c-toggle ${className}`} >

            {!icon &&
                <>
                <span className='c-toggle__text'>{text}</span>
                    <span className='c-toggle__main'>
                    <input type="checkbox" onClick={toggleData} />
                    <span className="c-toggle__slider c-toggle__slider--round" aria-label={ariaLabel}></span>
                </span>
                </>
            }
            {icon && <>
                <span className={`c-toggle__icon fa fa-eye`} aria-label={ariaLabel} onClick={toggleData} title={ariaLabel}></span>
            </> }

        </label>
    )
}

export default Toggle