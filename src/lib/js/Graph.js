class Graph {
    constructor(ops = {}) {
        this.token = ops.token
        this.url = ops.url
        this.keys = ops.keys || {}
        this.keys.id = this.keys.id || 'uuid'
        this.keys.neighbors = this.keys.neighbors || 'ancestors'
        this.visited = {}
        this.stack = []
        this.list = {}
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
                ops.callback(result)
            }
        } catch (e) {
            console.log(e)
        }
    }

    dfs(node) {
        this.root = node
        this.visited[node[this.keys.id]] = true
        this.stack.push(node[this.keys.id])
        this.list[node[this.keys.id]] = node
    }
    
    checkVisited(id, node) {
        if (!this.visited[id]) {
            this.list[id] = node
            this.visited[id] = true
            this.stack.push(id)
        }
    }

    getResult() {
        return this.result
    }
}

export default Graph