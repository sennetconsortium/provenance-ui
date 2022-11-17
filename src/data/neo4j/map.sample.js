const dataMap = {
    delimiters: {
        node: '/'
    },
    keys: {
        type: 'sennet:entity_type',
        startNode: 'prov:entity',
        endNode: 'prov:activity'
    },
    labels: {
        edge: { used: 'USED', wasGeneratedBy: 'WAS_GENERATED_BY' }
    },
    root: {
        'sennet:entity_type': 'labels',
        'sennet:uuid': 'id',
        'sennet:created_by_user_displayname': 'text',
    },
    highlight: {
        labels: 'prov:type',
        prop: 'sennet:sennet_id'
    },
    actor: {
        dataProp: 'sennet:created_by_user_displayname',
        visualProp: 'agent'
    },
    props: ['sennet:uuid', 'sennet:sennet_id'],
    typeProps: {
        Source: ['sennet:source_type'],
        Sample: ['sennet:sample_category'],
        Activity: ['sennet:created_timestamp']
    },
    callbacks: {
        'sennet:created_timestamp': 'formatDate',
        'sennet:created_by_user_displayname': 'lastNameFirstInitial'
    }
}

export default dataMap