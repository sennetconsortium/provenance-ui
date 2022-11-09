const dataMap = {
    root: {
        entity_type: 'labels',
        uuid: 'id',
        created_by_user_displayname: 'text'
    },
    properties: ['uuid', 'sennet_id'],
    typeProperties: {
        Source: ['source_type'],
        Sample: ['sample_category'],
        Activity: ['created_timestamp', 'created_by_user_displayname']
    },
    callbacks: {
        created_timestamp: 'formatDate',
        created_by_user_displayname: 'lastNameFirstInitial'
    }
}

export default dataMap