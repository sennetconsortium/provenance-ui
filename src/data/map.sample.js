const dataMap = {
    root: {
        entity_type: 'labels',
        uuid: 'id',
        created_by_user_displayname: 'text',
    },
    highlight: {
        labels: 'entity_type',
        prop: 'sennet_id'
    },
    actor: {
        dataProp: 'created_by_user_displayname',
        visualProp: 'researcher'
    },
    props: ['uuid', 'sennet_id'],
    typeProperties: {
        Source: ['source_type'],
        Sample: ['sample_category'],
        Activity: ['created_timestamp']
    },
    callbacks: {
        created_timestamp: 'formatDate',
        created_by_user_displayname: 'lastNameFirstInitial'
    }
}

export default dataMap