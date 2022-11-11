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
     * @param ops.idKey String The name of the id property in the data
     * @param ops.neighborsKey String The name of the neighbors property in the data
     * @param ops.edgeLabels Object<String> {actor, entity}
     * @param ops.actorLabels Array<String>
     */
    constructor(ops = {}) {
        super(ops)
        this.neighborsKey = ops.neighborsKey || 'ancestors'
        this.edgeLabels = ops.edgeLabels || { actor: 'USED', entity: 'WAS_GENERATED_BY' }
        this.actorLabels = ops.actorLabels || ['Activity']
        this.traverseAll = false
        this.actIndex = -1
    }

    async service(ops = {}) {
        try {

            let headers = ops.headers || new Headers()
            headers.append('Content-Type', 'application/json')
            headers.append('Authorization', 'Bearer ' + this.token)

            let response = await fetch(ops.url || this.url, {
                method: ops.method || 'GET',
                headers: headers
            })
            const result = await response.json()

            if (ops.callback && typeof ops.callback === 'function') {
                ops.callback(result)
            }
        } catch (e) {
            console.log(e)
        }
    }

    dfs(node) {
        const _t = this
        this.visited[node[this.idKey]] = true
        this.stack.push(node[this.idKey])
        this.list[node[this.idKey]] = node

        while (this.stack.length) {
            let current = this.stack.pop()
            let node = this.list[current]

            ++_t.actIndex

            this.result.push({
                ...node,
                startNode: current,
                endNode: this.getNodeId(this.actIndex),
                type: this.edgeLabels.entity,
                id: current
            })

            if (node[this.neighborsKey] && node[this.neighborsKey].length) {
                node[this.neighborsKey].forEach(function(neighbor, index) {
                    let n = neighbor[_t.idKey]

                    _t.addActor(node, n)
                    if (!_t.visited[n]) {
                        _t.list[n] = neighbor
                        _t.visited[n] = true
                        _t.stack.push(n)
                    }
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
            type: this.edgeLabels.actor,
            labels: this.actorLabels,
            id: this.getNodeId(this.actIndex),
            isActivity: true
        })
    }

    getNodeId(id) {
        return 'Acv-' + id
    }

    getResult() {
        return this.result
    }
}

export default NeoGraph