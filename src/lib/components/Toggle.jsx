import React from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import {CLASS_NAMES, isEdge, SELECTOR_ID, SELECTORS} from '../js/constants'

function Toggle({ context, icon, selectorId, ariaLabel, text, className}) {

    const toggleData = (e) => {
        const $el = $(e.currentTarget)
        const toggled = CLASS_NAMES.toggled
        $el.toggleClass(toggled)
        const $p = $el.parents(SELECTORS.legend.legendItem)
        if (!isEdge($p)) {
            $p.toggleClass(CLASS_NAMES.disabled)
        }
        const $trigger = $p.find(SELECTORS.legend.legendTrigger)
        if (!isEdge($p) && $p.hasClass(CLASS_NAMES.hover)) {

            $trigger.eq(0).trigger('click', {force: true})
        }
        if (context !== null) {
            context(e, $el.hasClass(toggled), selectorId)
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

Toggle.defaultProps = {
    icon: true,
    selectorId: SELECTOR_ID,
    ariaLabel: 'Toggle',
    text: '',
    className: ''
}

Toggle.propTypes = {
    context: PropTypes.func,
    icon: PropTypes.bool,
    selectorId: PropTypes.string,
    ariaLabel: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string
}

export default Toggle