import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import Toggle from './Toggle'
import {CLASS_NAMES, isEdge, SELECTOR_ID, SELECTORS} from '../js/constants'
import Swal from 'sweetalert2'
import helpHtml from './help.html'

const Legend = ({ children, colorMap, filterNodes, actionMap, selectorId, className, help }) => {
    const [colors] = useState(colorMap)
    const [filterable] = useState(filterNodes)

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
            title: `${help.title || help.label}`,
            html: help.text || helpHtml,
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

        $(`.c-legend--${selectorId}  ${selectors.legendTrigger}`).on('click', (e, data) => {
            e.stopPropagation()
            e.preventDefault()

            if (!getItem(e).hasClass(CLASS_NAMES.disabled) || data.force) {
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

        $(`.c-legend--${selectorId}  ${selectors.legendTrigger}`).on('mouseover', (e) => {
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
        for (let type in colors) {
            result.push(
                <li className={`c-legend__item c-legend__item--${type}  ${isHelp(type) ? '' : 'js-legend__item'} ${actionMap[type] && actionMap[type].disabled ? CLASS_NAMES.disabled : ''}`} key={`legend--${type}`} data-node={type}>
                    <span className={`c-legend__color ${isHelp(type) ? 'js-legend--help' : 'js-legend--trigger'} c-legend__color--${type}`}>
                        <span style={{backgroundColor: colors[type]}}>
                            {isHelp(type) && <i className='fa fa-question-circle-o' role='presentation'></i>}
                        </span>
                    </span>
                    <span className='c-legend__label'>
                        <span className={`c-legend__label__text ${isHelp(type) ? 'js-legend--help' : 'js-legend--trigger'}`}>
                            {type}
                        </span>
                        { actionMap[type] &&
                            <Toggle context={ actionMap[type].callback } selectorId={actionMap[type].selectorId || selectorId} className={`c-legend__action ${actionMap[type].className}`} disabled={actionMap[type].disabled} ariaLabel={actionMap[type].ariaLabel} />
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

Legend.defaultProps = {
    filterNodes: true,
    help: {},
    actionMap: {},
    selectorId: SELECTOR_ID,
    className: ''
}

Legend.propTypes = {
    colorMap: PropTypes.object.isRequired,
    help: PropTypes.object,
    actionMap: PropTypes.object,
    children: PropTypes.object,
    filterNodes: PropTypes.bool,
    selectorId: PropTypes.string,
    className: PropTypes.string
}

export default Legend