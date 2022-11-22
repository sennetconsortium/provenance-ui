import $ from 'jquery'
import * as d3 from 'd3'
import sampleTree from '../../data/sample.tree'

function ProvenanceTree(selector, _options) {
    const $el = {
        canvas: d3.select(selector),
    }
    let $info
    const classNames = {
        info: 'c-provenance__info',
        infoNode: 'c-provenance__info--node',
        infoRelation: 'c-provenance__info--relationship',
        links: {
            labels: 'edgeLabels',
            paths: 'edgePaths'
        },
        hasDrag: 'has-drag'
    }
    const sz = {}
    let simulation
    const data = {}
    const options = {
        colorMap: {
            "Dataset": "#8ecb93",
            "Activity": "#f16766",
            "Sample": "#ebb5c8",
            "Source": "#ffc255"
        },
        nodeRadius: 15,
        colors: colors(),
        totalTypes: 0,
        idNavigate: {
            props: [],
            url: '',
            exclude: []
        },
        hideElementId: true,
        theme: {
            colors: {
                nodeOutlineFill: undefined,
                relationship: '#a5abb6',
                gray: '#ced2d9'
            }
        }
    }

    function init() {
        $.extend(options, _options)
        clearCanvas()
    }

    function clearCanvas() {

        $el.canvas.html('')

        buildTree()
    }

    function drag(simulation) {

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
            $(selector).addClass(classNames.hasDrag)
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;

        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
            $(selector).removeClass(classNames.hasDrag)
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
                $el.svgGroup.selectAll('.links, .nodes, .labels')
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
            .on('click', function(e, d) {
                d.wasClicked = true
                updateInfo(d.data, false)
            })
            // .attr("d", d3.linkHorizontal()
            //     .x(d => d.x)
            //     .y(d => d.y))
            .attr('marker-end','url(#arrowhead)');

        $el.labelsGroup = $el.svgGroup.append('g')
            .attr('class', 'labels')
        // Makes path go along with the link by providing position for link labels
        $el.edgePaths = $el.labelsGroup.selectAll(`.${classNames.links.paths}`)
            .data(data.links)
            .enter()
            .append('path')
            .attr('class', classNames.links.paths)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('id', function (d, i) {return classNames.links.paths + i})
            .style('pointer-events', 'none');

        $el.edgeLabels = $el.labelsGroup.selectAll(`.${classNames.links.labels}`)
            .data(data.links)
            .enter()
            .append('text')
            .style('pointer-events', 'none')
            .attr('class', classNames.links.labels)
            .attr('id', function (d, i) {return classNames.links.labels + i})
            .attr('font-size', 8)
            .attr('fill', '#aaa');

        //This will render text along the shape of a <path> by enclosing the text in a <textPath> element
        // that has a href attribute with a reference to the <path> element.
        $el.edgeLabels.append('textPath')
            .attr('xlink:href', function (d, i) {return `#${classNames.links.paths}` + i})
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(d => {
                return d.source.data.type === 'Entity' ? 'WAS_GENERATED_BY' : 'USED'
            })
    }

    function buildNodes() {
        data.nodes.forEach(function(d, i) {
            d.y = sz.height/2 + i;
            d.x = 3000*d.depth + 300;
        });

        // data.nodes.forEach(function(d, i) {
        //     d.x = sz.width/2 + i;
        //     d.y = 100*d.depth + 100;
        // })

        $el.node = $el.svgGroup.append("g")
            .attr('class', 'nodes')
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("stroke-width", 1.5)
            .selectAll('g')
            .data(data.nodes)

        $el.nodeEnter = $el.node.enter()
            .append('g')
            .attr('class', d => `node node--${d.data.subType}`)
            .on('click', function(e, d) {
                d.wasClicked = true
                updateInfo(d.data, true)
            })
            .call(drag(simulation))

        $el.nodeGlow = $el.nodeEnter.append('circle')
            .attr('class', 'glow')
            .attr('r', options.nodeRadius * 1.3)
            .style('fill', (d) => {
                return options.theme.colors.nodeOutlineFill ? options.theme.colors.nodeOutlineFill : typeToColor(d.subType);
            })
            .style('stroke', (d) => {
                return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : typeToDarkenColor(d.subType);
            })

        $el.nodeMain = $el.nodeEnter
            .append("circle")
            .attr('class', 'main')
            .attr("fill", d => typeToColor(d.data.subType))
            .attr("stroke", d => typeToDarkenColor(d.data.subType))
            .attr("r", options.nodeRadius)

        $el.nodeEnter = $el.nodeMain.merge($el.nodeGlow)

        $el.node = $el.nodeEnter.merge($el.node)
        $el.nodeGlow.append('title').text(d => d.data.subType)
        $el.node.append('title').text(d => d.data.subType)
    }

    function appendInfoPanel() {
         $el.info = $el.canvas.append('div')
            .attr('class', classNames.info);
        $info = $(selector).find(`.${classNames.info}`)
    }

    function isValidURL(string) {
        const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }

    function clearInfo() {
        $info.removeClass(classNames.infoNode)
        $info.removeClass(classNames.infoRelation)
        $info.html('');
    }

    function updateInfo(d, isNode) {
        clearInfo()

        isNode ? $info.addClass(classNames.infoNode) : $info.removeClass(classNames.infoNode)
        !isNode ? $info.addClass(classNames.infoRelation) : $info.removeClass(classNames.infoRelation)

        if (d.type) {
            appendInfoElement(d,'class', isNode, (d.type !== d.subType) ? d.subType : d.type);
        }
        if (!options.hideElementId) {
            appendInfoElement(d,'property', isNode, '&lt;id&gt;', d.id);
        }

        if (d.properties) {
            Object.keys(d.properties).forEach(function(property) {
                appendInfoElement(d,'property', isNode, property, JSON.stringify(d.properties[property]));
            });
        }

    }

    function appendInfoElement(d, cls, isNode, property, value) {
        const isNavigation =  options.idNavigate.props.indexOf(property) !== -1
        value = value ? value.replaceAll('"', '') : value
        let formattedUrl = false;
        let elem = $el.info.append('a');
        let href = '#';
        if (isNavigation && options.idNavigate && options.idNavigate.url) {
            const label = d.subType || 'Unknown'
            const excludeList = options.idNavigate.exclude[label]
            if (!excludeList || (excludeList &&
                excludeList.indexOf(property) === -1)) {
                formattedUrl = true;
                const url = isValidURL(value) ? value : options.idNavigate.url
                href = url.replace('{classType}', label.toLowerCase())
                href = href.replace('{id}', value)
                href = (isValidURL(value) && href.indexOf('://') === -1) ? '//' + href : href
            }
        }

        elem.attr('href', formattedUrl ?  href : '#')
            .attr('target', formattedUrl ? '_blank' : '_parent')
            .attr('class', cls + (!formattedUrl ? ' flat' : ' has-hover'))
            .html('<strong>' + property + '</strong>' + (value ? (`: <span>${value}</span>`) : ''));

        if (!value) {
            elem.style('background-color', function(d) {
                return options.theme.colors.nodeOutlineFill ? options.theme.colors.nodeOutlineFill : (isNode ? typeToColor(property) : defaultColor());
            })
                .style('border-color', function(d) {
                    return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : (isNode ? typeToDarkenColor(property) : defaultDarkenColor());
                })
                .style('color', function(d) {
                    return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : '#fff';
                });
        }
    }

    function defaultColor() {
        return options.theme.colors.relationship;
    }

    function defaultDarkenColor() {
        return d3.rgb(options.theme.colors.gray).darker(1);
    }


    function initSimulation() {
        simulation = d3.forceSimulation(data.nodes)
            //.force("link", d3.forceLink(data.links).id(d => d.depth).distance(20).strength(1))
            .force("charge", d3.forceManyBody().strength(-700))
            .force('center', d3.forceCenter($el.svgGroup.node().parentElement.clientWidth / 2, $el.svgGroup.node().parentElement.clientHeight / 2))
            .force("x", d3.forceX())
            .force('y', d3.forceY(20).strength(.2));
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

        sz.width = parseInt($el.canvas.style('width')) - margin.left - margin.right
        sz.height = parseInt($el.canvas.style('height')) - margin.top - margin.bottom

        $el.svg = $el.canvas.append('svg')
            .attr('width', sz.width + margin.left + margin.right)
            .attr('height', sz.height + margin.top + margin.bottom)

        $el.svgGroup = $el.svg
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        initSimulation()
        buildLinks()
        buildNodes()
        appendInfoPanel()

        simulation.on("tick", (e) => {

            //const ky = simulation.alpha()
            // data.links.forEach(function(d, i) {
            //     d.target.y += (d.target.depth * 70 - d.target.y) * 2 * ky;
            // })

            $el.link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            $el.node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            $el.nodeGlow
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)

            $el.edgePaths.attr('d', d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y)
        });

        createZoom()
        return $el.svg.node()
    }

    init()
    return {

    }
}

export default ProvenanceTree