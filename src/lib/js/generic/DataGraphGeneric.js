import GraphGeneric from './GraphGeneric'

/**
 * Uses DFS algorithm to gather all data and relationships via ajax calls.
 * @author dbmi.pitt.edu
 *
 **/
class DataGraphGeneric extends GraphGeneric {
    constructor(ops = {}) {
        super(ops)
        this.serviced = {}
        this.storeResult = ops.storeResult || false
    }

    /**
     * Initializes a dfs setup with promise
     * @param node
     * @returns {Promise<DataGraph>}
     */
    async dfsWithPromise(node) {
        this.dfsInit(node)
        this.promisesToAwait = []
        this.continueDfs()
        return this
    }

    /**
     * Continues the dfs algorithm with promise
     * @param ops
     * @returns {Promise<DataGraph>}
     */
    async continueDfs(ops = {}) {
        while (this.stack.length) {
            let current = this.stack.pop()
            let node = this.list[current]

            // Handle
            let neighbors = null
            if (this.ops.getNeighbors && typeof this.ops.getNeighbors === 'function') {
                neighbors = this.ops.getNeighbors(node)
            } else {
                neighbors = node[this.keys.neighbors]
            }

            if (!neighbors.length && !this.serviced[current] && current !== undefined) {
                const serviceOps = this.ops.getServiceOptions(current, this.url)
                this.promisesToAwait.push(this.service(serviceOps))
            } else {

                if (neighbors.length) {
                    if (this.storeResult) this.result.push(node)
                    neighbors.forEach((function(neighbor, index) {

                        const neighborNode = this.getItem(neighbor)
                        let id = neighborNode[this.keys.id]

                        if (!this.visited[id]) {
                            this.appendList(id, neighborNode)
                            this.visited[id] = true
                            this.stack.push(id)
                        }

                    }).bind(this))
                } else {
                    node[this.keys.neighbors] = []
                    if (this.storeResult) this.result.push(node)
                }
            }
        }
        await Promise.all(this.promisesToAwait)
        this.ops.onDataAcquired(this)
        return this
    }
}

export default DataGraphGeneric