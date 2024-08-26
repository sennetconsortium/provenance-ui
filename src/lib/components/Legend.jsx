import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import Toggle from './Toggle'
import {CLASS_NAMES, isEdge, SELECTOR_ID, SELECTORS} from '../js/constants'
import Swal from 'sweetalert2'
import useHelpHtml from '../hooks/useHelpHtml'

const Legend = ({ children, colorMap, filterNodes = true, actionMap = {}, selectorId = SELECTOR_ID, className = '', help = {}, otherLegend = {} }) => {
    const [colors] = useState(colorMap)
    const [filterable] = useState(filterNodes)
    const { html } = useHelpHtml(help)

    const loaded = useRef(false)

    useEffect(() => {
        if (filterable && !loaded.current) setEvents()
    })

    const showHelp = () => {
        Swal.fire({
            customClass: {
                container: 'c-help',
                title: 'c-help__title',
                confirmButton: 'c-help__btn'
            },
            width: help.width || 700,
            title: `${help.title || help.label}`,
            html: html,
            showCloseButton: true,
            confirmButtonText: 'Close'
        })
    }

    const setEvents = () => {
        loaded.current = true
        const stickClass = 'has-activeFilters'
        const selectors = SELECTORS.legend

        const classFns = {
            add: 'addClass',
            remove: 'removeClass'
        }

        const getItem = (e) => {
            return $(e.currentTarget).parents(selectors.legendItem)
        }

        const toggleClass = (e, fn = 'addClass', className = CLASS_NAMES.hover) => {
            const $el = getItem(e)
            const node = $el.data('node')
            $el[fn](className).parent()[fn](className)
            $(`#${selectorId} .node--${node}`)[fn](className)

            if (isEdge($el)) {
                $(`#${selectorId}`).find('.links, #arrowhead')[fn](className)
            }
            if (!($(`#${selectorId} .node`).hasClass(CLASS_NAMES.hover) && fn === classFns.remove)) {
                $(`#${selectorId}`)[fn](className)
            }
        }
        const $trigger = $(`.c-legend--${selectorId}  ${selectors.legendTrigger}`)
        $trigger.on('click', (e, data) => {
            e.stopPropagation()
            e.preventDefault()

            if (!getItem(e).hasClass(CLASS_NAMES.disabled) || data?.force) {
                const fn = getItem(e).hasClass(stickClass) ? classFns.remove : classFns.add
                toggleClass(e, fn)
                toggleClass(e, fn, stickClass)

                try {
                    const node = getItem(e).data('node')
                    if (fn === classFns.remove) {
                        delete window.ProvenanceTreeD3[selectorId].legendFilters[node]
                    } else {
                        window.ProvenanceTreeD3[selectorId].legendFilters[node] = true
                    }
                } catch (e) {
                    console.error(e)
                }
            }

        })

        $trigger.on('mouseover', (e) => {
            if (!getItem(e).hasClass(CLASS_NAMES.disabled)) {
                if (!$(`#${selectorId}`).hasClass(stickClass)) toggleClass(e)
            }
        }).on('mouseleave', (e) => {
            if (!$(`#${selectorId}`).hasClass(stickClass)) toggleClass(e, 'removeClass')
        })

        $(`.c-legend--${selectorId} .js-legend--help`).on('click', (e) => {
            showHelp()
        })
    }

    const buildLegend = () => {
        let result = []
        let helpLabel
        if (help) {
            help.label = helpLabel = help.label || 'Help'
            colors[help.label] = 'transparent'
        }
        const isHelp = (key) => key === helpLabel
        const isOther = (key) => otherLegend[key] !== undefined
        const isHelpOrOther = (key) => isHelp(key) || isOther(key)
        const getColor = (key) => (typeof colors[key] === 'string') ? colors[key] : (colors[key].color || 'transparent')
        const keyToClassName = (key) => key.replaceAll(' ', '-')
        const getJsClassName = (key) => isHelp(key) ? 'js-legend--help' : isOther(key) ? `js-legend--${keyToClassName(key)}` : 'js-legend--trigger'
        const getTitle = (key) => isOther(key) && otherLegend[key].title ? otherLegend[key].title : null

        let action
        $.extend(colors, otherLegend)
        for (let key in colors) {
            action = actionMap[key]
            result.push(
                <li className={`c-legend__item c-legend__item--${keyToClassName(key)}  ${isHelpOrOther(key) ? '' : 'js-legend__item'} ${action && action.disabled ? CLASS_NAMES.disabled : ''}`}
                    key={`legend--${key}`} data-node={key} onClick={isOther(key) && otherLegend[key].callback ? (e) => otherLegend[key].callback(e, selectorId, key) : null} title={getTitle(key)}>
                    <span className={`c-legend__color ${getJsClassName(key)} c-legend__color--${keyToClassName(key)}`}>
                        <span style={{backgroundColor: getColor(key)}}>
                            {isHelp(key) && <i className='fa fa-question-circle-o' role='presentation'></i>}
                            {isOther(key) && otherLegend[key].icon && <i className={`fa ${otherLegend[key].icon}`} role='presentation'></i>}
                        </span>
                    </span>
                    <span className='c-legend__label'>
                        <span className={`c-legend__label__text ${getJsClassName(key)}`}>
                            {colors[key].name ? colors[key].name : key}
                        </span>
                        { action &&
                            <Toggle context={ action.callback } selectorId={action.selectorId || selectorId} className={`c-legend__action ${action.className}`}
                                    disabled={action.visible !== undefined ? !action.visible : action.disabled} ariaLabel={action.ariaLabel} />
                        }
                    </span>
                </li>
            )
        }

        return result;
    }

    return (
        <div className={`c-legend c-legend--${selectorId} ${filterable ? 'c-legend--filterable' : ''} ${className}`}>
            <ul>
                {buildLegend()}
                {children}
            </ul>
        </div>
    )
}

Legend.propTypes = {
    colorMap: PropTypes.object.isRequired,
    help: PropTypes.object,
    otherLegend: PropTypes.object,
    actionMap: PropTypes.object,
    children: PropTypes.object,
    filterNodes: PropTypes.bool,
    selectorId: PropTypes.string,
    className: PropTypes.string
}

export default Legend