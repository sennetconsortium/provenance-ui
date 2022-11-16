import log from 'loglevel'
import GraphGeneric from '../lib/js/generic/GraphGeneric'

async function Neo4JGraphObject(serviceOps) {
    const { token, url, itemId, getOptions, setContextData, setLoading, setOptions } = serviceOps;

    const handleResult = async (result) => {

    }

    if (token.length && url.length && itemId.length) {
        const graph = new GraphGeneric()
        return graph.service({ callback: handleResult, url: url.replace('{id}', itemId) })
    }
}

export default Neo4JGraphObject