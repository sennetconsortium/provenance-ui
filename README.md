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
    root: {
        {
            id: '1',
            children: [
                {
                    id: '2'
                    children: []
                }
            ]
        }
    }
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
            uuid: 'id'
        },
        // Capture common properties from raw data into the properties sub object of the ProvenanceUI API
        props: ['uuid', 'sennet_id'],
        // Capture specific properties from class/type raw data into the properties sub object of the ProvenanceUI API
        typeProps: {
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

#### Step 2. Preparing Your Data For Conversion (See usage/Neo4JGraphObject)
```
    import { GraphGeneric, DataConverterNeo4J } from 'provenance-ui/dist/index'
    const result = {
        activity: {...},
        entity: {...},
        used: {...},
        generated: {...}
    }
    const converter = new DataConverterNeo4J(result, dataMap)
    converter.hierarchy(itemId, hasDescendants)
    const data = {stratify: converter.result}
```

### Step 3. Using ProvenanceUI component 
```
import { ProvenanceUI } from 'provenance-ui/dist/index'

const options = {
    highlight: [
        {
            id: '1'
        }
    ],
    icons: {
        $dataLabel: $iconName
    },
    images: {
        $dataLabel: image/path
    }
}
<ProvenanceUI options={options} data={data} />
```
