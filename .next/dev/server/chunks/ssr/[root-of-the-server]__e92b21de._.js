module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[project]/src/lib/js/generic/GraphGeneric.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * Base class with common options.
 * @author dbmi.pitt.edu
 * @param ops Object
 **/ class GraphGeneric {
    constructor(ops = {}){
        this.ops = ops;
        this.token = ops.token;
        this.url = ops.url;
        this.keys = ops.keys || {};
        this.keys.id = this.keys.id || 'uuid';
        this.keys.neighbors = this.keys.neighbors || 'ancestors';
        this.visited = {};
        this.stack = [];
        this.list = ops.list || {};
        this.result = [];
        this.root = null;
    }
    /**
     * Makes a ajax call
     * @param ops {object}
     * @returns {Promise<Graph>}
     */ async service(ops = {}) {
        try {
            let headers = ops.headers || new Headers();
            headers.append('Content-Type', 'application/json');
            if (this.token) {
                headers.append('Authorization', 'Bearer ' + this.token);
            }
            let response = await fetch(ops.url || this.url, {
                method: ops.method || 'GET',
                headers: headers,
                body: ops.body || null
            });
            const result = await response.json();
            if (ops.callback && typeof ops.callback === 'function') {
                ops.callback(result, ops);
            } else {
                this.stack.push(ops.id);
                this.list[ops.id] = this.ops.onAfterServiceResolveResult ? this.ops.onAfterServiceResolveResult(result) : this.getItem(result);
                this.serviced[ops.id] = true;
                this.continueDfs();
            }
        } catch (e) {
            console.error(e);
        }
        return this;
    }
    dfsInit(node) {
        this.root = node;
        const id = node[this.keys.id];
        this.visited[id] = true;
        this.stack.push(id);
        this.list[id] = node;
    }
    /**
     * DFS initialization
     * @param node {object}
     */ dfs(node) {
        this.dfsInit(node);
    }
    continueDfs(ops = {}) {}
    /**
     * Returns an item from object or object array
     * @param obj
     * @returns {*}
     */ getItem(obj) {
        if (typeof obj === 'object') {
            return obj.length ? obj[0] : obj;
        } else {
            return obj;
        }
    }
    appendList(id, obj) {
        if (this.list[id] === undefined) {
            this.list[id] = this.getItem(obj);
        }
    }
    /**
     * Returns result
     * @returns {[]}
     */ getResult() {
        return this.result;
    }
}
const __TURBOPACK__default__export__ = GraphGeneric;
}),
"[project]/src/lib/js/generic/DataGraphGeneric.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/GraphGeneric.js [ssr] (ecmascript)");
;
/**
 * Uses DFS algorithm to gather all data and relationships via ajax calls.
 * @author dbmi.pitt.edu
 *
 **/ class DataGraphGeneric extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"] {
    constructor(ops = {}){
        super(ops);
        this.serviced = {};
        this.storeResult = ops.storeResult || false;
    }
    /**
     * Initializes a dfs setup with promise
     * @param node
     * @returns {Promise<DataGraph>}
     */ async dfsWithPromise(node) {
        this.dfsInit(node);
        this.promisesToAwait = [];
        this.continueDfs();
        return this;
    }
    /**
     * Continues the dfs algorithm with promise
     * @param ops
     * @returns {Promise<DataGraph>}
     */ async continueDfs(ops = {}) {
        while(this.stack.length){
            let current = this.stack.pop();
            let node = this.list[current];
            // Handle
            let neighbors = null;
            if (this.ops.getNeighbors && typeof this.ops.getNeighbors === 'function') {
                neighbors = this.ops.getNeighbors(node);
            } else {
                neighbors = node[this.keys.neighbors];
            }
            if (!neighbors.length && !this.serviced[current] && current !== undefined) {
                const serviceOps = this.ops.getServiceOptions(current, this.url);
                this.promisesToAwait.push(this.service(serviceOps));
            } else {
                if (neighbors.length) {
                    if (this.storeResult) this.result.push(node);
                    neighbors.forEach((function(neighbor, index) {
                        const neighborNode = this.getItem(neighbor);
                        let id = neighborNode[this.keys.id];
                        if (!this.visited[id]) {
                            this.appendList(id, neighborNode);
                            this.visited[id] = true;
                            this.stack.push(id);
                        }
                    }).bind(this));
                } else {
                    node[this.keys.neighbors] = [];
                    if (this.storeResult) this.result.push(node);
                }
            }
        }
        await Promise.all(this.promisesToAwait);
        this.ops.onDataAcquired(this);
        return this;
    }
}
const __TURBOPACK__default__export__ = DataGraphGeneric;
}),
"[project]/src/data/generic/map.sample.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const dataMap = {
    root: {
        id: 'uuid',
        subType: 'entity_type',
        text: 'created_by_user_displayname'
    },
    props: [
        'uuid',
        'sennet_id'
    ],
    typeProps: {
        Source: [
            'source_type'
        ],
        Sample: [
            'sample_category'
        ],
        Activity: [
            'created_timestamp'
        ]
    },
    callbacks: {
        created_timestamp: 'formatDateTimestamp',
        created_by_user_displayname: 'lastNameFirstInitial'
    }
};
const __TURBOPACK__default__export__ = dataMap;
}),
"[project]/src/lib/js/DataConverter.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
class DataConverter {
    static KEY_P_ENTITY = 'entityAsParent';
    static KEY_P_ACT = 'activityAsParent';
    /**
     * Base class of the DataConverters
     * @author dbmi.pitt.edu
     * @param data {object}
     * @param map {object}
     * @param ops {object}
     */ constructor(data, map, ops = {}){
        this.error = null;
        if (!map.root || !map.root.id) {
            this.error = 'Data map must include root and root.id values.';
            console.error(this.error);
            return this;
        }
        this.ops = ops;
        this.data = data;
        this.map = map;
        this.keys = {
            type: this.map.root && this.map.root.type || 'type',
            subType: this.map.root && this.map.root.subType || 'subType'
        };
    }
    /**
     * Set properties that will be displayed in info panel.
     * @param item {object}
     * @param type {string}
     */ setProperties(item, type) {
        item.properties = item.properties || {};
        for (let gProp of this.map.props){
            item.properties[gProp] = item[gProp];
        }
        if (type && typeof this.map.typeProps[type] === 'object') {
            for (let tProp of this.map.typeProps[type]){
                if (item[tProp] !== undefined) {
                    item.properties[tProp] = this.evaluateCallbackOnValue(tProp, item[tProp]);
                }
            }
        }
    }
    /**
     * Runs a callback on a given value
     * @param cb {function}
     * @param val {string}
     * @returns {string}
     */ valueCallback(cb, val) {
        if (typeof cb === 'string') {
            if (typeof this[cb] === 'function') {
                return this[cb](val);
            }
            return val;
        } else {
            try {
                return cb(val);
            } catch (e) {
                console.log(e);
            }
        }
        return val;
    }
    /**
     * Formats a date timestamp.
     * @param val
     * @returns {string}
     */ formatDateTimestamp(val) {
        return new Date(val * 1000).toLocaleString();
    }
    /**
     * Formats a date.
     * @param val
     * @returns {string}
     */ formatDate(val) {
        return new Date(val).toLocaleString();
    }
    /**
     * Formats a given name into "Last name, F." initial format
     * @param val
     * @returns {string|*}
     */ lastNameFirstInitial(val) {
        let name = val.split(' ');
        return name.length > 1 ? `${name[1]}, ${name[0][0]}.` : val;
    }
    /**
     * Determines if a callback should be run.
     * @param prop {string}
     * @param value
     * @returns {string|*}
     */ evaluateCallbackOnValue(prop, value) {
        return this.map.callbacks[prop] ? this.valueCallback(this.map.callbacks[prop], value) : value;
    }
}
const __TURBOPACK__default__export__ = DataConverter;
}),
"[project]/src/lib/js/generic/DataConverterGeneric.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/DataConverter.js [ssr] (ecmascript)");
;
/**
 * A generic converter for data that is already in the form of a hierarchy.
 * @author dbmi.pitt.edu
 */ class DataConverterGeneric extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"] {
    constructor(data, map, ops = {}){
        super(data, map, ops);
        if (this.error) return this;
        this.list = ops.list || {};
    }
    stratify() {
        if (this.error) return this;
        let stack = [
            this.data
        ];
        let visited = {};
        visited[this.data[this.map.root.id]] = true;
        this.result = [];
        while(stack.length){
            let n = stack.pop();
            const id = n[this.map.root.id];
            n = this.list[id] || n;
            n.id = id;
            n.entityAsParent = visited[n.id] ? visited[n.id].id : null;
            n.type = n[this.keys.type] || 'Entity';
            n.subType = n[this.keys.subType] || n.type;
            if (this.map.root.text) {
                n.text = n[this.map.root.text];
            }
            this.setProperties(n, n.subType);
            n._children = this.ops.getNeighbors(n);
            n.children = [];
            if (n._children && n._children.length) {
                for (let c of n._children){
                    const cId = c[this.map.root.id];
                    n.children.push(this.list[cId] || c);
                    if (!visited[cId]) {
                        visited[cId] = n;
                        stack.push(c);
                    }
                }
            }
        }
    }
}
const __TURBOPACK__default__export__ = DataConverterGeneric;
}),
"[project]/src/usage/GenericObject.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$DataGraphGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/DataGraphGeneric.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/GraphGeneric.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__ = __turbopack_context__.i("[externals]/loglevel [external] (loglevel, cjs, [project]/node_modules/loglevel)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$generic$2f$map$2e$sample$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/generic/map.sample.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$DataConverterGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/DataConverterGeneric.js [ssr] (ecmascript)");
;
;
;
;
;
async function GenericObject(serviceOps) {
    const feature = 'generic';
    const { token, url, itemId, getOptions, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = {
        token,
        url,
        keys: {
            neighbors: 'direct_ancestors'
        }
    };
    let data = null;
    const getServiceOptions = (id, url)=>{
        const body = JSON.stringify({
            "query": {
                "bool": {
                    "must": {
                        "match": {
                            "uuid": id
                        }
                    }
                }
            }
        });
        return {
            url: url.replace('{id}', id),
            id,
            body: body,
            method: 'POST'
        };
    };
    const onAfterServiceResolveResult = (result)=>{
        const r = result.hits.hits[0];
        if (r) {
            return r._source;
        } else {
            return result;
        }
    };
    const handleResult = async (result)=>{
        result = onAfterServiceResolveResult(result);
        __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__["default"].debug(`${feature}: Result from fetch`, result);
        const getNeighbors = (node)=>{
            if (!node) return [];
            let neighbors = node[graphOps.keys.neighbors];
            if (!neighbors) {
                neighbors = node['direct_ancestor'] ? [
                    node['direct_ancestor']
                ] : [];
            }
            return neighbors;
        };
        const getRootNode = ()=>{
            return result.length ? result[0] : result;
        };
        const onDataAcquired = (dataGraph)=>{
            __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__["default"].debug(`${feature}: DataGraph`, dataGraph.list);
            const converter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$DataConverterGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"](dataGraph.root, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$generic$2f$map$2e$sample$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                list: dataGraph.list,
                getNeighbors,
                getServiceOptions
            });
            converter.stratify();
            data = {
                root: converter.list[itemId]
            };
            __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__["default"].debug(`${feature}: For visual`, data);
            let ops = getOptions();
            const colorMap = {
                "Dataset": "#8e98cb",
                "Sample": "#ebb5c8",
                "Source": "#ffc255"
            };
            const onEdgeLabel = (d)=>{
                return 'USED';
            };
            const callbacks = {
                onEdgeLabel
            };
            ops = {
                ...ops,
                reverseRelationships: false,
                reverseEdgeLabels: false,
                callbacks,
                dontCheckInitialized: true,
                highlight: [
                    {
                        id: itemId
                    }
                ],
                colorMap
            };
            setOptions(ops);
            setContextData(data);
            setLoading(false);
        };
        // Traverse the data and fetch all neighbors for each node.
        const dataGraph = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$DataGraphGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]({
            ...graphOps,
            getNeighbors,
            onDataAcquired,
            onAfterServiceResolveResult,
            getServiceOptions
        });
        await dataGraph.dfsWithPromise(getRootNode());
    };
    if (token.length && url.length && itemId.length) {
        const graph = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"](graphOps);
        const serviceOps = getServiceOptions(itemId, url);
        serviceOps.callback = handleResult;
        await graph.service(serviceOps);
    }
}
const __TURBOPACK__default__export__ = GenericObject;
}),
"[project]/src/lib/js/neo4j/DataConverterNeo4J.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/DataConverter.js [ssr] (ecmascript)");
;
/**
 * This converts a data object in Neo4J format to an adjacency list that will be later
 * used in d3.stratify to create the hierarchy model.
 * @author dbmi.pitt.edu
 */ class DataConverterNeo4J extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"] {
    constructor(data, map, ops = {}){
        super(data, map, ops);
        if (this.error) return this;
        const keys = this.keys;
        this.keys = {
            activity: this.map.keys && this.map.keys.activity || {
                keyName: 'activity',
                entityName: 'Activity'
            },
            type: keys.type,
            subType: keys.subType,
            nodes: this.map.keys && this.map.keys.nodes || [
                'entity',
                'activity'
            ],
            relationships: this.map.keys && this.map.keys.relationships || {
                // The keys in the data object and the corresponding prop that cross-references the parent entity.
                // Generally:
                // USED starts at activity, ends at entity
                // GENERATED starts at entity, ends at activity
                // So: [E0] <-- used -- [A] <-- gen -- [E1]
                // Therefore:
                //  dict.used[A.id] = E0.id  , this reads: the parent id of a used activity, A, is E0.id
                //  dict.gen[E1.id] = A.id  , this reads: the parent id of gen entity, E1, is A.id
                used: {
                    id: 'prov:activity',
                    val: 'prov:entity'
                },
                wasGeneratedBy: {
                    id: 'prov:entity',
                    val: 'prov:activity'
                },
                // The values of each prop should match above
                dataProps: {
                    used: 'used',
                    generatedBy: 'wasGeneratedBy'
                }
            }
        };
        this.result = [];
        this.list = {};
    }
    /**
     * Retrieves an id from a string value with delimiters
     * @param value
     * @returns {*}
     */ getNodeIdFromValue(value) {
        let parts = value.split(this.map.delimiter || '/');
        return parts[parts.length - 1];
    }
    /**
     * Determines if given key is of activity
     * @param key
     * @returns {boolean}
     */ isActivity(key) {
        return key === this.keys.activity.keyName;
    }
    /**
     * Creates an adjacency list object
     * @param rootId {string}
     * @returns {DataConverterNeo4J}
     */ buildAdjacencyList(rootId) {
        if (this.error) return this;
        this.dict = {};
        let id;
        try {
            const suffix = 'Root';
            const activityId = rootId + suffix + '--' + this.keys.activity.entityName;
            let treeRoot = {
                className: 'is-inserted',
                type: 'Root',
                subType: 'Root',
                id: rootId + suffix,
                activityId: activityId,
                entityAsParent: null,
                activityAsParent: null
            };
            // Create dictionaries for constant time access
            for(let key in this.keys.relationships){
                let data = this.data[key];
                if (data) {
                    let dataKeys = this.keys.relationships[key];
                    this.dict[key] = {};
                    for(let _prop in data){
                        id = this.getNodeIdFromValue(data[_prop][dataKeys.id]);
                        if (!this.dict[key][id]) {
                            this.dict[key][id] = [];
                        }
                        let val = this.getNodeIdFromValue(data[_prop][dataKeys.val]);
                        this.dict[key][id].push(val);
                    }
                }
            }
            for (let key of this.keys.nodes){
                let item;
                let data = this.data[key];
                for(let _prop in data){
                    item = data[_prop];
                    item.type = item[this.keys.type];
                    item.subType = item[this.keys.subType] || item.type;
                    if (this.map.root.text) {
                        item.text = item[this.map.root.text];
                    }
                    id = item[this.map.root.id];
                    item.id = id;
                    const usedKey = this.keys.relationships.dataProps.used;
                    if (this.isActivity(key)) {
                        const used = this.dict[usedKey] ? this.dict[usedKey][id] || [
                            null
                        ] : [
                            null
                        ] // create a [null] for Activity of Source that may point to inserted Root
                        ;
                        for (let eId of used){
                            let _item = JSON.parse(JSON.stringify(item));
                            _item.entityAsParent = eId || treeRoot.id; // (redundant as on toggle the Activities will not be in the dataset anyway
                            _item.activityAsParent = eId || treeRoot.id; // Activities point to entity Id as parent
                            this.setProperties(_item, _item.subType);
                            this.result.push(_item);
                        }
                    } else {
                        // Entity
                        const genKey = this.keys.relationships.dataProps.generatedBy;
                        for (let actId of this.dict[genKey][id]){
                            let _item = JSON.parse(JSON.stringify(item));
                            _item.activityAsParent = actId;
                            const used = this.dict[usedKey] ? this.dict[usedKey][actId] || [
                                null
                            ] : [
                                null
                            ] // create a [null] for Source that may point to inserted Root
                            ;
                            for (let eId of used){
                                let _item2 = JSON.parse(JSON.stringify(_item));
                                _item2.entityAsParent = eId || treeRoot.id;
                                this.setProperties(_item2, _item2.subType);
                                this.result.push(_item2);
                            }
                        }
                    }
                }
            }
            this.result.push(treeRoot);
        } catch (e) {
            console.error(e);
        }
        return this;
    }
}
const __TURBOPACK__default__export__ = DataConverterNeo4J;
}),
"[project]/src/data/neo4j/map.sample.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const dataMap = {
    delimiter: '/',
    root: {
        id: 'sennet:uuid',
        type: 'prov:type',
        subType: 'sennet:entity_type'
    },
    props: [
        'sennet:sennet_id'
    ],
    typeProps: {
        Source: [
            'sennet:source_type'
        ],
        Sample: [
            'sennet:sample_category'
        ],
        Activity: [
            'sennet:created_timestamp',
            'sennet:protocol_url',
            'sennet:processing_information',
            'sennet:created_by_user_displayname'
        ],
        Dataset: [
            'sennet:status',
            'sennet:creation_action'
        ]
    },
    callbacks: {
        'sennet:created_timestamp': 'formatDate'
    }
};
const __TURBOPACK__default__export__ = dataMap;
}),
"[project]/src/usage/Neo4JGraphObject.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__ = __turbopack_context__.i("[externals]/loglevel [external] (loglevel, cjs, [project]/node_modules/loglevel)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/GraphGeneric.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/neo4j/DataConverterNeo4J.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__ = __turbopack_context__.i("[externals]/jquery [external] (jquery, cjs, [project]/node_modules/jquery)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$neo4j$2f$map$2e$sample$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/neo4j/map.sample.js [ssr] (ecmascript)");
;
;
;
;
;
async function Neo4JGraphObject(serviceOps) {
    const feature = 'neo4j';
    const { token, url, getOptions, itemId, setContextData, setLoading, setOptions } = serviceOps;
    const graphOps = {
        token,
        url
    };
    const handleResult = async (result)=>{
        __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__["default"].debug(`${feature}: Result from fetch`, result);
        let keys = [
            'used',
            'wasGeneratedBy'
        ];
        for (let key of keys){
            if (result.descendants) {
                for(let _prop in result.descendants[key]){
                    result[key] = result[key] || {};
                    // Must update key to avoid key collisions with original result.used and result.wasGeneratedBy
                    result[key][`des${_prop}`] = result.descendants[key][_prop];
                }
            }
        }
        if (result.descendants) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"].extend(result.activity, result.descendants.activity);
            __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"].extend(result.entity, result.descendants.entity);
            __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__["default"].debug(`${feature}: Result width appended descendants...`, result);
        }
        const converter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"](result, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$neo4j$2f$map$2e$sample$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]);
        converter.buildAdjacencyList(itemId);
        __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__["default"].debug('Converter details...', converter);
        setContextData({
            stratify: converter.result
        });
        let ops = getOptions();
        const colorMap = {
            "Dataset": "#8ecb93",
            "DatasetComponent": "#8ecb93",
            "Activity": "#f16766",
            "Sample": "#ebb5c8",
            "Source": "#ffc255"
        };
        const imageMap = {
            "Sample|sennet:sample_category|Organ": '/images/shapes/triangle.svg',
            "Dataset|sennet:creation_action|Multi-Assay Split": null,
            "Source": null
        };
        const imageMapActions = {
            "Sample|sennet:sample_category|Organ": {
                fn: 'append',
                type: 'image',
                color: '#ff0000',
                showMain: true,
                showMainGlow: true
            },
            "Dataset|sennet:creation_action|Multi-Assay Split": {
                fn: 'append',
                color: '#00ff00',
                type: 'g',
                data: [
                    {
                        tag: 'polygon',
                        property: 'points',
                        draw: '1,27.9 15,1.1 29,27.9'
                    }
                ]
            }
        };
        ops.propertyPrefixClear = 'sennet:';
        ops.displayEdgeLabels = false;
        ops = {
            ...ops,
            highlight: [
                {
                    id: itemId
                }
            ],
            colorMap,
            imageMap,
            imageMapActions,
            initParentKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].KEY_P_ENTITY
        };
        setOptions(ops);
        setLoading(false);
    };
    if (url?.length && itemId.length) {
        const graph = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"](graphOps);
        return graph.service({
            callback: handleResult,
            url: url.replace('{id}', itemId),
            headers: serviceOps.getOptions().headers
        });
    }
}
const __TURBOPACK__default__export__ = Neo4JGraphObject;
}),
"[project]/src/context/AppContext.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__ = __turbopack_context__.i("[externals]/loglevel [external] (loglevel, cjs, [project]/node_modules/loglevel)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$usage$2f$GenericObject$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/usage/GenericObject.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$usage$2f$Neo4JGraphObject$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/usage/Neo4JGraphObject.js [ssr] (ecmascript)");
;
;
;
;
;
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])({});
const AppProvider = ({ children })=>{
    const [contextData, setContextData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const initialized = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (initialized.current) return;
        initialized.current = true;
        const logLevel = ("TURBOPACK compile-time value", "debug");
        __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__["default"].setLevel(logLevel || 'silent');
        const token = ("TURBOPACK compile-time value", "Ag37nBJa97l1QYYnqNV3p6Eo4BBEkWJ4r0gow8eBzPl9aQYea2FVCO1xXmk3p6qEBOvXN84lG98yJeUdMDEaVi7jeeb");
        const url = ("TURBOPACK compile-time value", "https://entity-api.dev.sennetconsortium.org/entities/{id}/provenance?return_descendants=true");
        const itemId = ("TURBOPACK compile-time value", "97d0f8706bb360665788d68d72073bd0");
        const feature = ("TURBOPACK compile-time value", "neo4j");
        const jsonView = (d, property, value)=>{
            return {
                href: `/api/json?view=${btoa(value)}`,
                value: `${value.substr(0, 20)}...}`
            };
        };
        const getOptions = ()=>{
            let ops = process.env.NEXT_PUBLIC_OPTIONS;
            __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__["default"].debug('Environment options', ops);
            try {
                if (ops) {
                    return JSON.parse(ops);
                }
            } catch (e) {
                __TURBOPACK__imported__module__$5b$externals$5d2f$loglevel__$5b$external$5d$__$28$loglevel$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$loglevel$29$__["default"].debug('Issue parsing options', e);
            }
            return {
                includeStyles: true,
                callbacks: {
                    onNodeBuild: (d)=>{
                        console.log(d);
                    },
                    onNodeCssClass: (d)=>{
                        if (d.data.properties && d.data.properties['sennet:creation_action']) {
                            return 'node--' + d.data.properties['sennet:creation_action'].replaceAll(' ', '');
                        }
                        return '';
                    },
                    onCenterY: (args)=>{
                        return args.options.graphDepth / 2;
                    },
                    onAfterInfoUpdateBuild: (args)=>{
                        console.log('Build info');
                    }
                },
                simulation: {
                    charge: -100
                },
                minHeight: 600,
                idNavigate: {
                    props: {
                        'sennet:sennet_id': true,
                        'sennet:protocol_url': true,
                        'sennet:processing_information': {
                            callback: jsonView
                        }
                    },
                    url: 'https://data.dev.sennetconsortium.org/{subType}?uuid={id}',
                    exclude: {
                        Activity: [
                            'sennet:sennet_id'
                        ]
                    }
                }
            };
        };
        const handleFeature = async (fn)=>{
            setLoading(true);
            await fn({
                token,
                url,
                itemId,
                getOptions,
                setOptions,
                setContextData,
                setLoading
            });
        };
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else if ("TURBOPACK compile-time truthy", 1) {
            handleFeature(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$usage$2f$Neo4JGraphObject$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]);
        } else //TURBOPACK unreachable
        ;
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            contextData,
            setContextData,
            loading,
            options
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AppContext.jsx",
        lineNumber: 101,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = AppContext;
}),
"[project]/src/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.jsx [ssr] (ecmascript)");
;
;
;
function App({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["AppProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
            ...pageProps
        }, void 0, false, {
            fileName: "[project]/src/pages/_app.js",
            lineNumber: 5,
            columnNumber: 23
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/_app.js",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
}),
"[externals]/loglevel [external] (loglevel, cjs, [project]/node_modules/loglevel)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("loglevel-697c1d9685a712ec", () => require("loglevel-697c1d9685a712ec"));

module.exports = mod;
}),
"[externals]/jquery [external] (jquery, cjs, [project]/node_modules/jquery)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("jquery-90942c3e69109e20", () => require("jquery-90942c3e69109e20"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e92b21de._.js.map