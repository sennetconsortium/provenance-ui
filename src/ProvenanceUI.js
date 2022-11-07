
import { useEffect, useState } from 'react'
import './css/lib/font-awesome.min.css'
import './css/lib/neo4jd3.css'
import './App.css'
import Neo4jd3 from './js/neo4jd3'
import sample from "./data/sample";
import useD3 from "./hooks/useD3";

function ProvenanceUI({ ops, data = null, dataUrl = null}) {
  useD3()
  const [graphData, setGraphData] = useState(data || sample)
  const [graphDataUrl, setDataUrl] = useState(dataUrl)

  useEffect(() => {
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
      //neo4jDataUrl: graphDataUrl,
      nodeRadius: 25,
      onNodeDoubleClick: function(node) {
        switch(node.id) {
          case '25':
            window.open(node.properties.url, '_blank');
            break;
          default:

            break;
        }
      },
      onRelationshipDoubleClick: function(relationship) {
        console.log('double click on relationship: ' + JSON.stringify(relationship));
      },
      zoomFit: true
    });

  }, []);

  return (
    <div className='c-provenance'>
      <div id="neo4jd3"></div>
    </div>
  );
}

export default ProvenanceUI;
