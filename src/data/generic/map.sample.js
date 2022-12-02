const dataMap = {
    root: {
        id: 'uuid',
        subType: 'entity_type',
        text: 'created_by_user_displayname'
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
    typeProps: {
        Source: ['source_type'],
        Sample: ['sample_category'],
        Activity: ['created_timestamp']
    },
    callbacks: {
        created_timestamp: 'formatDateTimestamp',
        created_by_user_displayname: 'lastNameFirstInitial'
    }
}

export default dataMap