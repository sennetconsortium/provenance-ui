function NodeToggle(data) {
    // USED starts at activity, ends at entity
    // GENERATED starts at entity, ends at activity
    const used = data.relationships.filter(rel => rel.type === 'USED');
    const generated = data.relationships.filter(rel => rel.type === 'WAS_GENERATED_BY');
    const result = {
        relationships: [],
        nodes: data.nodes.filter(n => n.labels[0] !== 'Activity')
    }
    for (let u of used) {
        for (let g of generated) {
            if (u.startNode == g.endNode) {
                u.startNode = g.startNode;
                result.relationships.push(u)
            }
        }
    }
    return result
}

export default NodeToggle