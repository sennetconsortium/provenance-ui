/**
 * Uses DFS algorithm to find all nodes and neighbors.
 * @author dbmi.pitt.edu
 */
import Graph from './Graph'
class NeoGraph extends Graph {
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

    dfs(node) {
        const _t = this
        super.dfs(node)

        while (this.stack.length) {
            let current = this.stack.pop()
            let node = this.list[current]

            ++_t.actIndex

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
                neighbors.forEach(function(neighbor, index) {
                    let n = neighbor[_t.keys.id]

                    _t.addActor(node, n)
                    _t.checkVisited(n, neighbor)
                })
            } else {
                this.addActor(node)
            }
        }
    }

    /**
     *
     * @param node Object
     * @param nodeId String
     */
    addActor(node, nodeId) {
        this.result.push({
            ...node,
            startNode: this.getNodeId(this.actIndex),
            endNode: nodeId,
            type: this.labels.edge.actor,
            labels: this.labels.actor,
            id: this.getNodeId(this.actIndex),
            isActivity: true
        })
    }

    getNodeId(id) {
        return 'Acv-' + id
    }
}

export default NeoGraph