import React, { useEffect, useState } from 'react'
import Neo4jd3 from '../js/neo4jd3'
import useD3 from '../hooks/useD3'
import PropTypes from 'prop-types'
import $ from 'jquery'

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
function ProvenanceUI({ children, data, options = {}, dataUrl = null }) {
    useD3()
    const selectorId = options.selectorId || 'neo4jd3'

    const addVisitedClass = () => {
        $(`#${selectorId}`).on('click', '.node', function(e) {
            $(e.currentTarget).addClass('is-visited')
        })
    }

    useEffect(() => {
        if (!options.noStyles) {
            import (`../ProvenanceUI.css`)
        }
        let neo4jd3 = new Neo4jd3(`#${selectorId}`, {
            highlight: options.highlight || [
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
            setNodeLabels: (options.setNodeLabels !== undefined) ? options.setNodeLabels : true,
            colorMaps: options.colorMaps || {
                "Dataset": "#8ecb93",
                "Activity": "#f16766",
                "Sample": "#ebb5c8",
                "Source": "#ffc255"
            },
            simulation: options.simulation || {simulation: { charge: -250 }},
            idNavigate: options.idNavigate || { prop: '' },
            minCollision: options.minCollison || 40,
            neo4jData: data,
            neo4jDataUrl: dataUrl,
            nodeRadius: options.nodeRadius || 18,
            onNodeDoubleClick: options.onNodeDoubleClick || function (node) {
                switch (node.action) {
                    case 'url':
                        window.open(node.properties.url, '_blank');
                        break;
                    default:
                        break;
                }
            },
            onRelationshipDoubleClick: options.onRelationshipDoubleClick || function (relationship) {
                // console.log('double click on relationship: ' + JSON.stringify(relationship));
            },
            zoomFit: options.zoomFit || false
        });
        window.ProvenanceUId3 = neo4jd3
        addVisitedClass()
    }, []);

    return (
        <div className='c-provenance js-provenance'>
            <div id={selectorId}></div>
            {children}
        </div>
    );
}

ProvenanceUI.propTypes = {
    options: PropTypes.object,
    data: PropTypes.object,
    dataUrl: PropTypes.string,
    children: PropTypes.node
}

export default ProvenanceUI;
