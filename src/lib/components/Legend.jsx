import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import Toggle from './Toggle'
import {CLASS_NAMES, COMPS, isEdge, SELECTOR_ID, SELECTORS} from '../js/constants'

const Legend = ({ children, colorMap, filterNodes, actionMap, selectorId }) => {
    const [colors] = useState(colorMap)
    const [filterable] = useState(filterNodes)
    const loaded = useRef(false)

    useEffect(() => {
        if (filterable && !loaded.current) setEvents()
    })

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
            $(`.node--${node}`)[fn](className)

            if (isEdge($el)) {
                $(`#${selectorId}`).find('.links, #arrowhead')[fn](className)
            }
            if (!($(`.node`).hasClass(CLASS_NAMES.hover) && fn === classFns.remove)) {
                $(selectors.provenance)[fn](className)
            }
        }

        $(selectors.legendTrigger).on('click', (e, data) => {
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

        $(selectors.legendTrigger).on('mouseover', (e) => {
            if (!getItem(e).hasClass(CLASS_NAMES.disabled)) {
                if (!$(selectors.provenance).hasClass(stickClass)) toggleClass(e)
            }
        }).on('mouseleave', (e) => {
            if (!$(selectors.provenance).hasClass(stickClass)) toggleClass(e, 'removeClass')
        })
    }

    const buildLegend = () => {
        let result = [];
        for (let type in colors) {
            result.push(
                <li className={`c-legend__item c-legend__item--${type} js-legend__item`} key={`legend--${type}`} data-node={type}>
                    <span className={`c-legend__color js-legend--trigger c-legend__color--${type}`} style={{backgroundColor: colors[type]}}></span>
                    <span className='c-legend__label'>
                        <span className='c-legend__label__text js-legend--trigger'>
                            {type}
                        </span>
                        { actionMap[type] &&
                            <Toggle context={ actionMap[type].callback } selectorId={actionMap[type].selectorId || selectorId} className={`c-legend__action ${actionMap[type].className}`} ariaLabel={actionMap[type].ariaLabel} />
                        }
                    </span>
                </li>
            )
        }
        return result;
    }

    return (
        <div className={`c-legend ${filterable ? 'c-legend--filterable' : ''}`}>
            <ul>
                {buildLegend()}
                {children}
            </ul>
        </div>
    )
}

Legend.defaultProps = {
    filterNodes: true,
    actionMap: {},
    selectorId: SELECTOR_ID
}

Legend.propTypes = {
    colorMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object,
    children: PropTypes.object,
    filterNodes: PropTypes.bool,
    selectorId: PropTypes.string
}

export default Legend