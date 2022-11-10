const sample = {
    "results": [{
        "columns": ["user", "entity"],
        "data": [{
            "graph": {
                "nodes": [{
                    "id": "1",
                    "labels": ["Dataset"],
                    "properties": {
                        "uuid": "19b4061567c8105e34005c3ca56a656c",
                        "sennet_id": "SNT264.VWKZ.629"
                    }
                }, {
                    "id": "2",
                    "labels": ["Activity"],
                    "text": "L. Bruney",
                    "properties": {
                        "created_timestamp": "1666622535375",
                        "created_by_user_displayname": "Jane Doe"
                    }
                }, {
                    "id": "3",
                    "labels": ["Sample"],
                    "properties": {
                        "uuid": "75416aad581009b8f316a3d034a2bda0",
                        "sennet_id": "SNT333.VBRT.956",
                        "sample_category": "organ"
                    }
                }, {
                    "id": "4",
                    "labels": ["Activity"],
                    "text": "L. Bruney",
                    "properties": {
                        "created_timestamp": "1666622535375",
                        "created_by_user_displayname": "Jane Doe"
                    }
                }, {
                    "id": "5",
                    "labels": ["Source"],
                    "properties": {
                        "uuid": "789d09a4c3d81bff5b28b7938f3764cd",
                        "sennet_id": "SNT385.FJPB.242",
                        "source_type": "Human"
                    }
                }],
                "relationships": [{
                    "id": "1",
                    "type": "WAS_GENERATED_BY",
                    "startNode": "1",
                    "endNode": "2",
                    "properties": {}
                }, {
                    "id": "2",
                    "type": "USED",
                    "startNode": "2",
                    "endNode": "3",
                    "properties": {
                    }
                }, {
                    "id": "3",
                    "type": "WAS_GENERATED_BY",
                    "startNode": "3",
                    "endNode": "4",
                    "properties": {
                        "from": 1473581532586
                    }
                },{
                    "id": "4",
                    "type": "USED",
                    "startNode": "4",
                    "endNode": "5",
                    "properties": {
                    }
                }]
            }
        }]
    }],
    "errors": []
}

export default sample