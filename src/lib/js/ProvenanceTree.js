import $ from 'jquery'
import * as d3 from 'd3'
import sampleTree from '../../data/sample.tree'

function ProvenanceTree(selector, _options) {
    const $el = {
        canvas: d3.select(selector),
    }
    const classNames = {
        links: {
            labels: 'edgeLabels',
            paths: 'edgePaths'
        }
    }
    let simulation
    const data = {}
    const options = {
        colorMap: {
            "Dataset": "#8ecb93",
            "Activity": "#f16766",
            "Sample": "#ebb5c8",
            "Source": "#ffc255"
        },
        colors: colors(),
        totalTypes: 0,
    }

    function init() {
        $.extend(options, _options)
        clearCanvas()
    }

    function clearCanvas() {

        $el.canvas.attr('class', 'c-provenance--Tree')
            .html('')

        buildTree()
    }

    function drag(simulation) {

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    function color() {
        return options.colors[options.colors.length * Math.random() << 0];
    }

    function colors() {
        // d3.schemeCategory10,
        // d3.schemeCategory20,
        return [
            '#68bdf6', // light blue
            '#6dce9e', // green #1
            '#faafc2', // light pink
            '#f2baf6', // purple
            '#ff928c', // light red
            '#fcea7e', // light yellow
            '#ffc766', // light orange
            '#405f9e', // navy blue
            '#a5abb6', // dark gray
            '#78cecb', // green #2,
            '#b88cbb', // dark purple
            '#ced2d9', // light gray
            '#e84646', // dark red
            '#fa5f86', // dark pink
            '#ffab1a', // dark orange
            '#fcda19', // dark yellow
            '#797b80', // black
            '#c9d96f', // pistacchio
            '#47991f', // green #3
            '#70edee', // turquoise
            '#ff75ea'  // pink
        ];
    }

    function typeToColor(cls) {
        let color = options.colorMap[cls];

        if (!color) {
            color = options.colors[options.totalTypes % options.colors.length];
            options.colorMap[cls] = color;
            options.totalTypes++;
        }

        return color;
    }

    function typeToDarkenColor(cls) {
        return d3.rgb(typeToColor(cls)).darker(1);
    }

    function createZoom() {
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on('zoom', function(event) {
                $el.svgGroup.selectAll('circle, line')
                    .attr('transform', event.transform);
            });

        $el.svg.call(zoom)
    }

    function buildLinks() {
        $el.svg.append('defs').append('marker')
            .attr("id",'arrowhead')
            .attr('viewBox','-0 -5 10 10') // The bound of the SVG viewport for the current SVG fragment. Defines a coordinate system 10 wide and 10 high starting on (0, -5)
            .attr('refX', 30) // X coordinate for the reference point of the marker. If circle is bigger, this needs to be bigger.
            .attr('refY', 0)
            .attr('orient','auto')
            .attr('markerWidth', 8)
            .attr('markerHeight', 8)
            .attr('xoverflow','visible')
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#999')
            .style('stroke','none')

        $el.link = $el.svgGroup.append("g")
            .attr('class', 'links')
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr('marker-end','url(#arrowhead)');

        // Makes path go along with the link by providing position for link labels
        $el.edgePaths = $el.svgGroup.selectAll(`.${classNames.links.paths}`)
            .data(data.links)
            .enter()
            .append('path')
            .attr('class', classNames.links.paths)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('id', function (d, i) {return classNames.links.paths + i})
            .style('pointer-events', 'none');

        $el.edgeLabels = $el.svgGroup.selectAll(`.${classNames.links.labels}`)
            .data(data.links)
            .enter()
            .append('text')
            .style('pointer-events', 'none')
            .attr('class', classNames.links.labels)
            .attr('id', function (d, i) {return classNames.links.labels + i})
            .attr('font-size', 10)
            .attr('fill', '#aaa');

        //This will render text along the shape of a <path> by enclosing the text in a <textPath> element
        // that has a href attribute with a reference to the <path> element.
        $el.edgeLabels.append('textPath')
            .attr('xlink:href', function (d, i) {return `#${classNames.links.paths}` + i})
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(d => {
                return d.source.data.type
            })
    }

    function buildNodes() {
        $el.node = $el.svgGroup.append("g")
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(data.nodes)
            .join("circle")
            .attr("fill", d => typeToColor(d.data.subType))
            .attr("stroke", d => typeToDarkenColor(d.data.subType))
            .attr("r", 15)
            .call(drag(simulation));

        $el.node.append("title")
            .text(d => d.data.subType);
    }

    function initSimulation() {
        simulation = d3.forceSimulation(data.nodes)
            .force("link", d3.forceLink(data.links).id(d => d.id).distance(50).strength(1))
            .force("charge", d3.forceManyBody().strength(-1000))
            .force('center', d3.forceCenter($el.svgGroup.node().parentElement.clientWidth / 2, $el.svgGroup.node().parentElement.clientHeight / 3))
            .force("x", d3.forceX())
            .force("y", d3.forceY());
    }

    function buildTree() {
        const root = d3.hierarchy(sampleTree);
        data.links = root.links();
        data.nodes = root.descendants()

        const isLgScreen = () => parseInt($el.canvas.style('width')) > 1024
        const getMargins = () => (isLgScreen() ? 100 : 50)

        const margin = {
            top: 20,
            right: getMargins(),
            bottom: 90,
            left: getMargins()
        }

        const width = parseInt($el.canvas.style('width')) - margin.left - margin.right
        const height = parseInt($el.canvas.style('height')) - margin.top - margin.bottom

        $el.svg = $el.canvas.append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)

        $el.svgGroup = $el.svg
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        initSimulation()
        buildLinks()
        buildNodes()

        simulation.on("tick", () => {
            $el.link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            $el.node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            $el.edgePaths.attr('d', d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y)
        });

        //invalidation.then(() => simulation.stop());
        createZoom()
        return $el.svg.node()
    }

    init()
    return {

    }
}

export default ProvenanceTree