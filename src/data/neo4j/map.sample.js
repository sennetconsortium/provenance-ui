const dataMap = {
    delimiter: '/',
    root: {
        id: 'sennet:uuid',
        type: 'prov:type',
        subType: 'sennet:entity_type'
    },
    props: ['sennet:sennet_id'],
    typeProps: {
        Source: ['sennet:source_type'],
        Sample: ['sennet:sample_category'],
        Activity: ['sennet:created_timestamp', 'sennet:protocol_url', 'sennet:processing_information', 'sennet:created_by_user_displayname'],
        Dataset: ['sennet:status', 'sennet:creation_action']
    },
    callbacks: {
        'sennet:created_timestamp': 'formatDate',
        //'sennet:created_by_user_displayname': 'lastNameFirstInitial'
    }
}

export default dataMap