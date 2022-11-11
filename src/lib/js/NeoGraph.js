/**
 * Uses DFS algorithm to find all nodes and neighbors.
 * @author dbmi.pitt.edu
 */
class NeoGraph {
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
        this.token = ops.token
        this.url = ops.url
        this.idKey = ops.idKey || 'uuid'
        this.neighborsKey = ops.neighborsKey || 'ancestors'
        this.edgeLabels = ops.edgeLabels || { actor: 'USED', entity: 'WAS_GENERATED_BY' }
        this.actorLabels = ops.actorLabels || ['Activity']
        this.traverseAll = false
        this.result = []
        this.actIndex = -1
        this.visited = {}
        this.list = {}
        this.stack = []
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
            } else {
                this.list[result[this.idKey]] = result
                this.stack.push(result[this.idKey])
                this.continueDfs(ops)
            }
        } catch (e) {
            console.log(e)
        }
    }

    dfs(node) {
        this.visited[node[this.idKey]] = true
        this.stack.push(node[this.idKey])
        this.list[node[this.idKey]] = node
        this.continueDfs({ startNode: node[this.idKey], isRoot: true })
    }

    continueDfs(ops) {
        const _t = this
        while (this.stack.length) {
            let current = this.stack.pop()

            let node = this.list[current]

            if (node && !node[this.neighborsKey] && this.traverseAll) {
                this.service({ startNode: current, actIndex: this.actIndex })
            } else {

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

export default Graph