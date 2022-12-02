const dataMap = {
    root: {
        id: 'uuid',
        subType: 'entity_type',
        text: 'created_by_user_displayname'
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