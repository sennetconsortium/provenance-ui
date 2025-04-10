# Provenance UI

## Development:

### Clone this project and navigate to the project's workspace

### `git clone git@github.com:sennetconsortium/provenance-ui.git`
### `cd provenance-ui`

### Install Dependencies:

### `npm i .`

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Watch and build CSS files:

### `npm run css`

### Previewing a demo
In order to see a running demo locally, you will need to create `.env` file from `.env.example`. This project's demo
assumes an api to be running using simple Bearer token Authorization. For `REACT_APP_API_FEATURE`, the `neo4j` is recommended as
`generic` has been deprecated and no longer supported in updates. Please see [data/sample.neo4j.js](https://github.com/sennetconsortium/provenance-ui/blob/main/src/data/sample.neo4j.js) as sample of expected neo4j format from your api.

## Usage In Project:
Add the project to your `dependencies` property in `package.json`
```json
"dependencies": {
    "provenance-ui": "github:sennetconsortium/provenance-ui#main"
}

```

### Data Format
The data provided to the React component, `ProvenanceUI`, should be in the following format or can be converted, see instructions in next section.
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
The data map is required to convert your data into a format expected by `ProvenanceTree`.
```js
const dataMap = {
        // Map Specific properties from raw data to required properties of the ProvenanceUI API
        root: {
            id: 'uuid',
            type: 'type',
            subType: 'sub_type'
        },
        // Capture common properties from raw data into the properties sub object of the ProvenanceUI API
        props: ['uuid', 'sennet_id'],
        // Capture specific properties from subType raw data into the properties sub object of the ProvenanceUI API
        typeProps: {
            Source: ['source_type'],
            Sample: ['sample_category'],
            Activity: ['created_timestamp', 'created_by_user_displayname']
        },
        // Run callbacks on the values
        callbacks: {
            created_timestamp: 'formatDate',
            created_by_user_displayname: 'lastNameFirstInitial'
        }
    }
```

#### Note: If your data object has differently named keys, instead of the defaults like `entity`, `activity`, `used`, `wasGeneratedBy`, you will need to specify these names in your `dataMap`. Check the details of doing this immediately below or [View the source here](https://github.com/sennetconsortium/provenance-ui/blob/main/src/lib/js/neo4j/DataConverterNeo4J.js#L12).

```jsx
const dataMap = {
    // :
    // other settings from above
    // :
    keys: {
        activity: {
            keyName: 'newActivityName',
            entityName: 'Activity'
        },
        nodes: ['newEntityName', 'newActivityName'],
        relationships: {
            newUsedName: {id: 'prov:activity', val: 'prov:entity'},
            newGeneratedName: {id: 'prov:entity', val: 'prov:activity'},
            // The values of each prop should match above
            dataProps: { used: 'newUsedName', generatedBy: 'newGeneratedName' }
        }
    }
}
```

#### Step 2. Preparing Your Neo4J Data For Conversion (See usage/Neo4JGraphObject)
```jsx
    import { GraphGeneric, DataConverterNeo4J } from 'provenance-ui/dist/index'
    // Please see data/sample.neo4j.js as sample of expected format.
    const result = {
        activity: {...},
        entity: {...},
        used: {...},
        wasGeneratedBy: {...}
    }
    const converter = new DataConverterNeo4J(result, dataMap)
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
There are 3 components available for usage. They include:
- [ProvenanceUI](#provenanceui)
- [Legend](#legend)
- [Toggle](#legend)
### ProvenanceUI
The specific options that can be passed to the UI are listed below:

| Parameter                      | Type                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **selectorId**                 | *string*               | The id to be given to the `c-provenance` container. Default: `provenanceTree`. Useful where multiple containers exist on the same page. The returned object of ProvenanceTree will be available at `window.ProvenanceTreeD3[selectorId]`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **minHeight**                  | *integer*              | The minimum height to be given to the `c-provenance` container. Default: `300`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **noStyles**                   | *boolean*              | Import the css styles or not: `true`, `false`. Default: `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **dontCheckInitialized**       | *boolean*              | Determines whether to check if `ProvenanceTree` has already been called: `true`, `false`. Default: `false`. Useful if data is dynamic and needs to update upon data changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |        
|                                |                        | **The following specifically determines tree behavior and formatting.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **data**                       | *object.map.object*    | The data to be used to build the tree. The object takes one of two property types: `stratify` or `root`. Example:<br/> `{stratify: adjacencyList}`. An adjacency list object supplied to the `stratify` property will then be converted to hierarchy model for building the tree. <br/>If data is already in hierarchy model, then `{root: data}`. See [additional details](#provenancetree-data) below.                                                                                                                                                                                                                                                                                                                          |
 | **nodeLabelProperty**          | *string*               | Set the name of the property in the data to be used as the node label. Default: `text`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **node**                       | *object.map.**         | Determines formatting of nodes. Example: <code>{append: 'text&#124;icon', radius: 15 }</code>. The `append` property take one of two string values, `text` or `icon`. If not set, nothing is appended. <br/> The `text` property in the data item is used as the text to append, or can be change by setting `nodeLabelProperty`. Icon to append is based on key/value pairs of option `iconMap`.<br/> `radius` property takes integer value determining radius of the node. Default: `15`.                                                                                                                                                                                                                                       |
| **colorMap**                   | *object.map.string*    | Map node `subType` to hex colors. Example: `{Activity: '#0000ff'}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **imageMap**                   | *object.map.string*    | Map node `subType` to image src urls. Example: <br><code>{Activity: 'img/some/imgpath.svg',   "Sample&#124;sennet:sample_category&#124;organ": 'img/some/imgpath2.svg'}</code>.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **imageMapActions**            | *object.map.**         | Map keys of `imageMap` to additional actions besides just image urls. See `usage/Neo4GraphObject.js` for details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **propertyMap**                | *object.map.string*    | Map node `subType` to preferred property names for the info panel. Example: `{'some_db_property_name': 'preferred_display_name'}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **reverseRelationships**       | *boolean*              | Whether should flip the relationships in the dataset: `true`, `false`. Default: `true`. (The arrows will be in opposite direction depending on the value set.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **keepPositionsOnDataToggle**  | *boolean*              | After making changes to node positions, this determines if the position changes made will be kept on toggling off of a particular node type: `true`, `false`. Default: `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **displayEdgeLabels**          | *boolean*              | Whether to display edge labels: `true`, `false`. Default: `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **highlight**                  | *object.array.object*  | The nodes to highlight. Example: `[{id: 'someId'}, {id: 'anotherId', isSecondary: true}]`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **iconMap**                    | *object.map.string*    | Map node `subType` to [Font Awesome icons](https://fontawesome.com/v4/). Example: `{Activity: 'cog'}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **colors**                     | *object.array.string*  | An array of hex colors to use throughout the visual. Leave unset to use default colors.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **reverseEdgeLabels**          | *boolean*              | Flips the reading direction of the edge labels. `true`, `false`. Default: `true`. This should ideally correspond to `reverseRelationships`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **idNavigate**                 | *object.map.**         | Determines which properties of the info panel should be formatted as links.<br/>  `{props: {}, url: '', exclude: []}` .<br/>  - `props`: An object with property as key and {`url`, `callback`} as value. [See example](https://github.com/sennetconsortium/provenance-ui/blob/main/src/context/AppContext.jsx#L53-L56). Callback receives (`d`, `property`, `value`) params and url should specify `{subType}` and `{id}` parts. <br/> - `url`: a string to be formatted on the property value. Example `/{subType}?id={id}`. <br/> - `exclude`: An object where key values are arrays. This maps `subTypes` to an array of property names to exclude from url formatting. This is useful if `subTypes` share common properties. | 
| **callbacks**                  | *object.map.func*      | A set of callbacks to perform. This take key and function value. See below for [available callbacks](#provenancetree-callbacks).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **propertyPrefixClear**        | *string*               | A prefix to clear on the properties. Useful where a redundant prefix exists on field names.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **infoPanelBeforeSvg**         | *boolean*              | Whether to insert the info panel div before or after the svg element: `true`, `false`. Default: `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 


#### `ProvenanceTree` Data
##### Stratify 
Running the data through the `DataConverterNeo4J` converter returns an adjacency list with id and parent properties that is passed to
`d3`'s `stratify` method which returns a hierarchy model necessary to build the tree visualization. Each object in the list has the following properties:

| Name                 | Type     | Description                                                                                                                                                  |
|----------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **id**               | *string* | The id of the node                                                                                                                                           |
| **activityAsParent** | *string* | The id of the Activity type node who is the parent of the current node                                                                                       |
| **entityAsParent**   | *string* | The id of the Entity type node who is the parent of the current node                                                                                         | 
| **type**             | *string* | The type of node. Value evaluated by setting `dataMap.root.type`. [See the dataMap example above](#user-content-step-1-setup-your-data-map).                 |  
| **subType**          | *string* | The sub type or class of node. Value evaluated by setting `dataMap.root.subType`. [See the dataMap example above](#user-content-step-1-setup-your-data-map). | 

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
| Name                 | Description                                                                            | Returns              | Returns Description                           |
|----------------------|----------------------------------------------------------------------------------------|----------------------|-----------------------------------------------|
| **onEdgeLabels**     | The callback to run on building the edge labels.                                       | *string*             | The actual label for the respective data      |
| **onInfoCloseBuild** | The callback to run on building of the close info panel button.                        | *string*             | The icon/text/html to be set as close button. |
| **onCenterX**        | The callback to run for the positioning of the simulation's `forceCenter` x value.     | *integer*            | The x value positioning                       |
| **onCenterY**        | The callback to run for the positioning of the simulation's `forceCenter` y value.     | *integer*            | The y value positioning                       |
| **onSvgSizing**      | The callback to run on sizing of the SVG                                               | *object.map.integer* | The `width` and `height` values of the svg.   |
| **onBeforeBuild**    | The callback to run before building of the visual                                      | *any*                | The return value is not used.                 |
| **onAfterBuild**     | The callback to run after the building of the visual                                   | *any*                | The return value is not used.                 |
| **onNodeClick**      | The callback to run on clicking a node                                                 | *any*                | The return value is not used.                 | 
| **onInfoCloseClick** | The callback to run on clicking of the info panel close button                         | *any*                | The return value is not used.                 | 

#### Assigning Custom Images and Shapes For Nodes
To apply an image as a node, simply add the node value and src to the `imageMap` object. Example:
```
// Form:
imageMap: {
 'subType': 'image/path'
 'subType|propertyName|value': 'image/path'
}

imageMap: {
'Source': '..somepath/file.svg'
'Sample|sennet:sample_category|Organ': '..someotherpath/file.svg'
}
```
`propertyName` must be a property included in the `dataMap`'s `props` or `typeProps` section.
Also, if needed to instead draw some shape or SVG path, must also specify the corresponding `imageMapActions`. Example:
```
imageMap: {
'Sample|sennet:sample_category|Block': null
}

imageMapActions: {
'Sample|sennet:sample_category|Block': {
        fn: 'append', // currently, only the 'append' action is valid
        type: 'g', // can specify type as 'image', 'g' or 'rect'
        data: [ // when specified as 'g', should also specify drawing points, paths etc.
            {
                tag: 'polygon',
                property: 'points',
                draw: '1,27.9 15,1.1 29,27.9'
            }
        ]
    }
}
```
This will create code like:
```
<g ...><polygon points="1,27.9 15,1.1 29,27.9"></polygon></g>
```

Specifying type as `image` is useful in order to apply custom SVG path specified in `imageMap`, while maintaining other default drawing behavior, thereby having two shapes per node; the default circle, plus custom shape. Example:
```
imageMapActions: {
 'Sample|sennet:sample_category|Organ': {
     fn: 'image',
     color: '#ff0000'
     showMain: true,
     showMainGlow: true,
  }
}
```
`showMain` will maintain the default circle and `showMainGlow` will maintain the default circle glow respectively.  
NOTE: In order to color a specified SVG from path, please make sure that the SVG file has a `fill="$bgColor"` on the tag. If the SVG has a border it can be likewise colored via
`fill="$borderColor"`. This will take on a darker hue than that specified in `color`.

### Legend 
| Parameter               | Type                | Description                                                                                                                                                                                                                  |
|-------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **selectorId**          | *string*            | Should correspond with the `selectorId` of the ProvenanceTree. See above.                                                                                                                                                    |
| **colorMap**            | *object.map.string* | Should correspond with the `colorMap` of the ProvenanceTree. See above.                                                                                                                                                      | 
| **filterNodes**         | *boolean*           | Whether the legend items filter the nodes or not: `true`, `false`. Default: `true`.                                                                                                                                          |
| **actionMap**           | *object.map.object* | Maps a legend `subType` to an action. Example: `{ Activity: { callback: (e, hasToggled, selectorId)=>{}, className: 'some-className', ariaLabel: 'Toggle Activity Nodes' },}`  Creates `Toggle` components as legend action. |
| **className**           | *string*            | A classname to apply the component for custom styling.                                                                                                                                                                       |
| **help**                | *object.map.**      | An object to determine whether to include help menu in legend. Pass `null` to disable.                                                                                                                                       |
| **otherLegend**         | *object.map.object* | An object of other legend items to show. See example usage in `App.js`.                                                                                                                                                      |

### Toggle
| Parameter      | Type       | Description                                                                          |
|----------------|------------|--------------------------------------------------------------------------------------|
| **selectorId** | *string*   | Should correspond with the `selectorId` of the ProvenanceTree. See above.            |
| **className**  | *string*   | A classname to apply the component for custom styling.                               |
| **icon**       | *boolean*  | Whether to use an icon as toggle element or not: `true`, `false`. Default: `true`.   |
| **text**       | *string*   | The label to apply to the Toggle component. Available when `icon` is `false`         |
| **ariaLabel**  | *string*   | Web accessibility aria label                                                         |

## Data Map
| Parameter     | Type                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                           |
|---------------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **delimiter** | *string*                 | Defines the delimiter separating data values. Default: `'/'` .                                                                                                                                                                                                                                                                                                                                                                        |
| **root**      | *object.map.string*      | For setting properties needed in the visual. <br/>Properties:<br/> - `id`: string/required <br/> - `type`: string/optional, default: `'type'` <br/> - `subType`: string/optional, default: `'subType'` <br/> - `text`: string/optional, default: `undefined`                                                                                                                                                                          |      
| **props**     | *object.array.string*    | For capturing common properties from raw data that will be then saved into `properties` which show up in the info panel.                                                                                                                                                                                                                                                                                                              |    
| **typeProps** | *object.map.array*       | For capturing specific properties of `subType` raw data that will be then saved into `properties` which show up in the info panel.                                                                                                                                                                                                                                                                                                    |
| **keys**      | *object.map.*            | Use to specify the names of properties in neo4j data                                                                                                                                                                                                                                                                                                                                                                                  |
| **callbacks** | *object.map.string/func* | Maps properties in raw data to a function. Can specify own functions or the ones provided by the API. These include:<br/>  - `'formatDate'`: Takes a date string and formats to locale string.<br/> - `'formatDateTimestamp'`: Takes a timestamp and formats to locale string. <br/> - `'lastNameFirstInitial'`: Takes a full name and formats to last name then first name initial. Example: `Firstname Lastname` --> `Lastname, F.` |