class Graph {
    constructor(ops = {}) {
        this.token = ops.token
        this.url = ops.url
        this.idKey = ops.idKey || 'uuid'
        this.visited = {}
        this.stack = []
        this.list = {}
        this.result = []
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

    }
}

export default Graph