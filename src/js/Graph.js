/**
 * Uses DFS algorithm to find all nodes and neighbors.
 */
class Graph {
    /**
     * Traverses a graph dataset.
     * @param ops Object
     * @param ops.token String Auth token
     * @param ops.idKey String The name of the id property in the data
     * @param ops.neighborsKey String The name of the neighbors property in the data
     */
    constructor(ops = {}) {
        this.token = ops.token
        this.idKey = ops.idKey || 'uuid'
        this.neighborsKey = ops.neighborsKey || 'ancestors'
        this.traverseAll = false;
        this.result = []
        this.activitiesIndex = -1;
        this.visited = {}
        this.list = {}
        this.stack = []
    }

    async service(ops = {}) {
        const _t = this;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + this.token)

        return await fetch(ops.url || this.url, {
            method: ops.method || 'GET',
            headers: headers,
            body: ops.raw,
        }).then(response => response.json())
            .then(result => {
                _t.list[result[_t.idKey]] = result;
                _t.stack.push(result[_t.idKey])
                _t.continueDfs(result, ops);
                return result;
            }).catch(error => {
                return error;
            });
    }

    dfs(node) {
        this.visited[node[this.idKey]] = true;
        this.stack.push(node[this.idKey])
        this.list[node[this.idKey]] = node;
        this.continueDfs({startNode: node[this.idKey], isRoot: true});
    }

    continueDfs(ops) {
        const _t = this;
        let prevStartNode = ops.startNode
        while (this.stack.length) {
            let current = this.stack.pop();
            //console.log(current)
            let node = this.list[current];
            //console.log(node)
            if (node && !node[this.neighborsKey] && this.traverseAll) {
                this.service({parent: current, activityIndex: this.activitiesIndex})
            } else {
                prevStartNode = ops.isRoot ? prevStartNode : _t.activitiesIndex;
                ++_t.activitiesIndex;

                this.result.push({...node, startNode: current, endNode: this.activitiesIndex.toString(), type: "WAS_GENERATED_BY", id: node[this.idKey]});
                
                if (node[this.neighborsKey] && node[this.neighborsKey].length) {
                    node[this.neighborsKey].forEach(function(neighbor, index) {
                        let n = neighbor[_t.idKey];

                        if (!_t.visited[n]) {

                            _t.result.push({...node, startNode: _t.activitiesIndex.toString(), endNode: n, type: "USED", labels: ["Activity"],
                                id:  _t.activitiesIndex.toString(), isActivity: true});

                            _t.list[n] = neighbor
                            _t.visited[n] = true;
                            _t.stack.push(n)

                        }
                    })
                } else {

                    this.result.push({...node, startNode: this.activitiesIndex.toString(), endNode: (this.activitiesIndex + 1).toString(),
                        labels: ["Activity"], id:  this.activitiesIndex.toString(), type: "USED", isActivity: true });
                }
            }
        }
    }

    getNodeId(id) {
        return 'Acv-' + id;
    }
    getResult() {
        return this.result;
    }


}

export default Graph