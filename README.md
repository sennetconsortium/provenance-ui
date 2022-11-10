# Provenance UI

## Development:
### Install Dependencies:

### `npm i .`

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Watch and build CSS files:

### `npm run css`

## Usage In Project:
Add the project to your `dependencies` property in `package.json`
```
"dependencies": {
    "provenance-ui": "github:sennetconsortium/provenance-ui#main"
}

```

### Data Format
The data provided to the React component, `ProvenanceUI` should be in the following format or can be converted, see instructions in next section.
```
const sample = {
    "results": [{
        "columns": ["user", "entity"],
        "data": [{
            "graph": {
                "nodes": [{
                    "id": "1",
                    "labels": ["EntityClassNameHere"],
                    "properties": {
                        "your_property_name_for_info": "your_property_value",
                        "your_property_name_for_info_2": "your_property_value"
                    }
                }, {
                    "id": "2",
                    "labels": ["Activity"],
                    "text": "Jane Doe",
                    "properties": {
                        "created_timestamp": "1666622535375",
                        "created_by_user_displayname": "Jane Doe"
                    }
                }{
                    "id": "3",
                    "labels": ["Entity2ClassNameHere"],
                    "properties": {
                        "your_property_name_for_info": "your_property_value",
                        "your_property_name_for_info_3": "your_property_value"
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
                }]
            }
        }]
    }],
    "errors": []
}

export default sample
```
### Converting Your Data:
#### Step 1. Setup Your Data Map
The data map is required to convert your data into a format required by the module.
```
const dataMap = {
        // Map Specific properties from raw data to required properties of the ProvenanceUI API
        root: {
            entity_type: 'labels',
            uuid: 'id',
            created_by_user_displayname: 'text'
        },
        // Capture common properties from raw data into the properties sub object of the ProvenanceUI API
        properties: ['uuid', 'sennet_id'],
        // Capture specific properties from class/type raw data into the properties sub object of the ProvenanceUI API
        typeProperties: {
            Source: ['source_type'],
            Sample: ['sample_category'],
            Activity: ['created_timestamp', 'created_by_user_displayname']
        },
        // Run callbacks on the values
        callbacks: {
            created_timestamp: 'formatDate'
        }
    }
```

#### Step 2. Preparing Your Data For Conversion
```
    import { Graph, DataConverter } from 'provenance-ui/dist/index'
    let graph = new Graph()
    graph.dfs(data)
    
    let converter = new DataConverter(graph.getResult(), dataMap)
    converter.reformatNodes()
    converter.reformatRelationships()
    // This is the node that is highlighted in the visualization, can be multiple.
    const h = [converter.getNodeAsHighlight('sennet_id')]
   
    const neoData = converter.getNeo4jFormat({
        columns: ['user', 'entity'],
        nodes: converter.getNodes(),
        relationships: converter.getRelationships()
    })
```

### Step 3. Using ProvenanceUI component 
```
import { ProvenanceUI } from 'provenance-ui/dist/index'

const options = {
    highlight: [
        class: $dataLabel,
        property: $propName,
        value: $value
    ],
    icons: {
        $dataLabel: $iconName
    },
    images: {
        $dataLabel: image/path
    }
}
<ProvenanceUI options={options} data={neoData} />
```
