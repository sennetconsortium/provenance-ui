import { useEffect, useState, useContext } from 'react'
import Neo4jd3 from './js/neo4jd3'
import sample from './data/sample'
import useD3 from './hooks/useD3'
import AppContext from './context/AppContext'
import PropTypes from 'prop-types';

/**
 *
 * @param ops Object<Object>
 *     @param ops.highlight Array<Object>
 *          @param ops.higlight.class String
 *          @param ops.highlight.property String
 *          @param ops.highlight.value String
 *     @param ops.noStyles Boolean Whether to set styles
 *     @param ops.colorMaps Object The color maps for each node class/type and hex code
 *     @param ops.setNodeLabels Boolean Whether to set labels on the nodes
 *
 * @param data Object
 * @param dataUrl String
 * @returns {JSX.Element}
 * @constructor
 */
function ProvenanceUI({ops = {}, data = null, dataUrl = null}) {
    const { contextData } = useContext(AppContext)
    useD3()
    const [graphData, setGraphData] = useState(data || contextData || sample)
    const [graphDataUrl, setDataUrl] = useState(dataUrl)

    useEffect(() => {
        if (!ops.noStyles) {
            import (`./ProvenanceUI.css`)
        }
        let neo4jd3 = new Neo4jd3('#neo4jd3', {
            highlight: ops.highlight || [
                {
                    class: 'Dataset',
                    property: 'sennet_id',
                    value: 'SNT264.VWKZ.629'
                }, {
                    class: 'Source',
                    property: 'sennet_id',
                    value: 'SNT385.FJPB.242'
                }
            ],
            setNodeLabels: (ops.setNodeLabels !== undefined) ? ops.setNodeLabels : true,
            colorMaps: ops.colorMaps || {
                "Dataset": "#8ecb93",
                "Activity": "#f16766",
                "Sample": "#ebb5c8",
                "Source": "#ffc255"
            },
            minCollision: 60,
            neo4jData: graphData,
            neo4jDataUrl: graphDataUrl,
            nodeRadius: 25,
            onNodeDoubleClick: function (node) {
                switch (node.action) {
                    case 'url':
                        window.open(node.properties.url, '_blank');
                        break;
                    default:
                        break;
                }
            },
            onRelationshipDoubleClick: function (relationship) {
                console.log('double click on relationship: ' + JSON.stringify(relationship));
            },
            zoomFit: true
        });

    }, [sample]);

    return (
        <div className='c-provenance'>
            <div id="neo4jd3"></div>
        </div>
    );
}

ProvenanceUI.propTypes = {
    ops: PropTypes.object,
    data: PropTypes.object,
    dataUrl: PropTypes.string
}

export default ProvenanceUI;
