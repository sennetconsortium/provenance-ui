/**
 * Base class with common options.
 * @author dbmi.pitt.edu
 * @param ops Object
 **/

class GraphGeneric {
    constructor(ops = {}) {
        this.ops = ops
        this.token = ops.token
        this.url = ops.url
        this.keys = ops.keys || {}
        this.keys.id = this.keys.id || 'uuid'
        this.keys.neighbors = this.keys.neighbors || 'ancestors'
        this.visited = {}
        this.stack = []
        this.list = ops.list || {}
        this.result = []
        this.root = null
    }

    /**
     * Makes a ajax call
     * @param ops {object}
     * @returns {Promise<Graph>}
     */
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
                ops.callback(result, ops)
            } else {
                this.stack.push(ops.id)
                this.list[ops.id] = this.getItem(result)
                this.serviced[ops.id] = true
                this.continueDfs()

            }
        } catch (e) {
            console.error(e)
        }
        return this
    }
    
    dfsInit(node) {
        this.root = node
        const id = node[this.keys.id]
        this.visited[id] = true
        this.stack.push(id)
        this.list[id] = node
    }

    /**
     * DFS initialization
     * @param node {object}
     */
    dfs(node) {
        this.dfsInit(node)
    }

    continueDfs(ops = {}) {}

    /**
     * Returns an item from object or object array
     * @param obj
     * @returns {*}
     */
    getItem(obj) {
        if (typeof obj === 'object') {
            return obj.length ? obj[0] : obj
        } else {
            return obj
        }
    }

    appendList(id, obj) {
        if (this.list[id] === undefined) {
            this.list[id] = this.getItem(obj)
        }
    }

    /**
     * Returns result
     * @returns {[]}
     */
    getResult() {
        return this.result
    }
}

export default GraphGeneric