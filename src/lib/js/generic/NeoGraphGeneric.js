/**
 * Uses DFS algorithm to find all nodes and neighbors.
 * @author dbmi.pitt.edu
 */
import GraphGeneric from './GraphGeneric'
class NeoGraphGeneric extends GraphGeneric {
    /**
     * Traverses a graph dataset.
     * @param ops Object
     * @param ops.token String Auth token
     * @param ops.keys.id  String The name of the id property in the data
     * @param ops.keys.neighbors String The name of the neighbors property in the data
     * @param ops.labels.edge Object<String> {actor, entity}
     * @param ops.labels.actor Array<String>
     */
    constructor(ops = {}) {
        super(ops)
        this.labels = ops.labels || {}
        this.labels.edge = this.labels.edge || { actor: 'USED', entity: 'WAS_GENERATED_BY' }
        this.labels.actor = this.labels.actor || ['Activity']
        this.actIndex = -1
    }

    /**
     * Traverses graph given a root note.
     * @param node {object}
     */
    dfs(node) {
        super.dfs(node)

        while (this.stack.length) {
            let current = this.stack.pop()
            let node = this.list[current]

            ++this.actIndex

            this.result.push({
                ...node,
                startNode: current,
                endNode: this.getNodeId(this.actIndex),
                type: this.labels.edge.entity,
                id: current
            })

            let neighbors = null
            if (this.ops.getNeighbors && typeof this.ops.getNeighbors === 'function') {
                neighbors = this.ops.getNeighbors(node)
            } else {
                neighbors = node[this.keys.neighbors]
            }

            if (neighbors && neighbors.length) {
                neighbors.forEach((function(neighbor, index) {
                    let n = neighbor[this.keys.id]
                    this.addActor(node, n, current)
                    this.checkVisited(n, neighbor)
                }).bind(this))
            } else {
                this.addActor(node, null, current)
            }
        }
    }

    /**
     * Adds an actor node.
     * @param node {object}
     * @param nodeId {string}
     */
    addActor(node, nodeId, parentId) {
        this.result.push({
            ...node,
            startNode: this.getNodeId(this.actIndex),
            endNode: nodeId,
            type: this.labels.edge.actor,
            labels: this.labels.actor,
            id: this.getNodeId(this.actIndex),
            isActivity: true,
            parentId: parentId
        })
    }

    /**
     * Returns a node id.
     * @param id
     * @returns {string}
     */
    getNodeId(id) {
        return 'Act-' + id
    }
}

export default NeoGraphGeneric