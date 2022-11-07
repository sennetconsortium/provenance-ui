/**
 * Uses DFS algorithm to find all nodes and neighbors.
 */
class Graph {
    constructor(ops) {
        this.token = ops.token
    }

    async service() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + this.token)

        return await fetch(url, {
            method: method,
            headers: headers,
            body: raw,
        }).then(response => response.json())
            .then(result => {
                return result;
            }).catch(error => {
                return error;
            });
    }

    dfs(node) {
        
    }

    dfs()
}