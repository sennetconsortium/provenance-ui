(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
;
;
;
function connect(param) {
    var addMessageListener = param.addMessageListener, sendMessage = param.sendMessage, _param_onUpdateError = param.onUpdateError, onUpdateError = _param_onUpdateError === void 0 ? console.error : _param_onUpdateError;
    addMessageListener(function(msg) {
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(var i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    var queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: function(param) {
            var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(param, 2), chunkPath = _param[0], callback = _param[1];
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = queued[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], callback = _step_value[1];
                subscribeToChunkUpdate(chunkPath, sendMessage, callback);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}
var updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
        type: 'turbopack-subscribe'
    }, resource));
    return function() {
        sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
            type: 'turbopack-unsubscribe'
        }, resource));
    };
}
function handleSocketConnected(sendMessage) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = updateCallbackSets.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            subscribeToUpdates(sendMessage, JSON.parse(key));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
// we aggregate all pending updates until the issues are resolved
var chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    var key = resourceKey(msg.resource);
    var aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunkListsWithPendingUpdates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var msg = _step.value;
            triggerUpdate(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    var chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    var merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            var update = updateA.merged[0];
            for(var i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(var i1 = 0; i1 < updateB.merged.length; i1++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i1]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks: chunks,
        merged: merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    var entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    var chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries: entries,
        chunks: chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, entriesA, entriesB);
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        var _updateA_modules, _updateB_modules;
        var added = [];
        var deleted = [];
        var deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = addedModules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var moduleId = _step.value;
                if (!deletedModules.has(moduleId)) {
                    added.push(moduleId);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = deletedModules[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var moduleId1 = _step1.value;
                if (!addedModules.has(moduleId1)) {
                    deleted.push(moduleId1);
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added: added,
            deleted: deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added, _updateA_deleted, _updateB_deleted;
        var added1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : [])));
        var deleted1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : [])));
        if (updateB.added != null) {
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = updateB.added[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var moduleId2 = _step2.value;
                    deleted1.delete(moduleId2);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        if (updateB.deleted != null) {
            var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
            try {
                for(var _iterator3 = updateB.deleted[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                    var moduleId3 = _step3.value;
                    added1.delete(moduleId3);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                        _iterator3.return();
                    }
                } finally{
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
        return {
            type: 'partial',
            added: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(added1),
            deleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(deleted1)
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1, _updateB_deleted1;
        var modules = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : [])));
        var _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = undefined;
        try {
            for(var _iterator4 = ((_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : [])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true){
                var moduleId4 = _step4.value;
                modules.delete(moduleId4);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                }
            } finally{
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
        return {
            type: 'added',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules)
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        var modules1 = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            var _iteratorNormalCompletion5 = true, _didIteratorError5 = false, _iteratorError5 = undefined;
            try {
                for(var _iterator5 = updateA.added[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true){
                    var moduleId5 = _step5.value;
                    modules1.delete(moduleId5);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                        _iterator5.return();
                    }
                } finally{
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
        return {
            type: 'deleted',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules1)
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
var CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    var aI = list.indexOf(a) + 1 || list.length;
    var bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
var chunksWithIssues = new Map();
function emitIssues() {
    var issues = [];
    var deduplicationSet = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunksWithIssues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), _ = _step_value[0], chunkIssues = _step_value[1];
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = chunkIssues[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var chunkIssue = _step1.value;
                    if (deduplicationSet.has(chunkIssue.formatted)) continue;
                    issues.push(chunkIssue);
                    deduplicationSet.add(chunkIssue.formatted);
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    var key = resourceKey(msg.resource);
    var hasCriticalIssues = false;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = msg.issues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var issue = _step.value;
            if (CRITICAL.includes(issue.severity)) {
                hasCriticalIssues = true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
var SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
var CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort(function(a, b) {
        var first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
var hooks = {
    beforeRefresh: function() {},
    refresh: function() {},
    buildOk: function() {},
    issues: function(_issues) {}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            var runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    var key = resourceKey(resource);
    var callbackSet;
    var existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return function() {
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    var key = resourceKey(msg.resource);
    var callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = callbackSet.callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var callback = _step.value;
            callback(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/src/lib/js/generic/GraphGeneric.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_class_call_check.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_create_class.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
;
;
;
;
;
/**
 * Base class with common options.
 * @author dbmi.pitt.edu
 * @param ops Object
 **/ var GraphGeneric = /*#__PURE__*/ function() {
    "use strict";
    function GraphGeneric() {
        var ops = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(this, GraphGeneric);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(GraphGeneric, [
        {
            key: "service",
            value: /**
     * Makes a ajax call
     * @param ops {object}
     * @returns {Promise<Graph>}
     */ function service() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var ops, headers, response, result, e;
                    var _arguments = arguments;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                ops = _arguments.length > 0 && _arguments[0] !== void 0 ? _arguments[0] : {};
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    4,
                                    ,
                                    5
                                ]);
                                headers = ops.headers || new Headers();
                                headers.append('Content-Type', 'application/json');
                                if (this.token) {
                                    headers.append('Authorization', 'Bearer ' + this.token);
                                }
                                return [
                                    4,
                                    fetch(ops.url || this.url, {
                                        method: ops.method || 'GET',
                                        headers: headers,
                                        body: ops.body || null
                                    })
                                ];
                            case 2:
                                response = _state.sent();
                                return [
                                    4,
                                    response.json()
                                ];
                            case 3:
                                result = _state.sent();
                                if (ops.callback && typeof ops.callback === 'function') {
                                    ops.callback(result, ops);
                                } else {
                                    this.stack.push(ops.id);
                                    this.list[ops.id] = this.ops.onAfterServiceResolveResult ? this.ops.onAfterServiceResolveResult(result) : this.getItem(result);
                                    this.serviced[ops.id] = true;
                                    this.continueDfs();
                                }
                                return [
                                    3,
                                    5
                                ];
                            case 4:
                                e = _state.sent();
                                console.error(e);
                                return [
                                    3,
                                    5
                                ];
                            case 5:
                                return [
                                    2,
                                    this
                                ];
                        }
                    });
                }).apply(this, arguments);
            }
        },
        {
            key: "dfsInit",
            value: function dfsInit(node) {
                this.root = node;
                var id = node[this.keys.id];
                this.visited[id] = true;
                this.stack.push(id);
                this.list[id] = node;
            }
        },
        {
            /**
     * DFS initialization
     * @param node {object}
     */ key: "dfs",
            value: function dfs(node) {
                this.dfsInit(node);
            }
        },
        {
            key: "continueDfs",
            value: function continueDfs() {
                var ops = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            }
        },
        {
            /**
     * Returns an item from object or object array
     * @param obj
     * @returns {*}
     */ key: "getItem",
            value: function getItem(obj) {
                if ((typeof obj === "undefined" ? "undefined" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(obj)) === 'object') {
                    return obj.length ? obj[0] : obj;
                } else {
                    return obj;
                }
            }
        },
        {
            key: "appendList",
            value: function appendList(id, obj) {
                if (this.list[id] === undefined) {
                    this.list[id] = this.getItem(obj);
                }
            }
        },
        {
            /**
     * Returns result
     * @returns {[]}
     */ key: "getResult",
            value: function getResult() {
                return this.result;
            }
        }
    ]);
    return GraphGeneric;
}();
const __TURBOPACK__default__export__ = GraphGeneric;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/js/generic/DataGraphGeneric.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_call_super.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_class_call_check.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_create_class.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_inherits.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/GraphGeneric.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Uses DFS algorithm to gather all data and relationships via ajax calls.
 * @author dbmi.pitt.edu
 *
 **/ var DataGraphGeneric = /*#__PURE__*/ function(GraphGeneric) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(DataGraphGeneric, GraphGeneric);
    function DataGraphGeneric() {
        var ops = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(this, DataGraphGeneric);
        var _this;
        _this = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(this, DataGraphGeneric, [
            ops
        ]);
        _this.serviced = {};
        _this.storeResult = ops.storeResult || false;
        return _this;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(DataGraphGeneric, [
        {
            key: "dfsWithPromise",
            value: /**
     * Initializes a dfs setup with promise
     * @param node
     * @returns {Promise<DataGraph>}
     */ function dfsWithPromise(node) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        this.dfsInit(node);
                        this.promisesToAwait = [];
                        this.continueDfs();
                        return [
                            2,
                            this
                        ];
                    });
                }).call(this);
            }
        },
        {
            key: "continueDfs",
            value: /**
     * Continues the dfs algorithm with promise
     * @param ops
     * @returns {Promise<DataGraph>}
     */ function continueDfs() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var ops, current, node, neighbors, serviceOps;
                    var _arguments = arguments;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                ops = _arguments.length > 0 && _arguments[0] !== void 0 ? _arguments[0] : {};
                                while(this.stack.length){
                                    current = this.stack.pop();
                                    node = this.list[current];
                                    // Handle
                                    neighbors = null;
                                    if (this.ops.getNeighbors && typeof this.ops.getNeighbors === 'function') {
                                        neighbors = this.ops.getNeighbors(node);
                                    } else {
                                        neighbors = node[this.keys.neighbors];
                                    }
                                    if (!neighbors.length && !this.serviced[current] && current !== undefined) {
                                        serviceOps = this.ops.getServiceOptions(current, this.url);
                                        this.promisesToAwait.push(this.service(serviceOps));
                                    } else {
                                        if (neighbors.length) {
                                            if (this.storeResult) this.result.push(node);
                                            neighbors.forEach((function(neighbor, index) {
                                                var neighborNode = this.getItem(neighbor);
                                                var id = neighborNode[this.keys.id];
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
                                return [
                                    4,
                                    Promise.all(this.promisesToAwait)
                                ];
                            case 1:
                                _state.sent();
                                this.ops.onDataAcquired(this);
                                return [
                                    2,
                                    this
                                ];
                        }
                    });
                }).apply(this, arguments);
            }
        }
    ]);
    return DataGraphGeneric;
}(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = DataGraphGeneric;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/generic/map.sample.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
;
var dataMap = {
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
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/js/DataConverter.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_class_call_check.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_create_class.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
;
;
;
;
var DataConverter = /*#__PURE__*/ function() {
    "use strict";
    function DataConverter(data, map) {
        var ops = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(this, DataConverter);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(DataConverter, [
        {
            /**
     * Set properties that will be displayed in info panel.
     * @param item {object}
     * @param type {string}
     */ key: "setProperties",
            value: function setProperties(item, type) {
                item.properties = item.properties || {};
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.map.props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var gProp = _step.value;
                        item.properties[gProp] = item[gProp];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                if (type && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(this.map.typeProps[type]) === 'object') {
                    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                    try {
                        for(var _iterator1 = this.map.typeProps[type][Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                            var tProp = _step1.value;
                            if (item[tProp] !== undefined) {
                                item.properties[tProp] = this.evaluateCallbackOnValue(tProp, item[tProp]);
                            }
                        }
                    } catch (err) {
                        _didIteratorError1 = true;
                        _iteratorError1 = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                _iterator1.return();
                            }
                        } finally{
                            if (_didIteratorError1) {
                                throw _iteratorError1;
                            }
                        }
                    }
                }
            }
        },
        {
            /**
     * Runs a callback on a given value
     * @param cb {function}
     * @param val {string}
     * @returns {string}
     */ key: "valueCallback",
            value: function valueCallback(cb, val) {
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
        },
        {
            /**
     * Formats a date timestamp.
     * @param val
     * @returns {string}
     */ key: "formatDateTimestamp",
            value: function formatDateTimestamp(val) {
                return new Date(val * 1000).toLocaleString();
            }
        },
        {
            /**
     * Formats a date.
     * @param val
     * @returns {string}
     */ key: "formatDate",
            value: function formatDate(val) {
                return new Date(val).toLocaleString();
            }
        },
        {
            /**
     * Formats a given name into "Last name, F." initial format
     * @param val
     * @returns {string|*}
     */ key: "lastNameFirstInitial",
            value: function lastNameFirstInitial(val) {
                var name = val.split(' ');
                return name.length > 1 ? "".concat(name[1], ", ").concat(name[0][0], ".") : val;
            }
        },
        {
            /**
     * Determines if a callback should be run.
     * @param prop {string}
     * @param value
     * @returns {string|*}
     */ key: "evaluateCallbackOnValue",
            value: function evaluateCallbackOnValue(prop, value) {
                return this.map.callbacks[prop] ? this.valueCallback(this.map.callbacks[prop], value) : value;
            }
        }
    ]);
    return DataConverter;
}();
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(DataConverter, "KEY_P_ENTITY", 'entityAsParent');
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(DataConverter, "KEY_P_ACT", 'activityAsParent');
const __TURBOPACK__default__export__ = DataConverter;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/js/generic/DataConverterGeneric.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_call_super.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_class_call_check.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_create_class.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_inherits.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_possible_constructor_return$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_possible_constructor_return.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/DataConverter.js [client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * A generic converter for data that is already in the form of a hierarchy.
 * @author dbmi.pitt.edu
 */ var DataConverterGeneric = /*#__PURE__*/ function(DataConverter) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(DataConverterGeneric, DataConverter);
    function DataConverterGeneric(data, map) {
        var ops = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(this, DataConverterGeneric);
        var _this;
        _this = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(this, DataConverterGeneric, [
            data,
            map,
            ops
        ]);
        if (_this.error) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_possible_constructor_return$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_this, _this);
        _this.list = ops.list || {};
        return _this;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(DataConverterGeneric, [
        {
            key: "stratify",
            value: function stratify() {
                if (this.error) return this;
                var stack = [
                    this.data
                ];
                var visited = {};
                visited[this.data[this.map.root.id]] = true;
                this.result = [];
                while(stack.length){
                    var n = stack.pop();
                    var id = n[this.map.root.id];
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
                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        try {
                            for(var _iterator = n._children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                var c = _step.value;
                                var cId = c[this.map.root.id];
                                n.children.push(this.list[cId] || c);
                                if (!visited[cId]) {
                                    visited[cId] = n;
                                    stack.push(c);
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }
            }
        }
    ]);
    return DataConverterGeneric;
}(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = DataConverterGeneric;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/usage/GenericObject.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$DataGraphGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/DataGraphGeneric.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/GraphGeneric.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/loglevel/lib/loglevel.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$generic$2f$map$2e$sample$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/generic/map.sample.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$DataConverterGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/DataConverterGeneric.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
function GenericObject(serviceOps) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
        var feature, token, url, itemId, getOptions, setContextData, setLoading, setOptions, graphOps, data, getServiceOptions, onAfterServiceResolveResult, handleResult, graph, _$serviceOps;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
            switch(_state.label){
                case 0:
                    feature = 'generic';
                    token = serviceOps.token, url = serviceOps.url, itemId = serviceOps.itemId, getOptions = serviceOps.getOptions, setContextData = serviceOps.setContextData, setLoading = serviceOps.setLoading, setOptions = serviceOps.setOptions;
                    graphOps = {
                        token: token,
                        url: url,
                        keys: {
                            neighbors: 'direct_ancestors'
                        }
                    };
                    data = null;
                    getServiceOptions = function(id, url) {
                        var body = JSON.stringify({
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
                            id: id,
                            body: body,
                            method: 'POST'
                        };
                    };
                    onAfterServiceResolveResult = function(result) {
                        var r = result.hits.hits[0];
                        if (r) {
                            return r._source;
                        } else {
                            return result;
                        }
                    };
                    handleResult = function(result) {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                            var getNeighbors, getRootNode, onDataAcquired, dataGraph;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        result = onAfterServiceResolveResult(result);
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].debug("".concat(feature, ": Result from fetch"), result);
                                        getNeighbors = function(node) {
                                            if (!node) return [];
                                            var neighbors = node[graphOps.keys.neighbors];
                                            if (!neighbors) {
                                                neighbors = node['direct_ancestor'] ? [
                                                    node['direct_ancestor']
                                                ] : [];
                                            }
                                            return neighbors;
                                        };
                                        getRootNode = function() {
                                            return result.length ? result[0] : result;
                                        };
                                        onDataAcquired = function(dataGraph) {
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].debug("".concat(feature, ": DataGraph"), dataGraph.list);
                                            var converter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$DataConverterGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"](dataGraph.root, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$generic$2f$map$2e$sample$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                list: dataGraph.list,
                                                getNeighbors: getNeighbors,
                                                getServiceOptions: getServiceOptions
                                            });
                                            converter.stratify();
                                            data = {
                                                root: converter.list[itemId]
                                            };
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].debug("".concat(feature, ": For visual"), data);
                                            var ops = getOptions();
                                            var colorMap = {
                                                "Dataset": "#8e98cb",
                                                "Sample": "#ebb5c8",
                                                "Source": "#ffc255"
                                            };
                                            var onEdgeLabel = function(d) {
                                                return 'USED';
                                            };
                                            var callbacks = {
                                                onEdgeLabel: onEdgeLabel
                                            };
                                            ops = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, ops), {
                                                reverseRelationships: false,
                                                reverseEdgeLabels: false,
                                                callbacks: callbacks,
                                                dontCheckInitialized: true,
                                                highlight: [
                                                    {
                                                        id: itemId
                                                    }
                                                ],
                                                colorMap: colorMap
                                            });
                                            setOptions(ops);
                                            setContextData(data);
                                            setLoading(false);
                                        };
                                        // Traverse the data and fetch all neighbors for each node.
                                        dataGraph = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$DataGraphGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, graphOps), {
                                            getNeighbors: getNeighbors,
                                            onDataAcquired: onDataAcquired,
                                            onAfterServiceResolveResult: onAfterServiceResolveResult,
                                            getServiceOptions: getServiceOptions
                                        }));
                                        return [
                                            4,
                                            dataGraph.dfsWithPromise(getRootNode())
                                        ];
                                    case 1:
                                        _state.sent();
                                        return [
                                            2
                                        ];
                                }
                            });
                        })();
                    };
                    if (!(token.length && url.length && itemId.length)) return [
                        3,
                        2
                    ];
                    graph = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"](graphOps);
                    _$serviceOps = getServiceOptions(itemId, url);
                    _$serviceOps.callback = handleResult;
                    return [
                        4,
                        graph.service(_$serviceOps)
                    ];
                case 1:
                    _state.sent();
                    _state.label = 2;
                case 2:
                    return [
                        2
                    ];
            }
        });
    })();
}
_c = GenericObject;
const __TURBOPACK__default__export__ = GenericObject;
var _c;
__turbopack_context__.k.register(_c, "GenericObject");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/js/neo4j/DataConverterNeo4J.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_call_super.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_class_call_check.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_create_class.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_inherits.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_possible_constructor_return$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_possible_constructor_return.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/DataConverter.js [client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * This converts a data object in Neo4J format to an adjacency list that will be later
 * used in d3.stratify to create the hierarchy model.
 * @author dbmi.pitt.edu
 */ var DataConverterNeo4J = /*#__PURE__*/ function(DataConverter) {
    "use strict";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_inherits$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(DataConverterNeo4J, DataConverter);
    function DataConverterNeo4J(data, map) {
        var ops = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_call_check$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(this, DataConverterNeo4J);
        var _this;
        _this = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_call_super$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(this, DataConverterNeo4J, [
            data,
            map,
            ops
        ]);
        if (_this.error) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_possible_constructor_return$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_this, _this);
        var keys = _this.keys;
        _this.keys = {
            activity: _this.map.keys && _this.map.keys.activity || {
                keyName: 'activity',
                entityName: 'Activity'
            },
            type: keys.type,
            subType: keys.subType,
            nodes: _this.map.keys && _this.map.keys.nodes || [
                'entity',
                'activity'
            ],
            relationships: _this.map.keys && _this.map.keys.relationships || {
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
        _this.result = [];
        _this.list = {};
        return _this;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_create_class$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(DataConverterNeo4J, [
        {
            /**
     * Retrieves an id from a string value with delimiters
     * @param value
     * @returns {*}
     */ key: "getNodeIdFromValue",
            value: function getNodeIdFromValue(value) {
                var parts = value.split(this.map.delimiter || '/');
                return parts[parts.length - 1];
            }
        },
        {
            /**
     * Determines if given key is of activity
     * @param key
     * @returns {boolean}
     */ key: "isActivity",
            value: function isActivity(key) {
                return key === this.keys.activity.keyName;
            }
        },
        {
            /**
     * Creates an adjacency list object
     * @param rootId {string}
     * @returns {DataConverterNeo4J}
     */ key: "buildAdjacencyList",
            value: function buildAdjacencyList(rootId) {
                if (this.error) return this;
                this.dict = {};
                var id;
                try {
                    var suffix = 'Root';
                    var activityId = rootId + suffix + '--' + this.keys.activity.entityName;
                    var treeRoot = {
                        className: 'is-inserted',
                        type: 'Root',
                        subType: 'Root',
                        id: rootId + suffix,
                        activityId: activityId,
                        entityAsParent: null,
                        activityAsParent: null
                    };
                    // Create dictionaries for constant time access
                    for(var key in this.keys.relationships){
                        var data = this.data[key];
                        if (data) {
                            var dataKeys = this.keys.relationships[key];
                            this.dict[key] = {};
                            for(var _prop in data){
                                id = this.getNodeIdFromValue(data[_prop][dataKeys.id]);
                                if (!this.dict[key][id]) {
                                    this.dict[key][id] = [];
                                }
                                var val = this.getNodeIdFromValue(data[_prop][dataKeys.val]);
                                this.dict[key][id].push(val);
                            }
                        }
                    }
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this.keys.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var key1 = _step.value;
                            var item = void 0;
                            var data1 = this.data[key1];
                            for(var _prop1 in data1){
                                item = data1[_prop1];
                                item.type = item[this.keys.type];
                                item.subType = item[this.keys.subType] || item.type;
                                if (this.map.root.text) {
                                    item.text = item[this.map.root.text];
                                }
                                id = item[this.map.root.id];
                                item.id = id;
                                var usedKey = this.keys.relationships.dataProps.used;
                                if (this.isActivity(key1)) {
                                    var used = this.dict[usedKey] ? this.dict[usedKey][id] || [
                                        null
                                    ] : [
                                        null
                                    ] // create a [null] for Activity of Source that may point to inserted Root
                                    ;
                                    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                                    try {
                                        for(var _iterator1 = used[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                            var eId = _step1.value;
                                            var _item = JSON.parse(JSON.stringify(item));
                                            _item.entityAsParent = eId || treeRoot.id; // (redundant as on toggle the Activities will not be in the dataset anyway
                                            _item.activityAsParent = eId || treeRoot.id; // Activities point to entity Id as parent
                                            this.setProperties(_item, _item.subType);
                                            this.result.push(_item);
                                        }
                                    } catch (err) {
                                        _didIteratorError1 = true;
                                        _iteratorError1 = err;
                                    } finally{
                                        try {
                                            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                                _iterator1.return();
                                            }
                                        } finally{
                                            if (_didIteratorError1) {
                                                throw _iteratorError1;
                                            }
                                        }
                                    }
                                } else {
                                    // Entity
                                    var genKey = this.keys.relationships.dataProps.generatedBy;
                                    var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
                                    try {
                                        for(var _iterator2 = this.dict[genKey][id][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                                            var actId = _step2.value;
                                            var _item1 = JSON.parse(JSON.stringify(item));
                                            _item1.activityAsParent = actId;
                                            var used1 = this.dict[usedKey] ? this.dict[usedKey][actId] || [
                                                null
                                            ] : [
                                                null
                                            ] // create a [null] for Source that may point to inserted Root
                                            ;
                                            var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
                                            try {
                                                for(var _iterator3 = used1[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                                                    var eId1 = _step3.value;
                                                    var _item2 = JSON.parse(JSON.stringify(_item1));
                                                    _item2.entityAsParent = eId1 || treeRoot.id;
                                                    this.setProperties(_item2, _item2.subType);
                                                    this.result.push(_item2);
                                                }
                                            } catch (err) {
                                                _didIteratorError3 = true;
                                                _iteratorError3 = err;
                                            } finally{
                                                try {
                                                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                                        _iterator3.return();
                                                    }
                                                } finally{
                                                    if (_didIteratorError3) {
                                                        throw _iteratorError3;
                                                    }
                                                }
                                            }
                                        }
                                    } catch (err) {
                                        _didIteratorError2 = true;
                                        _iteratorError2 = err;
                                    } finally{
                                        try {
                                            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                                _iterator2.return();
                                            }
                                        } finally{
                                            if (_didIteratorError2) {
                                                throw _iteratorError2;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
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
    ]);
    return DataConverterNeo4J;
}(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = DataConverterNeo4J;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/neo4j/map.sample.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
;
var dataMap = {
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
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/usage/Neo4JGraphObject.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/loglevel/lib/loglevel.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/generic/GraphGeneric.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/neo4j/DataConverterNeo4J.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jquery/dist/jquery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$neo4j$2f$map$2e$sample$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/neo4j/map.sample.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
function Neo4JGraphObject(serviceOps) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
        var feature, token, url, getOptions, itemId, setContextData, setLoading, setOptions, graphOps, handleResult, graph;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
            feature = 'neo4j';
            token = serviceOps.token, url = serviceOps.url, getOptions = serviceOps.getOptions, itemId = serviceOps.itemId, setContextData = serviceOps.setContextData, setLoading = serviceOps.setLoading, setOptions = serviceOps.setOptions;
            graphOps = {
                token: token,
                url: url
            };
            handleResult = function(result) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                    var keys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, _prop, converter, ops, colorMap, imageMap, imageMapActions;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].debug("".concat(feature, ": Result from fetch"), result);
                        keys = [
                            'used',
                            'wasGeneratedBy'
                        ];
                        _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        try {
                            for(_iterator = keys[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                key = _step.value;
                                if (result.descendants) {
                                    for(var _prop in result.descendants[key]){
                                        result[key] = result[key] || {};
                                        // Must update key to avoid key collisions with original result.used and result.wasGeneratedBy
                                        result[key]["des".concat(_prop)] = result.descendants[key][_prop];
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        if (result.descendants) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].extend(result.activity, result.descendants.activity);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].extend(result.entity, result.descendants.entity);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].debug("".concat(feature, ": Result width appended descendants..."), result);
                        }
                        converter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"](result, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$neo4j$2f$map$2e$sample$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]);
                        converter.buildAdjacencyList(itemId);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].debug('Converter details...', converter);
                        setContextData({
                            stratify: converter.result
                        });
                        ops = getOptions();
                        colorMap = {
                            "Dataset": "#8ecb93",
                            "DatasetComponent": "#8ecb93",
                            "Activity": "#f16766",
                            "Sample": "#ebb5c8",
                            "Source": "#ffc255"
                        };
                        imageMap = {
                            "Sample|sennet:sample_category|Organ": '/images/shapes/triangle.svg',
                            "Dataset|sennet:creation_action|Multi-Assay Split": null,
                            "Source": null
                        };
                        imageMapActions = {
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
                        ops = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, ops), {
                            highlight: [
                                {
                                    id: itemId
                                }
                            ],
                            colorMap: colorMap,
                            imageMap: imageMap,
                            imageMapActions: imageMapActions,
                            initParentKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].KEY_P_ENTITY
                        });
                        setOptions(ops);
                        setLoading(false);
                        return [
                            2
                        ];
                    });
                })();
            };
            if ((url === null || url === void 0 ? void 0 : url.length) && itemId.length) {
                graph = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$generic$2f$GraphGeneric$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"](graphOps);
                return [
                    2,
                    graph.service({
                        callback: handleResult,
                        url: url.replace('{id}', itemId),
                        headers: serviceOps.getOptions().headers
                    })
                ];
            }
            return [
                2
            ];
        });
    })();
}
_c = Neo4JGraphObject;
const __TURBOPACK__default__export__ = Neo4JGraphObject;
var _c;
__turbopack_context__.k.register(_c, "Neo4JGraphObject");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/AppContext.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/loglevel/lib/loglevel.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$usage$2f$GenericObject$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/usage/GenericObject.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$usage$2f$Neo4JGraphObject$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/usage/Neo4JGraphObject.js [client] (ecmascript)");
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
var AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])({});
var AppProvider = function(param) {
    var children = param.children;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), contextData = _useState[0], setContextData = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), loading = _useState1[0], setLoading = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({}), 2), options = _useState2[0], setOptions = _useState2[1];
    var initialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": function() {
            if (initialized.current) return;
            initialized.current = true;
            var logLevel = ("TURBOPACK compile-time value", "debug");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].setLevel(logLevel || 'silent');
            var token = ("TURBOPACK compile-time value", "Ag37nBJa97l1QYYnqNV3p6Eo4BBEkWJ4r0gow8eBzPl9aQYea2FVCO1xXmk3p6qEBOvXN84lG98yJeUdMDEaVi7jeeb");
            var url = ("TURBOPACK compile-time value", "https://entity-api.dev.sennetconsortium.org/entities/{id}/provenance?return_descendants=true");
            var itemId = ("TURBOPACK compile-time value", "97d0f8706bb360665788d68d72073bd0");
            var feature = ("TURBOPACK compile-time value", "neo4j");
            var jsonView = {
                "AppProvider.useEffect.jsonView": function(d, property, value) {
                    return {
                        href: "/api/json?view=".concat(btoa(value)),
                        value: "".concat(value.substr(0, 20), "...}")
                    };
                }
            }["AppProvider.useEffect.jsonView"];
            var getOptions = {
                "AppProvider.useEffect.getOptions": function() {
                    var ops = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_OPTIONS;
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].debug('Environment options', ops);
                    try {
                        if (ops) {
                            return JSON.parse(ops);
                        }
                    } catch (e) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$loglevel$2f$lib$2f$loglevel$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].debug('Issue parsing options', e);
                    }
                    return {
                        includeStyles: true,
                        callbacks: {
                            onNodeBuild: ({
                                "AppProvider.useEffect.getOptions": function(d) {
                                    console.log(d);
                                }
                            })["AppProvider.useEffect.getOptions"],
                            onNodeCssClass: ({
                                "AppProvider.useEffect.getOptions": function(d) {
                                    if (d.data.properties && d.data.properties['sennet:creation_action']) {
                                        return 'node--' + d.data.properties['sennet:creation_action'].replaceAll(' ', '');
                                    }
                                    return '';
                                }
                            })["AppProvider.useEffect.getOptions"],
                            onCenterY: ({
                                "AppProvider.useEffect.getOptions": function(args) {
                                    return args.options.graphDepth / 2;
                                }
                            })["AppProvider.useEffect.getOptions"],
                            onAfterInfoUpdateBuild: ({
                                "AppProvider.useEffect.getOptions": function(args) {
                                    console.log('Build info');
                                }
                            })["AppProvider.useEffect.getOptions"]
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
                }
            }["AppProvider.useEffect.getOptions"];
            var handleFeature = {
                "AppProvider.useEffect.handleFeature": function(fn) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                        "AppProvider.useEffect.handleFeature": function() {
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                                "AppProvider.useEffect.handleFeature": function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            setLoading(true);
                                            return [
                                                4,
                                                fn({
                                                    token: token,
                                                    url: url,
                                                    itemId: itemId,
                                                    getOptions: getOptions,
                                                    setOptions: setOptions,
                                                    setContextData: setContextData,
                                                    setLoading: setLoading
                                                })
                                            ];
                                        case 1:
                                            _state.sent();
                                            return [
                                                2
                                            ];
                                    }
                                }
                            }["AppProvider.useEffect.handleFeature"]);
                        }
                    }["AppProvider.useEffect.handleFeature"])();
                }
            }["AppProvider.useEffect.handleFeature"];
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            else if ("TURBOPACK compile-time truthy", 1) {
                handleFeature(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$usage$2f$Neo4JGraphObject$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]);
            } else //TURBOPACK unreachable
            ;
        }
    }["AppProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            contextData: contextData,
            setContextData: setContextData,
            loading: loading,
            options: options
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AppContext.jsx",
        lineNumber: 101,
        columnNumber: 9
    }, _this);
};
_s(AppProvider, "6NcZ9/xij+44srZfinMV6y7ryas=");
_c = AppProvider;
const __TURBOPACK__default__export__ = AppContext;
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/_app.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.jsx [client] (ecmascript)");
;
;
;
;
;
function App(param) {
    var Component = param.Component, pageProps = param.pageProps;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["AppProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, pageProps), void 0, false, {
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
_c = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/_app.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var PAGE_PATH = "/_app";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    function() {
        return __turbopack_context__.r("[project]/src/pages/_app.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/_app\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/_app.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__c5ceb2cc._.js.map