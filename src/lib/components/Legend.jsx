import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

function Legend({ colorMap }) {
    const [colors, setColors] = useState(colorMap)

    useEffect(() => {
        setEvents()
    }, [])

    const setEvents = () => {
        const toggleClass = (e, fn = 'addClass') => {
            const hoverClass = 'has-hover'
            const $el = $(e.currentTarget)
            const node = $el.data('node')
            $el[fn](hoverClass).parent()[fn](hoverClass)
            $(`.node--${node}`)[fn](hoverClass)
            $('.js-provenance')[fn](hoverClass)
        }

        $('.js-legend__item').on('mouseover', (e) => {
            toggleClass(e)
        }).on('mouseleave', (e) => {
            toggleClass(e, 'removeClass')
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
        <div className={`c-legend`}>
            {buildLegend()}
        </div>
    )
}

Legend.propTypes = {
    colorMap: PropTypes.object.isRequired
}

export default Legend