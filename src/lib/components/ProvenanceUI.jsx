import React, { useEffect, useState } from 'react'
import Neo4jd3 from '../js/neo4jd3'
import useD3 from '../hooks/useD3'
import PropTypes from 'prop-types';

/**
 *
 * @param data Object Required if no dataUrl is provided
 * @param dataUrl String Required if no data is provided
 * @param ops Object<Object>
 *     @param ops.highlight Array<Object>
 *          @param ops.higlight.class String
 *          @param ops.highlight.property String
 *          @param ops.highlight.value String
 *     @param ops.noStyles Boolean Whether to set styles
 *     @param ops.colorMaps Object The color maps for each node class/type and hex code
 *     @param ops.setNodeLabels Boolean Whether to set labels on the nodes
 *     @param ops.idNavigate Object Url settings for the entity id property
 *          @param ops.idNavigate.url The url 
 *          @param ops.idNavigate.prop The name of the id property in the dataset
 *     @param ops.onNodeDoubleClick Function Pass a custom function to run on double click of a node
 *     @param ops.onRelationshipDoubleClick Function Pass a custom function to run on double click of an edge/relationship
 *     @param ops.nodeRadius Integer
 * @returns {JSX.Element}
 * @constructor
 */
function ProvenanceUI({ data, ops = {}, dataUrl = null }) {

    useD3()
    const [graphData, setGraphData] = useState(data)
    const [graphDataUrl, setDataUrl] = useState(dataUrl)

    useEffect(() => {
        if (!ops.noStyles) {
            import (`../ProvenanceUI.css`)
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
            idNavigate: ops.idNavigate || { prop: '' },
            minCollision: ops.minCollison || 60,
            neo4jData: graphData,
            neo4jDataUrl: graphDataUrl,
            nodeRadius: ops.nodeRadius || 25,
            onNodeDoubleClick: ops.onNodeDoubleClick || function (node) {
                switch (node.action) {
                    case 'url':
                        window.open(node.properties.url, '_blank');
                        break;
                    default:
                        break;
                }
            },
            onRelationshipDoubleClick: ops.onRelationshipDoubleClick || function (relationship) {
                // console.log('double click on relationship: ' + JSON.stringify(relationship));
            },
            zoomFit: ops.zoomFit || false
        });
        window.ProvenanceUId3 = neo4jd3
    }, []);

    return (
        <div className='c-provenance js-provenance'>
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
