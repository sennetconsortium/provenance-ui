import visitedNode from '../assets/visited-node.jpg'
import currentNode from '../assets/current-node.jpg'
import theGraph from '../assets/the-graph.jpg'
import infoPanel from '../assets/info-panel.jpg'
import legend from '../assets/legend.jpg'

const helpHtml = `
<div class='c-help__body' style="text-align: left;">
    <p>The provenance graph allows users to view ancestry and descendants of a particular entity.</p>
    <h4>The Graph</h4>
    <img src="${theGraph}" alt="provenance graph" width="100%" />
    <p>The graph is fully interactive. Features include:</p>
    <ul>
        <li>
            Users may drag (<i class='fa fa-arrows' role='presentation'></i>) nodes around.
        </li>
        <li>
            Clicking any node reveals its <a href="#info-panel">info panel</a>.
        </li>
        <li>
            The graph is zoomable. Use the mouse scroll wheel to control the zoom/scale of the graph.
        </li>
    </ul>
    <h5 class="mgn-v">Interactions &amp; Colors</h5>
    <table>
        <tr>
            <th>Graphic</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><img src="${currentNode}" alt="current node" /></td>
            <td>Entity of the current page is denoted by a lime colored halo.</td>
        </tr>
        <tr>
            <td><img src="${visitedNode}" alt="visited node" /></td>
            <td>Visited nodes are denoted by a faint blue halo.</td>
        </tr>
    </table>
    <h4 id="info-panel">The Info Panel</h4>
    <img src="${infoPanel}" alt="node info panel" width="100%" />
    <ul>
    <li>The info panel gives additional details about a particular node.</li>
    <li>Some detail cells link to their respective domain page, denoted by an external link icon (<i class='fa fa-external-link' role='presentation'></i>). </li>
    </ul>
    <h4>The Legend</h4>
    <img src="${legend}" alt="provenance legengd" width="100%" />
    <ul>
      <li>Legend items are filterable, clicking on a legend item toggles the entity's color map highlight.</li>
      <li>The eye icon (<i class='fa fa-eye' role='presentation'></i>) after legend labels toggles the visibility of the respective item on the graph.</li>
    </ul>
</div>`

export default helpHtml
