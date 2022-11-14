import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function Legend({ colorMap }) {
    const [colors, setColors] = useState(colorMap)

    useEffect(() => {
    }, [])

    const buildLegend = () => {
        let result = [];
        for (let type in colors) {
            result.push(
                <li key={`legend--${type}`}>
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