# Provenance UI

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Watch and build CSS files:

### `npm run css`

## Preparing Your Data

## Using Provenance component 
```
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
<ProvenanceUI options={options} data={data} />
```
