const sampleNeo4j = {
    "activity": {
        "sennet:activities/f212e477ad01650992c85beab425b913": {
            "prov:startTime": "2022-12-12T14:05:58",
            "prov:endTime": "2022-12-12T14:05:58",
            "prov:type": "Activity",
            "sennet:created_by_user_email": "jandedoe@some.edu",
            "sennet:sennet_id": "SNT677.VKKW.223",
            "sennet:protocol_url": "https://dx.doi.org/10.1704/protocols.io.dkasfkkaadf",
            "sennet:created_by_user_displayname": "Jane Doe",
            "sennet:creation_action": "Create Source Activity",
            "sennet:created_timestamp": "2022-12-12T14:05:58",
            "sennet:created_by_user_sub": "cd17bfa7-24fd-49ca-82ec-2d456ba53730",
            "sennet:uuid": "f212e477ad01650992c85beab425b913"
        }
    },
    "entity": {
        "sennet:entities/bd2f1be14a0cf254009262b8612be197": {
            "prov:type": "Entity",
            "sennet:sennet_id": "SNT548.RTLP.993",
            "sennet:group_name": "University of Pittsburgh TMC",
            "sennet:lab_source_id": "test_sc_02",
            "sennet:last_modified_timestamp": "2022-12-12T14:05:58",
            "sennet:created_by_user_displayname": "Jane Doe",
            "sennet:description": "white female, 65 years old",
            "sennet:source_type": "human",
            "sennet:created_timestamp": "2022-12-12T14:05:58",
            "sennet:group_uuid": "28db7a2b-ed8a-11ec-8b0a-9fe9b51132b1",
            "sennet:label": "Entity",
            "sennet:created_by_user_sub": "cd17bfa7-24fd-49ca-82ec-2d456ba53730",
            "sennet:uuid": "bd2f1be14a0cf254009262b8612be197",
            "sennet:last_modified_user_displayname": "Jane Doe",
            "sennet:created_by_user_email": "jandedoe@some.edu",
            "sennet:data_access_level": "consortium",
            "sennet:entity_type": "Source",
            "sennet:last_modified_user_email": "jandedoe@some.edu",
            "sennet:last_modified_user_sub": "cd17bfa7-24fd-49ca-82ec-2d456ba53730"
        }
    },
    "wasGeneratedBy": {
        "_:id2": {
            "prov:entity": "sennet:entities/bd2f1be14a0cf254009262b8612be197",
            "prov:activity": "sennet:activities/f212e477ad01650992c85beab425b913"
        }
    },
    "descendants": {
        "prefix": {
            "sennet": "https://sennetconsortium.org/"
        }
    }
}

export default sampleNeo4j
