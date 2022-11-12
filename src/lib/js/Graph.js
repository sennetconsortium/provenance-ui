class Graph {
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
        if (ops.isNeo) {
            console.log('NeoList',this.list)
        }
        this.result = []
        this.root = null
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
                ops.callback(result, ops)
            } else {

                this.stack.push(ops.id)
                this.list[ops.id] = result
                this.serviced[ops.id] = true
                this.continueDfs()
            }
        } catch (e) {
            console.log(e)
        }
        return this
    }

    dfs(node) {
        this.root = node
        const id = node[this.keys.id]
        this.visited[id] = true
        this.stack.push(id)
        if (this.list[id] === undefined) {
            this.list[id] = node
        }

    }

    continueDfs(ops = {}) {}
    
    checkVisited(id, node) {
        if (!this.visited[id]) {
            if (this.list[id] === undefined) {
                this.list[id] = node
            }
            this.visited[id] = true
            this.stack.push(id)
        }
    }

    getResult() {
        return this.result
    }
}

export default Graph