import DataConverter from '../DataConverter'

class DataConverterGeneric extends DataConverter {

    constructor(data, map, ops = {}) {
        super(data, map, ops)
        if (this.error) return this
        this.list = ops.list || {}
    }

    stratify() {
        if (this.error) return this
        let stack = [this.data];
        let visited = {};
        visited[this.data[this.map.root.id]] = true
        this.result = []
        while (stack.length) {
            let n = stack.pop()
            const id = n[this.map.root.id]
            n = this.list[id] || n
            n.id = id
            n.entityAsParent = visited[n.id] ? visited[n.id].id : null
            n.type = n[this.map.root.type] || 'Entity'
            n.subType = n[this.map.root.subType] || n.type
            if (this.map.root.text) {
                n.text = n[this.map.root.text]
            }
            this.setProperties(n, n.subType)
            n._children = this.ops.getNeighbors(n)
            n.children = []
            if (n._children && n._children.length){
                for (let c of n._children) {
                    const cId = c[this.map.root.id]
                    n.children.push(this.list[cId] || c)
                    if (!visited[cId]) {
                        visited[cId] = n
                        stack.push(c)
                    }
                }
            }
        }
    }

}

export default DataConverterGeneric