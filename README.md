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
```json
"dependencies": {
    "provenance-ui": "github:sennetconsortium/provenance-ui#main"
}

```

### Data Format
The data provided to the React component, `ProvenanceUI` should be in the following format or can be converted, see instructions in next section.
```js
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
```js
const dataMap = {
        // Map Specific properties from raw data to required properties of the ProvenanceUI API
        root: {
            id: 'uuid'
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
```jsx
    import { GraphGeneric, DataConverterNeo4J } from 'provenance-ui/dist/index'
    const result = {
        activity: {...},
        entity: {...},
        used: {...},
        generated: {...}
    }
    const converter = new DataConverterNeo4J(result, dataMap)
    const hasDescendants = false
    const itemId = '1'
    converter.buildAdjacencyList(itemId)
    const data = {stratify: converter.result}
```

#### Step 3. Using ProvenanceUI component 
```jsx
import { ProvenanceUI } from 'provenance-ui/dist/index'

const options = {
    highlight: [
        {
            id: '1'
        }
    ],
    iconMap: {
        $dataLabel: $iconName
    },
    imageMap: {
        $dataLabel: image/path
    }
}
<ProvenanceUI options={options} data={data} />
```
## Documentation
### ProvenanceUI
The specific options that can be passed to the UI are listed below:

| Parameter                     | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|-------------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **selectorId**                | *string*   | The id to be given to the `c-provenance` container. Default: `provenanceTree`. Useful where multiple containers exist on the same page. The returned object of ProvenanceTree will be available at `window.ProvenanceTreeD3[selectorId]`.                                                                                                                                                                                                                                 |
| **minHeight**                 | *integer*  | The minimum height to be given to the `c-provenance` container. Default: `300`                                                                                                                                                                                                                                                                                                                                                                                            |
| **noStyles**                  | *boolean*  | Import the css styles or not: `true`, `false`. Default: `false`.                                                                                                                                                                                                                                                                                                                                                                                                          |
| **dontCheckInitialized**      | *boolean*  | Determines whether to check if `ProvenanceTree` has already been called: `true`, `false`. Default: `false`. Useful if data is dynamic and need to update upon data changes.                                                                                                                                                                                                                                                                                               |        
|                               |            | **The following specifically determine tree behavior and formatting.**                                                                                                                                                                                                                                                                                                                                                                                                    |
| **data**                      | *object*   | The data to be used to build the tree. The object takes one of two property types: `[stratify&#124;root]`. Example:<br/> `{stratify: adjacencyList}`. An adjacency list object supplied to the `stratify` property will then be converted to hierarchy model for building the tree. <br/>If data is already in hierarchy model, then `{root: data}`                                                                                                                       |
| **node**                      | *object*   | Determines formatting of nodes. `{append: 'text&#124;icon', radius: 15 }`. The `append` property when set, sets either the text or icon to the respective data item. If not set, nothing is appended. The `text` property in the data item is used as the text to append. Icon to append is based on value of option `iconMap`. `radius` property takes integer value determining radius of the node. Default is `15`.                                                    |
| **colorMap**                  | *object*   | Map node `subType` to hex colors. Example: `{Activity: '#0000ff'}`                                                                                                                                                                                                                                                                                                                                                                                                        |
| **imageMap**                  | *object*   | Map node `subType` to image src urls. Example: <br>`{Activity: 'img/some/imgpath.svg',   "Sample&#124;sennet:sample_category&#124;organ": 'img/some/imgpath2.svg'}`.                                                                                                                                                                                                                                                                                                      |
| **propertyMap**               | *object*   | Map node `subType` to preferred property names for the info panel. Example: `{'some_db_property_name': 'preferred_display_name'}`                                                                                                                                                                                                                                                                                                                                         |
| **reverseRelationships**      | *boolean*  | Whether should flip the relationships in the dataset: `true`, `false`. Default: `true`. The arrows will be in opposite direction depending on the value set.                                                                                                                                                                                                                                                                                                              |
| **keepPositionsOnDataToggle** | *boolean*  | After making changes to node positions, this determines if the position changes made will be kept on toggling off of a particular node type: `true`, `false`. Default: `false`.                                                                                                                                                                                                                                                                                           |
| **displayEdgeLabels**         | *boolean*  | Whether to display edge labels: `true`, `false`. Default: `true`.                                                                                                                                                                                                                                                                                                                                                                                                         |
| **highlight**                 | *object*   | The nodes to highlight. Example: `[{id: 'someId'}, {id: 'anotherId', isSecondary: true}]`.                                                                                                                                                                                                                                                                                                                                                                                |
| **iconMap**                   | *object*   | Map node `subType` to [Font Awesome icons](https://fontawesome.com/v4/).                                                                                                                                                                                                                                                                                                                                                                                                  |
| **colors**                    | *object*   | An array of hex colors to use throughout the visual. Leave unset to use default colors.                                                                                                                                                                                                                                                                                                                                                                                   |
| **reverseEdgeLabels**         | *boolean*  | Flips the reading direction of the edge labels. `true`, `false`. Default: `true`. This should ideally correspond to `reverseRelationships`                                                                                                                                                                                                                                                                                                                                |
| **idNavigate**                | *object*   | Determines which properties of the info panel should be formatted as links.<br/>  `{props: [], url: '', exclude: []}` .<br/>  - `props`: An array of data property strings. <br/> - `url`: a string to be formatted on the property value. Example `/{subType}?id={id}`. <br/> - `exclude`: An object where key values are arrays. This maps `subTypes` to an array of property names to exclude from url formatting. This is useful if subTypes share common properties. | 
| **callbacks**                 | *object*   | A set of callbacks to perform. This take key and function value. See below for [available callbacks](#ProvenanceTree-Callbacks).                                                                                                                                                                                                                                                                                                                                          |

#### `ProvenanceTree` Data
##### Stratify 
Running the data through the `DataConverterNeo4J` converter returns an adjacency list with id and parent properties that is passed to
`d3`'s `stratify` method which returns a hierarchy model necessary to build the tree visualization. Each object in the list has the following properties:

| Name                 | Type     | Description                                                            |
|----------------------|----------|------------------------------------------------------------------------|
| **id**               | *string* | The id of the node                                                     |
| **activityAsParent** | *string* | The id of the Activity type node who is the parent of the current node |
| **entityAsParent**   | *string* | The id of the Entity type node who is the parent of the current node   |   

##### Hierarchy Model
Any hierarchy model passed as `{root: data}` as `data` option must be in the format:
```
{
    id: 'someId'
    children: [
            {
            id: 'someId2'
            children: [
                ...
            ]
        }
    ],
    properties: {
        prop1: 'My key and value will show in the info panel.'
    }
}
```

#### `ProvenanceTree` Callbacks
| Name                 | Description                                                                        | Returns   | Returns Description                           |
|----------------------|------------------------------------------------------------------------------------|-----------|-----------------------------------------------|
| **onEdgeLabels**     | The callback to run on building the edge labels.                                   | *string*  | The actual label for the respective data      |
| **onCloseButton**    | The callback to run on building of the close info panel button.                    | *string*  | The icon/text/html to be set as close button. |
| **onCenterX**        | The callback to run for the positioning of the simulation's `forceCenter` x value. | *integer* | The x value positioning                       |
| **onCenterY**        | The callback to run for the positioning of the simulation's `forceCenter` y value. | *integer* | The y value positioning                       |
| **onSvgSizing**      | The callback to run on sizing of the SVG                                           | *object*  | The `width` and `height` values of the svg.   |
| **onBeforeBuild**    | The callback to run before building of the visual                                  | *any*     | The return value is not used.                 |
| **onAfterBuild**     | The callback to run after the building of the visual                               | *any*     | The return value is not used.                 |

### Legend 
| Parameter        | Type          | Description                                                                                                                                                                                                                  |
|------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **selectorId**   | *string*      | Should correspond with the `selectorId` of the ProvenanceTree. See above.                                                                                                                                                    |
| **colorMap**     | *object*      | Should correspond with the `colorMap` of the ProvenanceTree. See above.                                                                                                                                                      | 
| **filterNodes**  | *boolean*     | Whether the lengend items filter the nodes or not: `true`, `false`. Default: `true`.                                                                                                                                         |
| **actionMap**    | *object*      | Maps a legend `subType` to an action. Example: `{ Activity: { callback: (e, hasToggled, selectorId)=>{}, className: 'some-className', ariaLabel: 'Toggle Activity Nodes' },}`  Creates `Toggle` components as legend action. |

### Toggle
| Parameter      | Type       | Description                                                                          |
|----------------|------------|--------------------------------------------------------------------------------------|
| **selectorId** | *string*   | Should correspond with the `selectorId` of the ProvenanceTree. See above.            |
| **className**  | *string*   | A classname to apply the component for custom styling.                               |
| **icon**       | *boolean*  | Whether to use an icon as toggle element or not: `true`, `false`. Default: `true`.   |
| **text**       | *string*   | The label to apply to the Toggle component. Available when `icon` is `false`         |
| **ariaLabel**  | *string*   | Web accessibility aria label                                                         |