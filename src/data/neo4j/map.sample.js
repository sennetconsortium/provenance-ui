const dataMap = {
    delimiters: {
        node: '/'
    },
    keys: {
        startNode: 'prov:entity',
        endNode: 'prov:activity'
    },
    root: {
        'id': 'sennet:uuid'
    },
    props: ['sennet:uuid', 'sennet:sennet_id'],
    typeProps: {
        Source: ['sennet:source_type'],
        Sample: ['sennet:sample_category'],
        Activity: ['sennet:created_timestamp', 'sennet:protocol_url', 'sennet:created_by_user_displayname']
    },
    callbacks: {
        'sennet:created_timestamp': 'formatDate',
        //'sennet:created_by_user_displayname': 'lastNameFirstInitial'
    }
}

export default dataMap