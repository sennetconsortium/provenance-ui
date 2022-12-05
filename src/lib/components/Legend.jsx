import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import Toggle from './Toggle'
import { SELECTOR_ID } from '../js/constants'

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
        const selectors = {
            legendItem: '.js-legend__item',
            legendTrigger: '.js-legend--trigger',
            provenance: '.js-provenance'
        }

        const classFns = {
            add: 'addClass',
            remove: 'removeClass'
        }

        const getItem = (e) => {
            return $(e.currentTarget).parents(selectors.legendItem)
        }
        const toggleClass = (e, fn = 'addClass', className = 'has-hover') => {
            const $el = getItem(e)
            const node = $el.data('node')
            $el[fn](className).parent()[fn](className)
            $(`.node--${node}`)[fn](className)
            if (!($(`.node`).hasClass('has-hover') && fn === classFns.remove)) {
                $(selectors.provenance)[fn](className)
            }
        }

        $(selectors.legendTrigger).on('click', (e) => {
            e.stopPropagation()
            e.preventDefault()

            const fn = getItem(e).hasClass(stickClass) ? classFns.remove : classFns.add
            toggleClass(e, fn)
            toggleClass(e, fn, stickClass)
        })

        $(selectors.legendTrigger).on('mouseover', (e) => {
            if (!$(selectors.provenance).hasClass(stickClass)) toggleClass(e)
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