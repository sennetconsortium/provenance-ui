import { useContext, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

const Legend = ({ colorMap, filterNodes }) => {
    const [colors, setColors] = useState(colorMap)
    const [filterable, setFilterable] = useState(filterNodes)
    const loaded = useRef(false)
    const $previous = useRef(null)

    useEffect(() => {
        if (filterable && !loaded.current) setEvents()
    }, [])

    const setEvents = () => {
        loaded.current = true
        const stickClass = 'stickFilters'
        const selectors = {
            legendItem: '.js-legend__item',
            provenance: '.js-provenance'
        }

        const classFns = {
            add: 'addClass',
            remove: 'removeClass'
        }

        const toggleClass = (e, fn = 'addClass', className = 'has-hover') => {
            const $el = e ? $(e.currentTarget) : $previous.current
            if (className === stickClass) {
                $previous.current = e ? $el : null
            }
            const node = $el.data('node')
            $el[fn](className).parent()[fn](className)
            $(`.node--${node}`)[fn](className)
            $(selectors.provenance)[fn](className)
        }

        // $(selectors.legendItem).on('click', (e) => {
        //     e.stopPropagation()
        //     e.preventDefault()
        //
        //     const fn = $(e.currentTarget).hasClass(stickClass) ? classFns.remove : classFns.add
        //     let r = (fn === classFns.add) ? toggleClass(e) : toggleClass(e, classFns.remove)
        //     //if ($previous.current && $(e.currentTarget) !== $previous.current) toggleClass(null, classFns.remove, stickClass)
        //     toggleClass(e, fn, stickClass)
        // })

        $(selectors.legendItem).on('mouseover', (e) => {
            if (!$(selectors.provenance).hasClass(stickClass)) toggleClass(e)
        }).on('mouseleave', (e) => {
            if (!$(selectors.provenance).hasClass(stickClass)) toggleClass(e, 'removeClass')
        })
    }

    const buildLegend = () => {
        let result = [];
        for (let type in colors) {
            result.push(
                <li className='c-legend__item js-legend__item' key={`legend--${type}`} data-node={type}>
                    <span className={`c-legend__color c-legend__color--${type}`} style={{backgroundColor: colors[type]}}></span>
                    <span className='c-legend__label'>
                        <span>
                            {type}
                        </span>
                    </span>
                </li>
            )
        }
        return result;
    }

    return (
        <div className={`c-legend ${filterable ? 'c-legend--filterable' : ''}`}>
            {buildLegend()}
        </div>
    )
}

Legend.defaultProps = {
    filterNodes: true
}

Legend.propTypes = {
    colorMap: PropTypes.object.isRequired,
    filterNodes: PropTypes.bool
}

export default Legend