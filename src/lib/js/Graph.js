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

    dfs(node) {

    }
}

export default Graph