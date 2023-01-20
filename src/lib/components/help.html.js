import visitedNode from '../assets/visited-node.jpg'
import currentNode from '../assets/current-node.jpg'

const helpHtml = `
<div class='c-help' style="text-align: left;">
    <p>The provenance graph allows users to view ancestry and descendants of a particular entity.</p>
    <h4>The Graph</h4>
    <p>The graph is fully interactive. Features include:</p>
    <ul>
        <li>
            Users may drag nodes around.
        </li>
        <li>
            Clicking any node reveals the info panel of the clicked node.
        </li>
        <li>
            The graph is zoomable. Use your mouse scroll to control the zoom/scale of the graph.
        </li>
    </ul>
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
    <h5>The Info Panel</h5>
    <h4>The Legend</h4>
    <ul>
      <li>Legend items are filterable, clicking on a legend item toggles the entity's color map highlight.</li>
      <li>The eye icon (<i class='fa fa-eye' role='presentation'></i>) after legend labels toggles the visibility of the respective item.</li>
    </ul>
</div>`

export default helpHtml
