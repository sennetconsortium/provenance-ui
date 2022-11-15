import Graph from './Graph'

/**
 * Gathers all data and relationships.
 * @author dbmi.pitt.edu
 *
 **/

class DataGraph extends Graph {
    constructor(ops = {}) {
        super(ops)
        this.serviced = {}
        this.storeResult = ops.storeResult || false
    }

    async dfsWithPromise(node) {
        this.root = node
        const id = node[this.keys.id]
        this.visited[id] = true
        this.stack.push(id)
        if (this.list[id] === undefined) {
            this.list[id] = node
        }
        this.promisesToAwait = []
        this.continueDfs()
        return this
    }

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

            if (!neighbors.length && !this.serviced[current]) {
                this.promisesToAwait.push(this.service({ url: this.url + current, id: current }))
            } else {

                if (neighbors.length) {
                    if (this.storeResult) this.result.push(node)
                    neighbors.forEach((function(neighbor, index) {

                        let id = neighbor[this.keys.id]

                        if (!this.visited[id]) {
                            if (this.list[id] === undefined) {
                                this.list[id] = neighbor
                            }

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

export default DataGraph