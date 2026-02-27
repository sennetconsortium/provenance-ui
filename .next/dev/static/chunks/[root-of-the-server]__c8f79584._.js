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
"[project]/src/lib/js/ProvenanceTree.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jquery/dist/jquery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/DataConverter.js [client] (ecmascript)");
;
;
;
/**
 * @author dbmi.pitt.edu
 * @param d3 {object} The d3 library
 * @param selector {string} The selector of the canvas
 * @param _options {object} Set of options to pass
 * @returns {{}}
 * @constructor
 */ function ProvenanceTree(d3, selector, _options) {
    var $el = {
        canvas: d3.select(selector)
    };
    var canvasId = selector.slice(1);
    var models = {
        stratify: 'stratify',
        root: 'root'
    };
    var $info;
    var $infoParent;
    var dataKey;
    var allData;
    var positionData = {};
    var filteredData = {};
    var legendFilters = {};
    var treeWidth = 1;
    var toggled = {
        has: false,
        original: true
    };
    var classNames = {
        info: 'c-provenance__info',
        infoMain: 'c-provenance__info__main',
        infoNode: 'c-provenance__info--node',
        infoRelation: 'c-provenance__info--relationship',
        infoCloseBtn: 'js-btn--close',
        hasZoom: 'has-zoom',
        links: {
            hidden: 'edgeLabels--hidden',
            labels: 'edgeLabels',
            paths: 'edgePaths'
        },
        hasDrag: 'has-drag',
        nodes: {
            glow: 'glow',
            main: 'main',
            text: 'text',
            image: 'image'
        },
        active: 'is-active'
    };
    var sz = {};
    var simulation;
    var isInit = true;
    var data = {};
    var options = {
        graphDepth: 0,
        zoomActivated: false,
        colorMap: {
            Sample: "#ebb5c8",
            Source: "#ffc255",
            Activity: "#f16766",
            Dataset: "#8ecb93",
            Publication: "#a556d9"
        },
        visitedNodes: new Set(),
        imageMapActions: {},
        imageMap: {},
        imagesMap: {},
        node: {
            append: 'text',
            radius: 15
        },
        propertyMap: {},
        initParentKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].KEY_P_ACT,
        propertyPrefixClear: '',
        reverseRelationships: true,
        keepPositionsOnDataToggle: false,
        displayEdgeLabels: true,
        edgeLabels: {
            used: 'USED',
            wasGeneratedBy: 'WAS_GENERATED_BY',
            fontSize: 9,
            offset: -2,
            print: true
        },
        highlight: [],
        iconMap: {},
        faIconMap: fontAwesomeIcons(),
        colors: colors(),
        totalTypes: 0,
        reverseEdgeLabels: true,
        idNavigate: {
            props: [],
            url: '',
            exclude: []
        },
        callbacks: {},
        hideElementId: true,
        nodeLabelProperty: 'text',
        theme: {
            colors: {
                glow: {
                    highlighted: '#0f0',
                    regular: '#6ac6ff'
                },
                nodeOutlineFill: undefined,
                relationship: '#a5abb6',
                gray: '#ced2d9',
                inactive: '#dddddd'
            }
        },
        infoPanelBeforeSvg: true
    };
    function init() {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].extend(options, _options);
        initImageMap();
        handleZoomActivation();
        data.stratify = options.data.stratify;
        data.root = options.data.root;
        if (!data.root && data.stratify && !data.stratify.length) {
            log('No data provided', _options, 'error');
        } else {
            clearCanvas();
        }
    }
    function handleZoomActivation() {
        if (options.zoomActivated) {
            enableZoom();
        } else {
            disableZoom();
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector).click(function(e) {
            enableZoom();
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(document).on('scroll', function(e) {
            if (!isElementInViewport((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector)[0])) {
                disableZoom();
            }
        });
    }
    function enableZoom() {
        options.zoomActivated = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector).addClass(classNames.hasZoom);
        createZoom();
    }
    function disableZoom() {
        options.zoomActivated = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector).removeClass(classNames.hasZoom);
        createZoom();
    }
    function isElementInViewport(el) {
        try {
            var rect = el.getBoundingClientRect();
            return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */ rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        } catch (e) {
            console.error(e);
        }
    }
    function clearCanvas() {
        $el.canvas.html('');
        if (!options.displayEdgeLabels) {
            toggleEdgeLabels();
        }
        setUpSvg();
        allData = JSON.parse(JSON.stringify(data));
        isInit = true;
        var d = loadData(data);
        if (options.initParentKey === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].KEY_P_ENTITY) {
            toggleData({
                filter: 'Activity',
                parentKey: options.initParentKey
            });
        } else {
            buildTree(d);
        }
    }
    function log(title, obj) {
        var fn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 'log', color = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : '#da8f55';
        if (window.location.host.indexOf('localhost') !== -1) {
            console.log("%c Provenance-UI: ".concat(title), "background: #222; color: ".concat(color));
            console[fn](obj);
        }
    }
    function getDrag() {
        function dragStarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.1).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        function dragEnded(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
        return {
            dragStarted: dragStarted,
            dragged: dragged,
            dragEnded: dragEnded
        };
    }
    function drag() {
        var _getDrag = getDrag(), dragStarted = _getDrag.dragStarted, dragged = _getDrag.dragged, dragEnded = _getDrag.dragEnded;
        return d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded);
    }
    function colors() {
        return [
            '#68bdf6',
            '#6dce9e',
            '#faafc2',
            '#f2baf6',
            '#ff928c',
            '#fcea7e',
            '#ffc766',
            '#405f9e',
            '#a5abb6',
            '#78cecb',
            '#b88cbb',
            '#ced2d9',
            '#e84646',
            '#fa5f86',
            '#ffab1a',
            '#fcda19',
            '#797b80',
            '#c9d96f',
            '#47991f',
            '#70edee',
            '#ff75ea' // pink
        ];
    }
    function fontAwesomeIcons() {
        return {
            'glass': 'f000',
            'music': 'f001',
            'search': 'f002',
            'envelope-o': 'f003',
            'heart': 'f004',
            'star': 'f005',
            'star-o': 'f006',
            'user': 'f007',
            'film': 'f008',
            'th-large': 'f009',
            'th': 'f00a',
            'th-list': 'f00b',
            'check': 'f00c',
            'remove,close,times': 'f00d',
            'search-plus': 'f00e',
            'search-minus': 'f010',
            'power-off': 'f011',
            'signal': 'f012',
            'gear,cog': 'f013',
            'trash-o': 'f014',
            'home': 'f015',
            'file-o': 'f016',
            'clock-o': 'f017',
            'road': 'f018',
            'download': 'f019',
            'arrow-circle-o-down': 'f01a',
            'arrow-circle-o-up': 'f01b',
            'inbox': 'f01c',
            'play-circle-o': 'f01d',
            'rotate-right,repeat': 'f01e',
            'refresh': 'f021',
            'list-alt': 'f022',
            'lock': 'f023',
            'flag': 'f024',
            'headphones': 'f025',
            'volume-off': 'f026',
            'volume-down': 'f027',
            'volume-up': 'f028',
            'qrcode': 'f029',
            'barcode': 'f02a',
            'tag': 'f02b',
            'tags': 'f02c',
            'book': 'f02d',
            'bookmark': 'f02e',
            'print': 'f02f',
            'camera': 'f030',
            'font': 'f031',
            'bold': 'f032',
            'italic': 'f033',
            'text-height': 'f034',
            'text-width': 'f035',
            'align-left': 'f036',
            'align-center': 'f037',
            'align-right': 'f038',
            'align-justify': 'f039',
            'list': 'f03a',
            'dedent,outdent': 'f03b',
            'indent': 'f03c',
            'video-camera': 'f03d',
            'photo,image,picture-o': 'f03e',
            'pencil': 'f040',
            'map-marker': 'f041',
            'adjust': 'f042',
            'tint': 'f043',
            'edit,pencil-square-o': 'f044',
            'share-square-o': 'f045',
            'check-square-o': 'f046',
            'arrows': 'f047',
            'step-backward': 'f048',
            'fast-backward': 'f049',
            'backward': 'f04a',
            'play': 'f04b',
            'pause': 'f04c',
            'stop': 'f04d',
            'forward': 'f04e',
            'fast-forward': 'f050',
            'step-forward': 'f051',
            'eject': 'f052',
            'chevron-left': 'f053',
            'chevron-right': 'f054',
            'plus-circle': 'f055',
            'minus-circle': 'f056',
            'times-circle': 'f057',
            'check-circle': 'f058',
            'question-circle': 'f059',
            'info-circle': 'f05a',
            'crosshairs': 'f05b',
            'times-circle-o': 'f05c',
            'check-circle-o': 'f05d',
            'ban': 'f05e',
            'arrow-left': 'f060',
            'arrow-right': 'f061',
            'arrow-up': 'f062',
            'arrow-down': 'f063',
            'mail-forward,share': 'f064',
            'expand': 'f065',
            'compress': 'f066',
            'plus': 'f067',
            'minus': 'f068',
            'asterisk': 'f069',
            'exclamation-circle': 'f06a',
            'gift': 'f06b',
            'leaf': 'f06c',
            'fire': 'f06d',
            'eye': 'f06e',
            'eye-slash': 'f070',
            'warning,exclamation-triangle': 'f071',
            'plane': 'f072',
            'calendar': 'f073',
            'random': 'f074',
            'comment': 'f075',
            'magnet': 'f076',
            'chevron-up': 'f077',
            'chevron-down': 'f078',
            'retweet': 'f079',
            'shopping-cart': 'f07a',
            'folder': 'f07b',
            'folder-open': 'f07c',
            'arrows-v': 'f07d',
            'arrows-h': 'f07e',
            'bar-chart-o,bar-chart': 'f080',
            'twitter-square': 'f081',
            'facebook-square': 'f082',
            'camera-retro': 'f083',
            'key': 'f084',
            'gears,cogs': 'f085',
            'comments': 'f086',
            'thumbs-o-up': 'f087',
            'thumbs-o-down': 'f088',
            'star-half': 'f089',
            'heart-o': 'f08a',
            'sign-out': 'f08b',
            'linkedin-square': 'f08c',
            'thumb-tack': 'f08d',
            'external-link': 'f08e',
            'sign-in': 'f090',
            'trophy': 'f091',
            'github-square': 'f092',
            'upload': 'f093',
            'lemon-o': 'f094',
            'phone': 'f095',
            'square-o': 'f096',
            'bookmark-o': 'f097',
            'phone-square': 'f098',
            'twitter': 'f099',
            'facebook-f,facebook': 'f09a',
            'github': 'f09b',
            'unlock': 'f09c',
            'credit-card': 'f09d',
            'feed,rss': 'f09e',
            'hdd-o': 'f0a0',
            'bullhorn': 'f0a1',
            'bell': 'f0f3',
            'certificate': 'f0a3',
            'hand-o-right': 'f0a4',
            'hand-o-left': 'f0a5',
            'hand-o-up': 'f0a6',
            'hand-o-down': 'f0a7',
            'arrow-circle-left': 'f0a8',
            'arrow-circle-right': 'f0a9',
            'arrow-circle-up': 'f0aa',
            'arrow-circle-down': 'f0ab',
            'globe': 'f0ac',
            'wrench': 'f0ad',
            'tasks': 'f0ae',
            'filter': 'f0b0',
            'briefcase': 'f0b1',
            'arrows-alt': 'f0b2',
            'group,users': 'f0c0',
            'chain,link': 'f0c1',
            'cloud': 'f0c2',
            'flask': 'f0c3',
            'cut,scissors': 'f0c4',
            'copy,files-o': 'f0c5',
            'paperclip': 'f0c6',
            'save,floppy-o': 'f0c7',
            'square': 'f0c8',
            'navicon,reorder,bars': 'f0c9',
            'list-ul': 'f0ca',
            'list-ol': 'f0cb',
            'strikethrough': 'f0cc',
            'underline': 'f0cd',
            'table': 'f0ce',
            'magic': 'f0d0',
            'truck': 'f0d1',
            'pinterest': 'f0d2',
            'pinterest-square': 'f0d3',
            'google-plus-square': 'f0d4',
            'google-plus': 'f0d5',
            'money': 'f0d6',
            'caret-down': 'f0d7',
            'caret-up': 'f0d8',
            'caret-left': 'f0d9',
            'caret-right': 'f0da',
            'columns': 'f0db',
            'unsorted,sort': 'f0dc',
            'sort-down,sort-desc': 'f0dd',
            'sort-up,sort-asc': 'f0de',
            'envelope': 'f0e0',
            'linkedin': 'f0e1',
            'rotate-left,undo': 'f0e2',
            'legal,gavel': 'f0e3',
            'dashboard,tachometer': 'f0e4',
            'comment-o': 'f0e5',
            'comments-o': 'f0e6',
            'flash,bolt': 'f0e7',
            'sitemap': 'f0e8',
            'umbrella': 'f0e9',
            'paste,clipboard': 'f0ea',
            'lightbulb-o': 'f0eb',
            'exchange': 'f0ec',
            'cloud-download': 'f0ed',
            'cloud-upload': 'f0ee',
            'user-md': 'f0f0',
            'stethoscope': 'f0f1',
            'suitcase': 'f0f2',
            'bell-o': 'f0a2',
            'coffee': 'f0f4',
            'cutlery': 'f0f5',
            'file-text-o': 'f0f6',
            'building-o': 'f0f7',
            'hospital-o': 'f0f8',
            'ambulance': 'f0f9',
            'medkit': 'f0fa',
            'fighter-jet': 'f0fb',
            'beer': 'f0fc',
            'h-square': 'f0fd',
            'plus-square': 'f0fe',
            'angle-double-left': 'f100',
            'angle-double-right': 'f101',
            'angle-double-up': 'f102',
            'angle-double-down': 'f103',
            'angle-left': 'f104',
            'angle-right': 'f105',
            'angle-up': 'f106',
            'angle-down': 'f107',
            'desktop': 'f108',
            'laptop': 'f109',
            'tablet': 'f10a',
            'mobile-phone,mobile': 'f10b',
            'circle-o': 'f10c',
            'quote-left': 'f10d',
            'quote-right': 'f10e',
            'spinner': 'f110',
            'circle': 'f111',
            'mail-reply,reply': 'f112',
            'github-alt': 'f113',
            'folder-o': 'f114',
            'folder-open-o': 'f115',
            'smile-o': 'f118',
            'frown-o': 'f119',
            'meh-o': 'f11a',
            'gamepad': 'f11b',
            'keyboard-o': 'f11c',
            'flag-o': 'f11d',
            'flag-checkered': 'f11e',
            'terminal': 'f120',
            'code': 'f121',
            'mail-reply-all,reply-all': 'f122',
            'star-half-empty,star-half-full,star-half-o': 'f123',
            'location-arrow': 'f124',
            'crop': 'f125',
            'code-fork': 'f126',
            'unlink,chain-broken': 'f127',
            'question': 'f128',
            'info': 'f129',
            'exclamation': 'f12a',
            'superscript': 'f12b',
            'subscript': 'f12c',
            'eraser': 'f12d',
            'puzzle-piece': 'f12e',
            'microphone': 'f130',
            'microphone-slash': 'f131',
            'shield': 'f132',
            'calendar-o': 'f133',
            'fire-extinguisher': 'f134',
            'rocket': 'f135',
            'maxcdn': 'f136',
            'chevron-circle-left': 'f137',
            'chevron-circle-right': 'f138',
            'chevron-circle-up': 'f139',
            'chevron-circle-down': 'f13a',
            'html5': 'f13b',
            'css3': 'f13c',
            'anchor': 'f13d',
            'unlock-alt': 'f13e',
            'bullseye': 'f140',
            'ellipsis-h': 'f141',
            'ellipsis-v': 'f142',
            'rss-square': 'f143',
            'play-circle': 'f144',
            'ticket': 'f145',
            'minus-square': 'f146',
            'minus-square-o': 'f147',
            'level-up': 'f148',
            'level-down': 'f149',
            'check-square': 'f14a',
            'pencil-square': 'f14b',
            'external-link-square': 'f14c',
            'share-square': 'f14d',
            'compass': 'f14e',
            'toggle-down,caret-square-o-down': 'f150',
            'toggle-up,caret-square-o-up': 'f151',
            'toggle-right,caret-square-o-right': 'f152',
            'euro,eur': 'f153',
            'gbp': 'f154',
            'dollar,usd': 'f155',
            'rupee,inr': 'f156',
            'cny,rmb,yen,jpy': 'f157',
            'ruble,rouble,rub': 'f158',
            'won,krw': 'f159',
            'bitcoin,btc': 'f15a',
            'file': 'f15b',
            'file-text': 'f15c',
            'sort-alpha-asc': 'f15d',
            'sort-alpha-desc': 'f15e',
            'sort-amount-asc': 'f160',
            'sort-amount-desc': 'f161',
            'sort-numeric-asc': 'f162',
            'sort-numeric-desc': 'f163',
            'thumbs-up': 'f164',
            'thumbs-down': 'f165',
            'youtube-square': 'f166',
            'youtube': 'f167',
            'xing': 'f168',
            'xing-square': 'f169',
            'youtube-play': 'f16a',
            'dropbox': 'f16b',
            'stack-overflow': 'f16c',
            'instagram': 'f16d',
            'flickr': 'f16e',
            'adn': 'f170',
            'bitbucket': 'f171',
            'bitbucket-square': 'f172',
            'tumblr': 'f173',
            'tumblr-square': 'f174',
            'long-arrow-down': 'f175',
            'long-arrow-up': 'f176',
            'long-arrow-left': 'f177',
            'long-arrow-right': 'f178',
            'apple': 'f179',
            'windows': 'f17a',
            'android': 'f17b',
            'linux': 'f17c',
            'dribbble': 'f17d',
            'skype': 'f17e',
            'foursquare': 'f180',
            'trello': 'f181',
            'female': 'f182',
            'male': 'f183',
            'gittip,gratipay': 'f184',
            'sun-o': 'f185',
            'moon-o': 'f186',
            'archive': 'f187',
            'bug': 'f188',
            'vk': 'f189',
            'weibo': 'f18a',
            'renren': 'f18b',
            'pagelines': 'f18c',
            'stack-exchange': 'f18d',
            'arrow-circle-o-right': 'f18e',
            'arrow-circle-o-left': 'f190',
            'toggle-left,caret-square-o-left': 'f191',
            'dot-circle-o': 'f192',
            'wheelchair': 'f193',
            'vimeo-square': 'f194',
            'turkish-lira,try': 'f195',
            'plus-square-o': 'f196',
            'space-shuttle': 'f197',
            'slack': 'f198',
            'envelope-square': 'f199',
            'wordpress': 'f19a',
            'openid': 'f19b',
            'institution,bank,university': 'f19c',
            'mortar-board,graduation-cap': 'f19d',
            'yahoo': 'f19e',
            'google': 'f1a0',
            'reddit': 'f1a1',
            'reddit-square': 'f1a2',
            'stumbleupon-circle': 'f1a3',
            'stumbleupon': 'f1a4',
            'delicious': 'f1a5',
            'digg': 'f1a6',
            'pied-piper-pp': 'f1a7',
            'pied-piper-alt': 'f1a8',
            'drupal': 'f1a9',
            'joomla': 'f1aa',
            'language': 'f1ab',
            'fax': 'f1ac',
            'building': 'f1ad',
            'child': 'f1ae',
            'paw': 'f1b0',
            'spoon': 'f1b1',
            'cube': 'f1b2',
            'cubes': 'f1b3',
            'behance': 'f1b4',
            'behance-square': 'f1b5',
            'steam': 'f1b6',
            'steam-square': 'f1b7',
            'recycle': 'f1b8',
            'automobile,car': 'f1b9',
            'cab,taxi': 'f1ba',
            'tree': 'f1bb',
            'spotify': 'f1bc',
            'deviantart': 'f1bd',
            'soundcloud': 'f1be',
            'database': 'f1c0',
            'file-pdf-o': 'f1c1',
            'file-word-o': 'f1c2',
            'file-excel-o': 'f1c3',
            'file-powerpoint-o': 'f1c4',
            'file-photo-o,file-picture-o,file-image-o': 'f1c5',
            'file-zip-o,file-archive-o': 'f1c6',
            'file-sound-o,file-audio-o': 'f1c7',
            'file-movie-o,file-video-o': 'f1c8',
            'file-code-o': 'f1c9',
            'vine': 'f1ca',
            'codepen': 'f1cb',
            'jsfiddle': 'f1cc',
            'life-bouy,life-buoy,life-saver,support,life-ring': 'f1cd',
            'circle-o-notch': 'f1ce',
            'ra,resistance,rebel': 'f1d0',
            'ge,empire': 'f1d1',
            'git-square': 'f1d2',
            'git': 'f1d3',
            'y-combinator-square,yc-square,hacker-news': 'f1d4',
            'tencent-weibo': 'f1d5',
            'qq': 'f1d6',
            'wechat,weixin': 'f1d7',
            'send,paper-plane': 'f1d8',
            'send-o,paper-plane-o': 'f1d9',
            'history': 'f1da',
            'circle-thin': 'f1db',
            'header': 'f1dc',
            'paragraph': 'f1dd',
            'sliders': 'f1de',
            'share-alt': 'f1e0',
            'share-alt-square': 'f1e1',
            'bomb': 'f1e2',
            'soccer-ball-o,futbol-o': 'f1e3',
            'tty': 'f1e4',
            'binoculars': 'f1e5',
            'plug': 'f1e6',
            'slideshare': 'f1e7',
            'twitch': 'f1e8',
            'yelp': 'f1e9',
            'newspaper-o': 'f1ea',
            'wifi': 'f1eb',
            'calculator': 'f1ec',
            'paypal': 'f1ed',
            'google-wallet': 'f1ee',
            'cc-visa': 'f1f0',
            'cc-mastercard': 'f1f1',
            'cc-discover': 'f1f2',
            'cc-amex': 'f1f3',
            'cc-paypal': 'f1f4',
            'cc-stripe': 'f1f5',
            'bell-slash': 'f1f6',
            'bell-slash-o': 'f1f7',
            'trash': 'f1f8',
            'copyright': 'f1f9',
            'at': 'f1fa',
            'eyedropper': 'f1fb',
            'paint-brush': 'f1fc',
            'birthday-cake': 'f1fd',
            'area-chart': 'f1fe',
            'pie-chart': 'f200',
            'line-chart': 'f201',
            'lastfm': 'f202',
            'lastfm-square': 'f203',
            'toggle-off': 'f204',
            'toggle-on': 'f205',
            'bicycle': 'f206',
            'bus': 'f207',
            'ioxhost': 'f208',
            'angellist': 'f209',
            'cc': 'f20a',
            'shekel,sheqel,ils': 'f20b',
            'meanpath': 'f20c',
            'buysellads': 'f20d',
            'connectdevelop': 'f20e',
            'dashcube': 'f210',
            'forumbee': 'f211',
            'leanpub': 'f212',
            'sellsy': 'f213',
            'shirtsinbulk': 'f214',
            'simplybuilt': 'f215',
            'skyatlas': 'f216',
            'cart-plus': 'f217',
            'cart-arrow-down': 'f218',
            'diamond': 'f219',
            'ship': 'f21a',
            'user-secret': 'f21b',
            'motorcycle': 'f21c',
            'street-view': 'f21d',
            'heartbeat': 'f21e',
            'venus': 'f221',
            'mars': 'f222',
            'mercury': 'f223',
            'intersex,transgender': 'f224',
            'transgender-alt': 'f225',
            'venus-double': 'f226',
            'mars-double': 'f227',
            'venus-mars': 'f228',
            'mars-stroke': 'f229',
            'mars-stroke-v': 'f22a',
            'mars-stroke-h': 'f22b',
            'neuter': 'f22c',
            'genderless': 'f22d',
            'facebook-official': 'f230',
            'pinterest-p': 'f231',
            'whatsapp': 'f232',
            'server': 'f233',
            'user-plus': 'f234',
            'user-times': 'f235',
            'hotel,bed': 'f236',
            'viacoin': 'f237',
            'train': 'f238',
            'subway': 'f239',
            'medium': 'f23a',
            'yc,y-combinator': 'f23b',
            'optin-monster': 'f23c',
            'opencart': 'f23d',
            'expeditedssl': 'f23e',
            'battery-4,battery-full': 'f240',
            'battery-3,battery-three-quarters': 'f241',
            'battery-2,battery-half': 'f242',
            'battery-1,battery-quarter': 'f243',
            'battery-0,battery-empty': 'f244',
            'mouse-pointer': 'f245',
            'i-cursor': 'f246',
            'object-group': 'f247',
            'object-ungroup': 'f248',
            'sticky-note': 'f249',
            'sticky-note-o': 'f24a',
            'cc-jcb': 'f24b',
            'cc-diners-club': 'f24c',
            'clone': 'f24d',
            'balance-scale': 'f24e',
            'hourglass-o': 'f250',
            'hourglass-1,hourglass-start': 'f251',
            'hourglass-2,hourglass-half': 'f252',
            'hourglass-3,hourglass-end': 'f253',
            'hourglass': 'f254',
            'hand-grab-o,hand-rock-o': 'f255',
            'hand-stop-o,hand-paper-o': 'f256',
            'hand-scissors-o': 'f257',
            'hand-lizard-o': 'f258',
            'hand-spock-o': 'f259',
            'hand-pointer-o': 'f25a',
            'hand-peace-o': 'f25b',
            'trademark': 'f25c',
            'registered': 'f25d',
            'creative-commons': 'f25e',
            'gg': 'f260',
            'gg-circle': 'f261',
            'tripadvisor': 'f262',
            'odnoklassniki': 'f263',
            'odnoklassniki-square': 'f264',
            'get-pocket': 'f265',
            'wikipedia-w': 'f266',
            'safari': 'f267',
            'chrome': 'f268',
            'firefox': 'f269',
            'opera': 'f26a',
            'internet-explorer': 'f26b',
            'tv,television': 'f26c',
            'contao': 'f26d',
            '500px': 'f26e',
            'amazon': 'f270',
            'calendar-plus-o': 'f271',
            'calendar-minus-o': 'f272',
            'calendar-times-o': 'f273',
            'calendar-check-o': 'f274',
            'industry': 'f275',
            'map-pin': 'f276',
            'map-signs': 'f277',
            'map-o': 'f278',
            'map': 'f279',
            'commenting': 'f27a',
            'commenting-o': 'f27b',
            'houzz': 'f27c',
            'vimeo': 'f27d',
            'black-tie': 'f27e',
            'fonticons': 'f280',
            'reddit-alien': 'f281',
            'edge': 'f282',
            'credit-card-alt': 'f283',
            'codiepie': 'f284',
            'modx': 'f285',
            'fort-awesome': 'f286',
            'usb': 'f287',
            'product-hunt': 'f288',
            'mixcloud': 'f289',
            'scribd': 'f28a',
            'pause-circle': 'f28b',
            'pause-circle-o': 'f28c',
            'stop-circle': 'f28d',
            'stop-circle-o': 'f28e',
            'shopping-bag': 'f290',
            'shopping-basket': 'f291',
            'hashtag': 'f292',
            'bluetooth': 'f293',
            'bluetooth-b': 'f294',
            'percent': 'f295',
            'gitlab': 'f296',
            'wpbeginner': 'f297',
            'wpforms': 'f298',
            'envira': 'f299',
            'universal-access': 'f29a',
            'wheelchair-alt': 'f29b',
            'question-circle-o': 'f29c',
            'blind': 'f29d',
            'audio-description': 'f29e',
            'volume-control-phone': 'f2a0',
            'braille': 'f2a1',
            'assistive-listening-systems': 'f2a2',
            'asl-interpreting,american-sign-language-interpreting': 'f2a3',
            'deafness,hard-of-hearing,deaf': 'f2a4',
            'glide': 'f2a5',
            'glide-g': 'f2a6',
            'signing,sign-language': 'f2a7',
            'low-vision': 'f2a8',
            'viadeo': 'f2a9',
            'viadeo-square': 'f2aa',
            'snapchat': 'f2ab',
            'snapchat-ghost': 'f2ac',
            'snapchat-square': 'f2ad',
            'pied-piper': 'f2ae',
            'first-order': 'f2b0',
            'yoast': 'f2b1',
            'themeisle': 'f2b2',
            'google-plus-circle,google-plus-official': 'f2b3',
            'fa,font-awesome': 'f2b4'
        };
    }
    function typeToColor(cls) {
        var color = options.colorMap[cls];
        if (!color) {
            color = options.colors[options.totalTypes % options.colors.length];
            options.colorMap[cls] = color;
            options.totalTypes++;
        }
        return color;
    }
    function typeToDarkenColor(cls) {
        return d3.rgb(typeToColor(cls)).darker(1);
    }
    function createZoom() {
        if ($el.svg) {
            if (options.zoomActivated) {
                options.scaleExtent = [
                    0.2,
                    5
                ];
            } else {
                options.scaleExtent = [
                    1,
                    1
                ];
            }
            var zoom = d3.zoom().scaleExtent(options.scaleExtent).on('zoom', function(event) {
                if (options.zoomActivated) {
                    $el.svgGroup.selectAll('.links, .nodes, .labels').attr('transform', event.transform);
                }
            });
            options.zoom = zoom;
            $el.svg.call(zoom);
        }
    }
    function buildLinks() {
        $el.link = $el.linksGroup.selectAll('line').data(data.links);
        $el.link.exit().remove();
        $el.line = $el.link.enter().append('line');
        $el.link = $el.link.merge($el.line);
        var className = function(d) {
            var set = new Set();
            set.add(d.source.data.className);
            set.add(d.target.data.className);
            return set.size ? Array.from(set).join(' ') : '';
        };
        $el.link.attr('class', function(d) {
            return 'link ' + className(d);
        }).on('click', function(e, d) {
            updateInfo(d.data, false);
        })// .attr("d", d3.linkHorizontal()
        //     .x(d => d.x)
        //     .y(d => d.y))
        .attr('marker-end', 'url(#arrowhead)');
        // Makes path go along with the link by providing position for link labels
        $el.edgePaths = $el.labelsGroup.selectAll(".".concat(classNames.links.paths)).data(data.links);
        $el.edgePaths.exit().remove();
        $el.edgePathsEnter = $el.edgePaths.enter().append('path');
        $el.edgePaths = $el.edgePaths.merge($el.edgePathsEnter);
        $el.edgePaths.attr('class', classNames.links.paths).attr('fill-opacity', 0).attr('stroke-opacity', 0).attr('id', function(d, i) {
            return classNames.links.paths + i + canvasId;
        }).style('pointer-events', 'none');
        // Labels
        $el.edgeLabel = $el.labelsGroup.selectAll(".".concat(classNames.links.labels)).data(data.links);
        $el.edgeLabel.exit().remove();
        $el.labelEnter = $el.edgeLabel.enter().append('text').style('pointer-events', 'none').attr('class', classNames.links.labels).attr('id', function(d, i) {
            return classNames.links.labels + i + canvasId;
        }).attr('font-size', options.edgeLabels.fontSize).attr('fill', '#aaa');
        $el.labelEnter.append('textPath').style('text-anchor', 'middle').style('pointer-events', 'none').attr('startOffset', '50%').attr('class', function(d) {
            return 'textPath ' + className(d);
        });
        $el.edgeLabel = $el.edgeLabel.merge($el.labelEnter);
        // Update labels
        $el.edgeLabel.select('.textPath').attr('class', function(d) {
            return 'textPath ' + className(d);
        }).attr('xlink:href', function(d, i) {
            return "#".concat(classNames.links.paths) + i + canvasId;
        }).text(function(d) {
            if (options.callbacks.onEdgeLabel) {
                return runCallback('onEdgeLabel', d);
            } else {
                if (options.edgeLabels.print) {
                    return d.source.data.type === 'Entity' && toggled.original ? options.edgeLabels.wasGeneratedBy : options.edgeLabels.used;
                } else {
                    return '';
                }
            }
        });
    }
    function getTextToAppendToNode(d) {
        var text = icon(d) || getNodeText(d) || '';
        text = icon(d) ? '&#x' + text : text;
        var className = icon(d) ? ' icon' : getNodeText(d) ? ' has-label' : '';
        return {
            text: text,
            className: className
        };
    }
    function getNodeProp(d, prop) {
        try {
            return d[prop] || d.data[prop] || d.data.data[prop];
        } catch (e) {}
    }
    function getNodeProperties(d) {
        return getNodeProp(d, 'properties');
    }
    function getNodeText(d) {
        return getNodeProp(d, options.nodeLabelProperty);
    }
    function getNodeType(d) {
        return getNodeProp(d, 'type');
    }
    function getNodeCat(d) {
        return getNodeProp(d, 'subType');
    }
    function getNodeId(d) {
        return getNodeProp(d, 'id');
    }
    function icon(d) {
        var code;
        var subType = getNodeCat(d);
        if (options.faIconMap && options.node.append === 'icon') {
            if (options.iconMap[subType] && options.faIconMap[options.iconMap[subType]]) {
                code = options.faIconMap[options.iconMap[subType]];
            } else if (options.faIconMap[subType]) {
                code = options.faIconMap[subType];
            } else if (options.iconMap[subType]) {
                code = options.iconMap[subType];
            }
        }
        return code;
    }
    function appendTextToNode(node) {
        return node.append('text').attr('class', function(d) {
            return "".concat(classNames.nodes.text, " ") + getTextToAppendToNode(d).className;
        }).attr('fill', '#ffffff').attr('font-size', function(d) {
            return icon(d) ? options.node.radius + 'px' : '8px';
        }).attr('pointer-events', 'none').attr('text-anchor', 'middle').attr('y', function(d) {
            return icon(d) ? parseInt(Math.round(options.node.radius * 0.32)) + 'px' : '4px';
        }).html(function(d) {
            return getTextToAppendToNode(d).text;
        });
    }
    function initImageMap() {
        var key, keys;
        for(key in options.imageMap){
            if (options.imageMap.hasOwnProperty(key)) {
                keys = key.split('|');
                if (!options.imagesMap[keys[0]]) {
                    options.imagesMap[keys[0]] = [
                        key
                    ];
                } else {
                    options.imagesMap[keys[0]].push(key);
                }
            }
        }
    }
    function fetchImage(d, ops) {
        fetch(image(d)).then(function(r) {
            return r.text();
        }).then(function(svgXml) {
            var id = getNodeId(d);
            var toBase64 = function(xml) {
                return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
            };
            var fillColor = getFillColor(d, ops);
            svgXml = svgXml.replace('$bgColor', fillColor);
            svgXml = svgXml.replace('$borderColor', d3.rgb(fillColor).darker(1));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("#image--".concat(id, "--").concat(ops.className)).attr('href', toBase64(svgXml));
        }).catch(console.error.bind(console));
    }
    function getImageActions(d, ops) {
        var subType = getNodeCat(d);
        if (options.imageMap && options.imagesMap[subType]) {
            return propertyValueSearch(d, options.imagesMap[subType], options.imageMapActions);
        }
        return null;
    }
    function getImageTypeClass(d, ops) {
        var actions = getImageActions(d, ops);
        return actions ? actions.type : '';
    }
    function getDefaultSize() {
        return options.node.radius * 2;
    }
    function getImageHeight(d) {
        var actions = getImageActions(d);
        var sz = getDefaultSize();
        return actions ? actions.height || sz : sz;
    }
    function getImageWidth(d) {
        var actions = getImageActions(d);
        var sz = getDefaultSize();
        return actions ? actions.width || sz : sz;
    }
    function getImageType(d, ops) {
        var type = 'image';
        var actions = getImageActions(d, ops);
        var uri = 'http://www.w3.org/2000/svg';
        var node = document.createElementNS(uri, type);
        if (actions) {
            type = actions ? actions.type : 'image';
            node = document.createElementNS(uri, type);
            if (actions.fn === 'append') {
                if (type === 'image') {
                    fetchImage(d, ops);
                } else {
                    node.classList.add(type);
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = actions.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var io = _step.value;
                            var path = document.createElementNS(uri, io.tag || 'path');
                            if (io.draw && Array.isArray(io.draw)) {
                                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                                try {
                                    for(var _iterator1 = io.draw[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                        var attr = _step1.value;
                                        path.setAttribute(attr[0], attr[1]);
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
                                path.setAttribute(io.property || 'd', io.draw);
                            }
                            node.append(path);
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
        return {
            node: node,
            type: type,
            actions: actions
        };
    }
    function image(d) {
        var img;
        var subType = getNodeCat(d);
        if (options.imageMap) {
            img = propertyValueSearch(d, options.imagesMap[subType], options.imageMap);
        }
        return img;
    }
    function propertyValueSearch(d, imagesForLabel, dict) {
        var i, result, imgLevel, label, labelPropertyValue, property, value;
        if (imagesForLabel) {
            imgLevel = 0;
            var subType = getNodeCat(d);
            for(i = 0; i < imagesForLabel.length; i++){
                labelPropertyValue = imagesForLabel[i].split('|');
                switch(labelPropertyValue.length){
                    case 3:
                        value = labelPropertyValue[2];
                    /* falls through */ case 2:
                        property = labelPropertyValue[1];
                    /* falls through */ case 1:
                        label = labelPropertyValue[0];
                        break;
                    default:
                        break;
                }
                var properties = getNodeProperties(d);
                if (subType === label && (!property || properties[property] !== undefined) && (!value || properties[property] === value)) {
                    if (labelPropertyValue.length > imgLevel) {
                        result = dict[imagesForLabel[i]];
                        imgLevel = labelPropertyValue.length;
                    }
                }
            }
        }
        return result;
    }
    function getFillColor(d, ops) {
        var subType = getNodeCat(d);
        var fillColor = typeToColor(subType);
        var actions = getImageActions(d, ops);
        var id = getNodeId(d);
        if (actions) {
            var _$colors = options.theme.colors;
            var glowColor = isHighlighted(d) ? _$colors.glow.highlighted : _$colors.glow.regular;
            fillColor = ops.className === 'glow' ? glowColor : actions.color || fillColor;
            var $node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("".concat(selector, " #node--").concat(id));
            if (!actions.showMain) {
                $node.find('circle.main').addClass('invisible');
            }
            if (!actions.showMainGlow) {
                $node.find('circle.glow').addClass('invisible');
            }
        }
        return fillColor;
    }
    function appendImageToNode(node, ops) {
        return node.append(function(d) {
            return getImageType(d, ops).node;
        }).attr('class', function(d) {
            return "image ".concat(ops.className, " ").concat(getImageTypeClass(d, ops));
        }).attr('id', function(d) {
            return "image--".concat(getNodeId(d), "--").concat(ops.className);
        }).attr('xlink:href', function(d) {
            return image(d);
        }).attr('fill', function(d) {
            return getFillColor(d, ops);
        }).attr('stroke', function(d) {
            return typeToDarkenColor(getNodeCat(d));
        }).attr('height', function(d) {
            return icon(d) ? '24px' : getImageHeight(d) + 'px';
        }).attr('width', function(d) {
            return icon(d) ? '24px' : getImageWidth(d) + 'px';
        });
    }
    function getHighlightClass(d) {
        var isNode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var className = isNode ? 'node--' : 'rel--';
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = options.highlight[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var h = _step.value;
                if (h.id === getNodeId(d)) {
                    className = className + 'highlighted';
                    className += h.isSecondary ? 'is-secondary' : '';
                    return className;
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
        return '';
    }
    function isHighlighted(d) {
        return getHighlightClass(d).indexOf('highlighted') !== -1;
    }
    function buildNodes() {
        options.graphDepth = 0;
        var getDepth = function(d) {
            return d.depth;
        };
        var childInfo = function(d, i) {
            var posY = function(ci, mod) {
                var k = mod ? 12 : 20;
                var gDepth = ci * k * d.depth;
                if (gDepth > options.graphDepth) {
                    options.graphDepth = gDepth;
                }
                return gDepth;
            };
            treeWidth = Math.max(treeWidth, d.children ? d.children.length : 0);
            if (d.parent) {
                var children = d.parent.children;
                var id = d.data.id;
                var pId = d.parent.data.id;
                var pInfo = parentInfo[pId];
                var mod = pInfo ? pInfo.y : 0 // Use the parent's y position or 0
                ;
                var pDepth = pInfo ? Math.min(pInfo.dx, pInfo.d) + 1 : getDepth(d);
                var x = 0;
                treeWidth = Math.max(treeWidth, children ? children.length : 0);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var n = _step.value;
                        if (n.data.id === id) {
                            return {
                                id: id,
                                y: posY(x, mod) + mod,
                                d: pDepth
                            };
                        }
                        x++;
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
                // No children or (child not found / data corrupted)
                return {
                    id: id,
                    y: posY(0),
                    d: pDepth
                };
            } else {
                // Root element
                return {
                    id: null,
                    y: posY(0),
                    d: getDepth(d)
                };
            }
        };
        var parentInfo = {};
        data.nodes.forEach(function(d, i) {
            var pos = positionData[d.id];
            if (options.keepPositionsOnDataToggle && pos && !toggled.original) {
                d.y = pos.y;
                d.x = pos.x;
            } else {
                var ci = childInfo(d, i);
                d.y = ci.y;
                var depth = ci.d;
                d.x = 100 * depth + 300;
                parentInfo[ci.id] = {
                    y: ci.y,
                    d: getDepth(d),
                    dx: depth
                };
            }
        });
        // data.nodes.forEach(function(d, i) {
        //     d.x = sz.width/2 + i;
        //     d.y = 100*d.depth + 100;
        // })
        $el.node = $el.nodeGroup.selectAll('.node').data(data.nodes);
        $el.node.exit().remove();
        $el.nodeEnter = $el.node.enter().append('g').attr('id', function(d) {
            return "node--".concat(getNodeId(d));
        }).attr('data-node', function(d) {
            runCallback('onNodeBuild', {
                node: d
            });
        }).on('click', function(e, d) {
            d.wasClicked = true;
            options.visitedNodes.add(getNodeId(d));
            updateInfo(d.data, true);
            runCallback('onNodeClick', {
                event: e,
                node: d
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("".concat(selector, " .").concat(classNames.infoCloseBtn)).fadeIn();
        }).call(drag());
        $el.nodeGlow = $el.nodeEnter.append('circle').attr('class', classNames.nodes.glow).attr('r', options.node.radius * 1.3);
        $el.nodeMain = $el.nodeEnter.append('circle').attr('class', classNames.nodes.main).attr('fill', function(d) {
            return typeToColor(getNodeCat(d));
        }).attr('stroke', function(d) {
            return typeToDarkenColor(getNodeCat(d));
        }).attr('r', options.node.radius);
        if (options.node.append) {
            if (options.node.append === 'text') {
                appendTextToNode($el.nodeEnter);
            }
            appendImageToNode($el.nodeEnter, {
                className: 'glow'
            });
            appendImageToNode($el.nodeEnter, {
                className: 'main'
            });
        }
        $el.node = $el.node.merge($el.nodeEnter);
        var getHoverClass = function(d) {
            var cat = getNodeCat(d);
            return legendFilters[cat] ? 'has-hover ' : '';
        };
        $el.node.attr('class', function(d) {
            var classNames = "node node--".concat(getNodeCat(d), " ").concat(getHoverClass(d)).concat(getHighlightClass(d), " ").concat(d.data.className || '', " ").concat(d.wasClicked || options.visitedNodes.has(getNodeId(d)) ? 'is-visited' : '');
            var customClassNames = runCallback('onNodeCssClass', {
                node: d
            });
            return classNames.trim() + ' ' + customClassNames || '';
        }).attr('id', function(d) {
            return "node--".concat(getNodeId(d));
        });
        $el.node.select("circle.".concat(classNames.nodes.glow)).attr('class', classNames.nodes.glow).style('fill', function(d) {
            return options.theme.colors.nodeOutlineFill ? options.theme.colors.nodeOutlineFill : typeToColor(getNodeCat(d));
        }).style('stroke', function(d) {
            return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : typeToDarkenColor(getNodeCat(d));
        }).append('title').text(function(d) {
            return getNodeCat(d);
        });
        $el.node.select("circle.".concat(classNames.nodes.main)).attr('class', classNames.nodes.main).attr('fill', function(d) {
            return typeToColor(getNodeCat(d));
        }).attr('stroke', function(d) {
            return typeToDarkenColor(getNodeCat(d));
        }).append('title').text(function(d) {
            return getNodeCat(d);
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("".concat(selector, " .").concat(classNames.nodes.image)).remove();
        appendImageToNode($el.node, {
            className: 'glow'
        });
        appendImageToNode($el.node, {
            className: 'main'
        });
    }
    function appendInfoPanel() {
        $el.info = options.infoPanelBeforeSvg ? $el.canvas.append('div').lower() : $el.canvas.append('div');
        $el.info.attr('class', classNames.info);
        $infoParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector).find(".".concat(classNames.info));
        var onInfoCloseBuild = function() {
            var c = runCallback('onInfoCloseBuild');
            return c ? c : '<i class="fa fa-times" aria-hidden="true"></i>';
        };
        $el.info.append('span').attr('class', classNames.info + '--close ' + classNames.infoCloseBtn).attr('style', 'display: none;').attr('title', 'Close Info Panel').html(onInfoCloseBuild());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector).on('click', ".".concat(classNames.infoCloseBtn), function(e) {
            e.stopPropagation();
            clearInfo();
            runCallback('onInfoCloseClick', {
                event: e
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(e.currentTarget).hide();
        });
        $el.info = $el.info.append('div').attr('class', classNames.infoMain);
        $info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector).find(".".concat(classNames.infoMain));
    }
    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return res !== null;
    }
    function clearInfo() {
        $infoParent.removeClass(classNames.active);
        $info.removeClass(classNames.infoNode);
        $info.removeClass(classNames.infoRelation);
        $info.html('');
    }
    function updateInfo(d, isNode) {
        clearInfo();
        $infoParent.addClass(classNames.active);
        isNode ? $info.addClass(classNames.infoNode) : $info.removeClass(classNames.infoNode);
        !isNode ? $info.addClass(classNames.infoRelation) : $info.removeClass(classNames.infoRelation);
        $info.attr('data-id', getNodeId(d));
        var type = getNodeType(d);
        if (type) {
            appendInfoElement(d, 'class', isNode, type !== getNodeCat(d) ? getNodeCat(d) : type);
        }
        if (!options.hideElementId) {
            appendInfoElement(d, 'property', isNode, '&lt;id&gt;', getNodeId(d));
        }
        var properties = getNodeProperties(d);
        if (properties) {
            Object.keys(properties).forEach(function(property) {
                var mapped = options.propertyMap[property] || property;
                appendInfoElement(d, 'property', isNode, mapped, JSON.stringify(properties[property]));
            });
        }
        runCallback('onAfterInfoUpdateBuild');
    }
    function appendInfoElement(d, cls, isNode, property, value) {
        var _options_idNavigate, _options_idNavigate1;
        var isNavigation = (_options_idNavigate = options.idNavigate) === null || _options_idNavigate === void 0 ? void 0 : _options_idNavigate.props[property];
        value = value ? value.toString().replaceAll('"', '') : value;
        var formattedUrl = false;
        var href = '#';
        if (isNavigation && (((_options_idNavigate1 = options.idNavigate) === null || _options_idNavigate1 === void 0 ? void 0 : _options_idNavigate1.url) || isNavigation.url) && !isNavigation.callback) {
            var label = getNodeCat(d) || 'Unknown';
            var excludeList = options.idNavigate.exclude[label];
            if (!excludeList || excludeList && excludeList.indexOf(property) === -1) {
                formattedUrl = true;
                var url = isValidURL(value) ? value : options.idNavigate.url;
                href = url.replace('{subType}', label.toLowerCase());
                href = href.replace('{id}', getNodeId(d));
                href = isValidURL(value) && href.indexOf('://') === -1 ? '//' + href : href;
            }
        } else {
            if (isNavigation && isNavigation.callback) {
                var result = isNavigation.callback(d, property, value);
                href = result.href;
                value = result.value || value;
                if (result.href) {
                    formattedUrl = true;
                }
            }
        }
        var elem = $el.info.append('span');
        var valueHtml = '';
        if (value) {
            valueHtml = !formattedUrl ? ": <span>".concat(value, "</span>") : ': <a href="'.concat(href, '" target="_blank">').concat(value, " </a>");
        }
        cls += " ".concat(property.replace(options.propertyPrefixClear, ''), " cell");
        elem.attr('class', cls + (!formattedUrl ? ' flat' : ' link')).html('<strong>' + property.replace(options.propertyPrefixClear, '') + '</strong>' + valueHtml);
        if (!value) {
            elem.style('background-color', function(d) {
                return options.theme.colors.nodeOutlineFill ? options.theme.colors.nodeOutlineFill : isNode ? typeToColor(property) : defaultColor();
            }).style('border-color', function(d) {
                return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : isNode ? typeToDarkenColor(property) : defaultDarkenColor();
            }).style('color', function(d) {
                return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : '#fff';
            });
        }
    }
    function defaultColor() {
        return options.theme.colors.relationship;
    }
    function defaultDarkenColor() {
        return d3.rgb(options.theme.colors.gray).darker(1);
    }
    function initSimulation() {
        var getPos = function() {
            var call = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'onCenterX', prop = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'clientWidth';
            var p = runCallback(call);
            if (!p) {
                return $el.svgGroup.node().parentElement[prop] / 2;
            }
            return p;
        };
        simulation = d3.forceSimulation(data.nodes).alpha(0.5)//.force("link", d3.forceLink(data.links).id(d => d.depth).distance(20).strength(1))
        .force('charge', d3.forceManyBody().strength(1)).force('center', d3.forceCenter(getPos(), getPos('onCenterY', 'clientHeight')));
    //.force("x", d3.forceX())
    //.force('y', d3.forceY(20).strength(.2))
    }
    function updateSimulation() {
        simulation.nodes(data.nodes);
        simulation.alpha(.5).alphaTarget(0).restart();
    }
    function stratify(data, parentKey) {
        parentKey = parentKey || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].KEY_P_ACT;
        var has = {};
        var x = 0;
        var root = d3.stratify().id(function(d) {
            x++;
            if (has[d.id]) {
                return d.id + '~' + x;
            } else {
                has[d.id] = true;
                return d.id;
            }
        }).parentId(function(d) {
            return d[parentKey];
        })(data);
        // Do a DFS and fix the duplicate graph ids back to their original form
        var stack = [
            root
        ];
        var visited = {};
        visited[root.id] = true;
        while(stack.length){
            var n = stack.pop();
            n.id = n.id.split('~')[0];
            if (n.children && n.children.length) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = n.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var c = _step.value;
                        if (!visited[c.id]) {
                            visited[c.id] = true;
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
        var descendants = root.descendants();
        var _links = root.links();
        var seen = {};
        var nodes = [];
        var fixed = {};
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = descendants[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var d = _step1.value;
                // Push what has not been seen
                if (!seen[d.id]) {
                    seen[d.id] = d;
                    nodes.push(d);
                } else {
                    // Otherwise, find them in the relationships and reference the same object
                    if (!fixed[d.id]) {
                        var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
                        try {
                            for(var _iterator2 = _links[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                                var l = _step2.value;
                                if (l.source.id === d.id) {
                                    l.source = seen[d.id];
                                }
                                if (l.target.id === d.id) {
                                    l.target = seen[d.id];
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
                        // We only want to fix once per node id for efficiency,
                        fixed[d.id] = true;
                    }
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
        return {
            root: root,
            nodes: nodes,
            links: _links
        };
    }
    function loadData(data) {
        if (data.stratify) {
            dataKey = models.stratify;
            return stratify(data.stratify);
        } else {
            dataKey = data.root ? models.root : null;
            var root = data.root || data;
            return {
                root: root
            };
        }
    }
    function resolveDataMethod(data, dataKey, parentKey) {
        if (dataKey === models.stratify) {
            buildTree(stratify(data, parentKey));
        } else {
            buildTree({
                root: data
            });
        }
    }
    function toggleEdgeLabels() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector).toggleClass(classNames.links.hidden);
    }
    function toggleData(ops) {
        toggled.has = true;
        var filter = ops.filter, parentKey = ops.parentKey;
        if (simulation) {
            simulation.stop();
        }
        var _data = dataKey ? allData[dataKey] : allData;
        if (filter) {
            toggled.original = false;
            if (filteredData[filter] === undefined) {
                filteredData[filter] = _data.filter(function(item) {
                    return item.type !== filter;
                });
            }
            resolveDataMethod(filteredData[filter], dataKey, parentKey);
        } else {
            toggled.original = true;
            resolveDataMethod(_data, dataKey, parentKey);
        }
    }
    function runCallback(callback, args) {
        if (options.callbacks[callback] && typeof options.callbacks[callback] === 'function') {
            return options.callbacks[callback]({
                $el: $el,
                data: data,
                options: options,
                args: args
            });
        } else {
            return false;
        }
    }
    function setUpSvg() {
        var isLgScreen = function() {
            return parseInt($el.canvas.style('width')) > 1024;
        };
        var getMargins = function() {
            return isLgScreen() ? 100 : 50;
        };
        var margin = {
            top: 20,
            right: getMargins(),
            bottom: 90,
            left: getMargins()
        };
        var sizes = runCallback('onSvgSizing', {
            isLgScreen: isLgScreen,
            getMargins: getMargins,
            sz: sz,
            margin: margin
        });
        sz.width = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector).width() - margin.left;
        sz.height = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(selector).height() - margin.top;
        if (sizes) {
            sz.width = sizes.width || sz.width;
            sz.height = sizes.height || sz.height;
        }
        $el.svg = $el.canvas.append('svg').attr('width', sz.width).attr('height', sz.height);
        runCallback('onBeforeBuild');
        $el.svgGroup = $el.svg.append('g');
        //.attr('transform', 'translate(' + (margin.left * 2) + ',' + (margin.top * 2) + ')')
        $el.svg.append('defs').append('marker').attr('id', 'arrowhead').attr('viewBox', '-0 -5 10 10') // The bound of the SVG viewport for the current SVG fragment. Defines a coordinate system 10 wide and 10 high starting on (0, -5)
        .attr('refX', 30) // X coordinate for the reference point of the marker. If circle is bigger, this needs to be bigger.
        .attr('refY', 0).attr('orient', 'auto').attr('markerWidth', 8).attr('markerHeight', 8).attr('xoverflow', 'visible').append('svg:path').attr('d', 'M 0,-5 L 10 ,0 L 0,5').attr('fill', '#999').style('stroke', 'none');
        $el.linksGroup = $el.svgGroup.append('g').attr('class', 'links').attr('stroke', '#999').attr('stroke-opacity', 0.6);
        $el.labelsGroup = $el.svgGroup.append('g').attr('class', 'labels');
        $el.nodeGroup = $el.svgGroup.append("g").attr('class', 'nodes').attr("stroke-width", 1.5);
        appendInfoPanel();
    }
    function updatePositions() {
        $el.link.attr("x1", function(d) {
            return d.source.x;
        }).attr("y1", function(d) {
            return d.source.y;
        }).attr("x2", function(d) {
            return d.target.x;
        }).attr("y2", function(d) {
            return d.target.y;
        });
        $el.node.select("circle.".concat(classNames.nodes.main)).attr("cx", function(d) {
            positionData[d.id] = positionData[d.id] || {};
            positionData[d.id].x = d.x;
            return d.x;
        }).attr("cy", function(d) {
            positionData[d.id] = positionData[d.id] || {};
            positionData[d.id].y = d.y;
            return d.y;
        });
        $el.node.select("circle.".concat(classNames.nodes.glow)).attr("cx", function(d) {
            return d.x;
        }).attr("cy", function(d) {
            return d.y;
        });
        $el.node.select(".".concat(classNames.nodes.text)).attr("x", function(d) {
            return d.x;
        }).attr("y", function(d) {
            return d.y;
        });
        var getX = function(d) {
            return d.x - getImageWidth(d) / 2;
        };
        var getY = function(d) {
            return d.y - getImageHeight(d) / 2;
        };
        $el.node.select(".".concat(classNames.nodes.image, ".main.g")).attr("transform", function(d) {
            return "translate(".concat(getX(d), ", ").concat(getY(d), ")");
        });
        $el.node.select(".".concat(classNames.nodes.image, ".glow.g")).attr("transform", function(d) {
            return "translate(".concat(getX(d), ", ").concat(getY(d), ")");
        });
        $el.node.select(".".concat(classNames.nodes.image, ".main")).attr("x", function(d) {
            return getX(d);
        }).attr("y", function(d) {
            return getY(d);
        });
        $el.node.select(".".concat(classNames.nodes.image, ".glow")).attr("x", function(d) {
            return getX(d);
        }).attr("y", function(d) {
            return getY(d);
        });
        $el.edgePaths.attr('d', function(d) {
            if (options.reverseEdgeLabels) {
                return 'M ' + d.target.x + ' ' + (d.target.y + options.edgeLabels.offset) + ' L ' + d.source.x + ' ' + (d.source.y + options.edgeLabels.offset);
            } else {
                return 'M ' + d.source.x + ' ' + (d.source.y + options.edgeLabels.offset) + ' L ' + d.target.x + ' ' + (d.target.y + options.edgeLabels.offset);
            }
        });
    }
    function ticked() {
        simulation.on("tick", function(e) {
            // const ky = simulation.alpha()
            // data.links.forEach(function(d, i) {
            //     d.source.y += (d.source.depth * 70 - d.source.y) * 2 * ky;
            // })
            updatePositions();
        });
    }
    function reverseRelationships(links) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var l = _step.value;
                var temp = l.target;
                l.target = l.source;
                l.source = temp;
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
        return links;
    }
    function buildTree(_data) {
        var root = _data.root, nodes = _data.nodes, links = _data.links;
        var h = d3.hierarchy(root);
        var _links = links || h.links();
        data.links = options.reverseRelationships ? reverseRelationships(_links) : _links;
        data.nodes = nodes || h.descendants();
        buildLinks();
        buildNodes();
        if (isInit) {
            isInit = false;
            initSimulation();
        } else {
            updateSimulation();
        }
        ticked();
        createZoom();
        runCallback('onAfterBuild', _data);
        return $el.svg.node();
    }
    init();
    return {
        colorMap: options.colorMap,
        toggleData: toggleData,
        simulation: simulation,
        toggleEdgeLabels: toggleEdgeLabels,
        legendFilters: legendFilters,
        treeWidth: treeWidth,
        buildTree: buildTree,
        options: options,
        visitedNodes: options.visitedNodes,
        disableZoom: disableZoom,
        enableZoom: enableZoom
    };
}
_c = ProvenanceTree;
const __TURBOPACK__default__export__ = ProvenanceTree;
var _c;
__turbopack_context__.k.register(_c, "ProvenanceTree");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/hooks/useD3.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
var useD3 = function() {
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), d3 = _useState[0], setD3 = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), loading = _useState1[0], setLoading = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), error = _useState2[0], setError = _useState2[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useD3.useEffect": function() {
            var loadD3 = {
                "useD3.useEffect.loadD3": function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                        "useD3.useEffect.loadD3": function() {
                            var lib, e;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                                "useD3.useEffect.loadD3": function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            _state.trys.push([
                                                0,
                                                2,
                                                ,
                                                3
                                            ]);
                                            return [
                                                4,
                                                __turbopack_context__.A("[project]/node_modules/d3/src/index.js [client] (ecmascript, async loader)")
                                            ];
                                        case 1:
                                            lib = _state.sent();
                                            setD3(lib);
                                            setLoading(false);
                                            return [
                                                3,
                                                3
                                            ];
                                        case 2:
                                            e = _state.sent();
                                            setLoading(false);
                                            setError(e);
                                            console.error(e);
                                            return [
                                                3,
                                                3
                                            ];
                                        case 3:
                                            return [
                                                2
                                            ];
                                    }
                                }
                            }["useD3.useEffect.loadD3"]);
                        }
                    }["useD3.useEffect.loadD3"])();
                }
            }["useD3.useEffect.loadD3"];
            loadD3();
            return ({
                "useD3.useEffect": function() {}
            })["useD3.useEffect"];
        }
    }["useD3.useEffect"], []);
    return {
        d3: d3,
        loading: loading,
        error: error
    };
};
_s(useD3, "bSt9VRak5zdZpVrGZGGVvTTsfsU=");
const __TURBOPACK__default__export__ = useD3;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/js/constants.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLASS_NAMES",
    ()=>CLASS_NAMES,
    "SELECTORS",
    ()=>SELECTORS,
    "SELECTOR_ID",
    ()=>SELECTOR_ID,
    "isEdge",
    ()=>isEdge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
;
var SELECTOR_ID = 'provenanceTree';
var isEdge = function($el) {
    return $el.data('node') === 'Edge';
};
var CLASS_NAMES = {
    disabled: 'is-disabled',
    hover: 'has-hover',
    toggled: 'has-toggled'
};
var SELECTORS = {
    legend: {
        legendItem: '.js-legend__item',
        legendTrigger: '.js-legend--trigger'
    }
};
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/components/ProvenanceUI.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/prop-types/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jquery/dist/jquery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$ProvenanceTree$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/ProvenanceTree.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useD3$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useD3.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/constants.js [client] (ecmascript)");
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function ProvenanceUI(param) {
    var children = param.children, data = param.data, _param_options = param.options, options = _param_options === void 0 ? {} : _param_options;
    _s();
    var _useD3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useD3$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"])(), d3 = _useD3.d3, error = _useD3.error, loading = _useD3.loading;
    var selectorId = options.selectorId || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SELECTOR_ID"];
    var initialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var addVisitedClass = function() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("#".concat(selectorId)).on('click', '.node', function(e) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(e.currentTarget).addClass('is-visited');
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProvenanceUI.useEffect": function() {
            addVisitedClass();
        }
    }["ProvenanceUI.useEffect"]);
    if ((options.dontCheckInitialized || !initialized.current) && !loading && !error) {
        var _options_callbacks;
        initialized.current = true;
        window.ProvenanceTreeD3 = window.ProvenanceTreeD3 || {};
        window.ProvenanceTreeD3[selectorId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$ProvenanceTree$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(d3, "#".concat(selectorId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, options), {
            data: data
        }));
        if ((_options_callbacks = options.callbacks) === null || _options_callbacks === void 0 ? void 0 : _options_callbacks.onInitializationComplete) {
            options.callbacks.onInitializationComplete(selectorId);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "c-provenance c-provenance--Tree js-provenance",
        id: selectorId,
        style: {
            minHeight: options.minHeight || 300
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/components/ProvenanceUI.jsx",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
_s(ProvenanceUI, "NAqsgQDz0EYDBsW3LtqzyIonx0o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useD3$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = ProvenanceUI;
ProvenanceUI.propTypes = {
    options: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].object,
    data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].object,
    dataUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].string,
    children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].node
};
const __TURBOPACK__default__export__ = ProvenanceUI;
var _c;
__turbopack_context__.k.register(_c, "ProvenanceUI");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/components/Toggle.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jquery/dist/jquery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/prop-types/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/constants.js [client] (ecmascript)");
;
;
;
;
;
;
function Toggle(param) {
    var context = param.context, _param_icon = param.icon, icon = _param_icon === void 0 ? true : _param_icon, _param_selectorId = param.selectorId, selectorId = _param_selectorId === void 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SELECTOR_ID"] : _param_selectorId, _param_ariaLabel = param.ariaLabel, ariaLabel = _param_ariaLabel === void 0 ? 'Toggle' : _param_ariaLabel, _param_text = param.text, text = _param_text === void 0 ? '' : _param_text, _param_className = param.className, className = _param_className === void 0 ? '' : _param_className, _param_disabled = param.disabled, disabled = _param_disabled === void 0 ? false : _param_disabled;
    var toggleData = function(e) {
        var $el = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(e.currentTarget);
        var toggled = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].toggled;
        $el.toggleClass(toggled);
        var $p = $el.parents(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SELECTORS"].legend.legendItem);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isEdge"])($p)) {
            $p.toggleClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].disabled);
        }
        var $trigger = $p.find(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SELECTORS"].legend.legendTrigger);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isEdge"])($p) && $p.hasClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].hover)) {
            $trigger.eq(0).trigger('click', {
                force: true
            });
        }
        if (context !== null) {
            context(e, $el.hasClass(toggled), selectorId);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "c-toggle ".concat(className, " ").concat(disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].toggled : ''),
        children: [
            !icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "c-toggle__text",
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/src/lib/components/Toggle.jsx",
                        lineNumber: 30,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "c-toggle__main",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                onClick: toggleData
                            }, void 0, false, {
                                fileName: "[project]/src/lib/components/Toggle.jsx",
                                lineNumber: 32,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "c-toggle__slider c-toggle__slider--round",
                                "aria-label": ariaLabel
                            }, void 0, false, {
                                fileName: "[project]/src/lib/components/Toggle.jsx",
                                lineNumber: 33,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/lib/components/Toggle.jsx",
                        lineNumber: 31,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true),
            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "c-toggle__icon fa fa-eye ".concat(disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].toggled : ''),
                    "aria-label": ariaLabel,
                    onClick: toggleData,
                    title: ariaLabel
                }, void 0, false, {
                    fileName: "[project]/src/lib/components/Toggle.jsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this)
            }, void 0, false)
        ]
    }, void 0, true, {
        fileName: "[project]/src/lib/components/Toggle.jsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
_c = Toggle;
Toggle.propTypes = {
    context: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].func,
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].bool,
    disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].bool,
    selectorId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].string,
    ariaLabel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].string,
    text: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].string,
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].string
};
const __TURBOPACK__default__export__ = Toggle;
var _c;
__turbopack_context__.k.register(_c, "Toggle");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/hooks/useHelpHtml.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jquery/dist/jquery.js [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
;
var useHelpHtml = function() {
    var help = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s();
    var images = {
        visitedNode: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRUE1MUM3RDkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRUE1MUM3RTkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNFQTUxQzdCOTEyODExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNFQTUxQzdDOTEyODExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAQABAAwERAAIRAQMRAf/EAIkAAAEFAQEAAAAAAAAAAAAAAAACBAUGBwEIAQEAAgMBAQAAAAAAAAAAAAAAAQQDBQYCBxAAAgEDAQUGBAQHAAAAAAAAAQIDAAQFESExURIGQWFxMhMHocFCcoGRIjOx0VKSIxQVEQACAgICAgEEAwAAAAAAAAAAAQIDEQQhBTFBEoEiMgZRcTP/2gAMAwEAAhEDEQA/APVNAFAFAJaSNfMwXxIFSk2Q5JAssbeVw3gQaOLQUkxVQSFAFAFAcZgoJJ0A2k0QbIy7yLEHlb04xvbcdPlViNaissrOcpvESl5D3K6YtZmijlkvZUOji1QyAH7/ACfGsM96C8Gzo6K+xZfAmx9zel7iVY5pJbFmOim6jMa6/ftQfiaiG9B+Sbuhugsrkulnkjyq3P6sLAFWB12HcQasOEZLKNX8pVvEiVVlZQynUHcarNYLCeTtCQoBjk5iAsQO/a3h2Vnpj7K98vRj3uB1HPkMlLhLaQpj7XQXpU6GWUjX09R9Kgjm4nZWt3Nht4Xg67ousUY/OS5ZWURUUKgCqNgA2CtedQlg6yqwKsAQd4O0UJwT/QvUU+IykOLmctir1/TgVjr6EzeULr9D7tONXtTYcXh+Dm+76yM4fOK5RsuMmOrRE7PMvzra3R9nF0S9EhVcshQETkif9hu5Rp+VWYfgVpc2L6Hn8O8lxdyyfuyXVw0mu/mMrVz1n5H0/TSVSwLrwWQoBvfu8dsZE/cjZHjI38ysCvxr1DyYdhJweTXbvrqyxr/4YZJ54xoVYGJQSNNvMOb4V0L/AM/ofLpcWv8Atl2TIWD+S5iY8A6n51XLA4oCOykWjrJ2MND4irFL4wVr1h5MQ6vxEmH6iuOZdLLIu1xaydnqNtkjPfzfqHjWm2qXCR3vS7sbakvZGVVN2FAPenMRLm89b2qLzWtrIlxfyfSFQ8yR+LsN3CrGtU5yNT227Gqp/wAmxTdN4zMKUvItQg0SVP0uDr2H5Gt5a8LB89qy5NssTxRP50VvuAP8arFkVQCJYlljKNuNTGWHk8yjlYK5nMBZ5C0exyMAmt5OPEbipG1SO6s8oRtXJjovs15ZiZ5fe2WRiuhHi8gskLKWEd2pLKAQAPUQjXf2rWvn179HTa/7KsfehVn7XZaVx/0cjHDD9SWiHnI7nkJ5f7aiHXy9nq/9ljj7UX7AdO2OMtVssbCIohtdt5ZjvZ2O0k1sYVxqRzGxs2bEsyLNBCsMYRfxPE1hlLLye4x+KwLryegoAoDjKrDRgCD2GiZDWSNisLeW9unAKqnJEND2hec79f66yq2RjdMRyuOtlO0FvE/y0o7pBUxHKoqDRQAOArG3kyJYO1BIUAUAUAUA3sopI4SZBpJI7uw2HTmYkDZwGgoBxQBQBQBQH//Z',
        currentNode: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRUE1MUM3OTkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRUE1MUM3QTkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNFQTUxQzc3OTEyODExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNFQTUxQzc4OTEyODExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAQABAAwERAAIRAQMRAf/EAIoAAAIDAQEBAAAAAAAAAAAAAAAGAwQFAgEIAQACAwEBAAAAAAAAAAAAAAAABAMFBgIBEAACAQIEAwUGBAcAAAAAAAABAgMABBEhMQVBURJhgZEiE6FCciMUBnGxwTPR4TJSYkM0EQACAgIBBAEFAQEAAAAAAAAAAQIDEQQxIUFhEgVRgbEiMpHR/9oADAMBAAIRAxEAPwD6poAKACgCvNuNhCcJJ0VhquIJ8BUUroR5aF57dUOZI4Tdttc4Lcpj2nD88K8WxW+6OY71L4ki0GDAFSCDoRpUyYynng9oPQoAKAIrm5htoWmmbpRfEnkK4nNQWWRXXRri5S4FTcd7u7tiqsYoOEanUf5HjVNdtyn4Rl9r5Gy14X6x+n/TNpUrwoAs2e43do/VC5A4oc1P4iparpQ4YxRtWVPMX9uw2bZukN/FivllX9yPl2jsq6o2FYvJqdPcjfHp0kuUXanHAoAU/uG/NxeGFT8qA9IHNveP6VS7t3tLHZGW+U2fez1X8x/Is7xuwsUSOJPWvJ8RBDjgMtXY8FWoK6/Z+BPXodj8GFJazXR69wuJLhj/AKwxSIfCike2nIxS4RawrjHhHK7ZBEeq1eS1kGjxSMPEElT3ivX15OpJPlZNTad5uPqFsNwIMz4/T3IHSsuGqsPdf2GlbacdVwV2zq+q9o8DFZXclpcpOmqnMcxxFR1WOEk0L697qmpLsPMciSRrIhxVwGU9hzrQxkmso2sJqSTXDCRuiNm/tBPhQ3hZCUsJsQGYsxZsyxxJ7TWbbyYVvLyKrubjd7+4bP03FtF2LGAT4sxNPVrEUXOvH1rXnqS12ShQBV3NGNnJIh6ZYPnRNxDx+YH2UI9xnozek32wito5ncFpEVxEnmbzDHu76rmsPBQyWG0Pf2xfxXGyW0hYKSv9JIxAOYHgau9OWa0av4ueaF4NaRetGQ+8CPGmWsrA9JZTQgOrIxVhgykgjtFZtrDwYWSaeGKkkZt94vrdsvVcXMR5q4AbwYU9U8xRca8vateOhLXZMFAFXc2b6N4ox1TXHyYV5vJ5R/GjOOp7nHV9jdl2Cwlt44inS8aBBKmR8owz51XN5ZQyeXkeftrabWHZLWOSFJGC5uyLicMgc+eFXenHFaNX8ZD1oXk2qaLAVPuKwaC7Nwo+VOcceT8R361TbtPrL27My/yuq4We6/mX5Fnd9pW/jRkf0buEkwT4Y4E6qw4q3Glq7PViNF7rfgwpJry1PTf2kkZGs0StLEe0MoJH4EU5GcXwy1hbCXDOUvxNlaQTXLnQJGwHezhVHjXraXLOpTiuWjV2nZp1uBfbh0m4UEQQKcUiB1OPvOedLW3Z6Lgrtna9l6x4GGxs5Lu6SBOObNyUamuKanOSSIdah2zUUPEaLHGsaDBUAVR2DKtAlhYRtIxUUkuEdV6dEdxbw3ELQyr1I2o/UVzOCksMjtqjZFxlwxV3HYbu1YtGDNBwZRmPiFU12nKHHVGY2vjbK3lftEyzlShWkdr/AM0XwL+VAF+y2y8vGAiQhOMjZKO+pqteU+ENa+nZa/1XT69hr23bILGHpTzSN+5IdT/KrmihVrpyajU040xwue7LlTjYUAFABQBWu7O0kjd5YUdgpPUVBOnOo5VRlykQz165/wBRT+xDt222CWduwt4+v008xUE49I514qILsjmOpVHiK/wv4YZDSpRgKACgD//Z',
        theGraph: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0Qzk4NjExODkxNUIxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0Qzk4NjExOTkxNUIxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRDOTg2MTE2OTE1QjExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRDOTg2MTE3OTE1QjExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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',
        infoPanel: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTVBMUE2NTkxNUYxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTVBMUE2NjkxNUYxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFNUExQTYzOTE1RjExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFNUExQTY0OTE1RjExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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',
        legend: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkYAAAAuCAIAAABCh0ElAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAxIDc5LmMwMjA0YjJkZWYsIDIwMjMvMDIvMDItMTI6MTQ6MjQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVDNTc0RUQxMEU3NTExRUU5OUEwQ0Y1NjVENTg4RkJGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVDNTc0RUQwMEU3NTExRUU5OUEwQ0Y1NjVENTg4RkJGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNGMTQxNDdEMEM1ODExRUU5OUEwQ0Y1NjVENTg4RkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNGMTQxNDdFMEM1ODExRUU5OUEwQ0Y1NjVENTg4RkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+flGY+gAAGw1JREFUeNrs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'
    };
    if (help.images) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].extend(images, help.images);
    }
    var _html = '\n        <div class=\'c-help__body\' style="text-align: left;">\n            <p>The provenance graph allows users to view the ancestors and descendants of a particular entity.</p>\n            <h4>The Graph</h4>\n            <img src="'.concat(images.theGraph, '" alt="provenance graph" width="100%" />\n            <p>The graph is fully interactive. Features include:</p>\n            <ul>\n                <li>\n                    Users may drag (<i class=\'fa fa-arrows\' role=\'presentation\'></i>) nodes around.\n                </li>\n                <li>\n                    Clicking any node reveals its <a href="#info-panel">info panel</a>.\n                </li>\n                <li>\n                    The graph is zoomable. Zoom is activated by first clicking anywhere on the graph.\n                    Use the mouse scroll wheel to control the zoom/scale of the graph. Zoom may be toggled via\n                    the toggle button within the legend area. Zoom automatically deactivates once the graph is out of viewport.\n                </li>\n                ').concat(help.theGraph || '', '\n            </ul>\n            <h5 class="mgn-v">Interactions &amp; Colors</h5>\n            <table>\n                <tr>\n                    <th>Graphic</th>\n                    <th>Description</th>\n                </tr>\n                <tr>\n                    <td><img src="').concat(images.currentNode, '" alt="current node" /></td>\n                    <td>Entity of the current page is denoted by a lime colored halo.</td>\n                </tr>\n                <tr>\n                    <td><img src="').concat(images.visitedNode, '" alt="visited node" /></td>\n                    <td>Visited nodes are denoted by a faint blue halo.</td>\n                </tr>\n                ').concat(help.interactionAndColors || '', '\n            </table>\n            <h4 id="info-panel">The Info Panel</h4>\n            <img src="').concat(images.infoPanel, '" alt="node info panel" width="100%" />\n            <ul>\n            <li>The info panel gives additional details about a particular node.</li>\n            <li>Some detail cells link to their respective domain page, denoted by an external link icon (<i class=\'fa fa-external-link\' role=\'presentation\'></i>). </li>\n            ').concat(help.infoPanel || '', '\n            </ul>\n            <h4>The Legend</h4>\n            <img src="').concat(images.legend, "\" alt=\"provenance legengd\" width=\"100%\" />\n            <ul>\n              <li>Legend items are filterable, clicking on a legend item toggles the entity's color map highlight.</li>\n              <li>The eye icon (<i class='fa fa-eye' role='presentation'></i>) after legend labels toggles the visibility of the respective item on the graph.</li>\n              ").concat(help.legend || '', "\n            </ul>\n            ").concat(help.otherInfo || '', "\n        </div>");
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(help.html || _html), 1), html = _useState[0];
    return {
        html: html
    };
};
_s(useHelpHtml, "cRxyuJVI3coHdUDwu4zsKZoaGAg=");
const __TURBOPACK__default__export__ = useHelpHtml;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/components/Legend.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/prop-types/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jquery/dist/jquery.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$Toggle$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/components/Toggle.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/constants.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sweetalert2/dist/sweetalert2.all.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useHelpHtml$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useHelpHtml.jsx [client] (ecmascript)");
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
var Legend = function(param) {
    var children = param.children, colorMap = param.colorMap, _param_filterNodes = param.filterNodes, filterNodes = _param_filterNodes === void 0 ? true : _param_filterNodes, _param_actionMap = param.actionMap, actionMap = _param_actionMap === void 0 ? {} : _param_actionMap, _param_selectorId = param.selectorId, selectorId = _param_selectorId === void 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SELECTOR_ID"] : _param_selectorId, _param_className = param.className, className = _param_className === void 0 ? '' : _param_className, _param_help = param.help, help = _param_help === void 0 ? {} : _param_help, _param_otherLegend = param.otherLegend, otherLegend = _param_otherLegend === void 0 ? {} : _param_otherLegend;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(colorMap), 1), colors = _useState[0];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(filterNodes), 1), filterable = _useState1[0];
    var html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useHelpHtml$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"])(help).html;
    var loaded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Legend.useEffect": function() {
            if (filterable && !loaded.current) setEvents();
        }
    }["Legend.useEffect"]);
    var showHelp = function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].fire({
            customClass: {
                container: 'c-help',
                title: 'c-help__title',
                confirmButton: 'c-help__btn'
            },
            width: help.width || 700,
            title: "".concat(help.title || help.label),
            html: html,
            showCloseButton: true,
            confirmButtonText: 'Close'
        });
    };
    var setEvents = function() {
        loaded.current = true;
        var stickClass = 'has-activeFilters';
        var selectors = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SELECTORS"].legend;
        var classFns = {
            add: 'addClass',
            remove: 'removeClass'
        };
        var getItem = function(e) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(e.currentTarget).parents(selectors.legendItem);
        };
        var toggleClass = function(e) {
            var fn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'addClass', className = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].hover;
            var $el = getItem(e);
            var node = $el.attr('data-filter') || $el.data('node');
            $el[fn](className).parent()[fn](className);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("#".concat(selectorId, " .node--").concat(node))[fn](className);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isEdge"])($el)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("#".concat(selectorId)).find('.links, #arrowhead')[fn](className);
            }
            if (!((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("#".concat(selectorId, " .node")).hasClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].hover) && fn === classFns.remove)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("#".concat(selectorId))[fn](className);
            }
        };
        var $trigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(".c-legend--".concat(selectorId, "  ").concat(selectors.legendTrigger));
        $trigger.on('click', function(e, data) {
            e.stopPropagation();
            e.preventDefault();
            if (!getItem(e).hasClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].disabled) || (data === null || data === void 0 ? void 0 : data.force)) {
                var fn = getItem(e).hasClass(stickClass) ? classFns.remove : classFns.add;
                toggleClass(e, fn);
                toggleClass(e, fn, stickClass);
                try {
                    var node = getItem(e).data('node');
                    if (fn === classFns.remove) {
                        delete window.ProvenanceTreeD3[selectorId].legendFilters[node];
                    } else {
                        window.ProvenanceTreeD3[selectorId].legendFilters[node] = true;
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        });
        $trigger.on('mouseover', function(e) {
            if (!getItem(e).hasClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].disabled)) {
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("#".concat(selectorId)).hasClass(stickClass)) toggleClass(e);
            }
        }).on('mouseleave', function(e) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("#".concat(selectorId)).hasClass(stickClass)) toggleClass(e, 'removeClass');
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(".c-legend--".concat(selectorId, " .js-legend--help")).on('click', function(e) {
            showHelp();
        });
    };
    var buildLegend = function() {
        var _loop = function(key) {
            var _otherLegend_key;
            action = actionMap[key];
            result.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "c-legend__item c-legend__item--".concat(keyToClassName(key), "  ").concat(isHelp(key) || isOther(key) && !hasFilter(key) ? '' : 'js-legend__item', " ").concat(action && action.disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CLASS_NAMES"].disabled : ''),
                "data-node": isOther(key) ? otherLegend[key].nodeKey || key : key,
                "data-filter": isOther(key) ? otherLegend[key].filterValue : undefined,
                onClick: isOther(key) && otherLegend[key].callback ? function(e) {
                    return otherLegend[key].callback(e, selectorId, key);
                } : null,
                title: getTitle(key),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "c-legend__color ".concat(getJsClassName(key), " c-legend__color--").concat(keyToClassName(key)),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                backgroundColor: getColor(key)
                            },
                            className: (_otherLegend_key = otherLegend[key]) === null || _otherLegend_key === void 0 ? void 0 : _otherLegend_key.iconContainerClass,
                            children: [
                                isHelp(key) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fa fa-question-circle-o",
                                    role: "presentation"
                                }, void 0, false, {
                                    fileName: "[project]/src/lib/components/Legend.jsx",
                                    lineNumber: 123,
                                    columnNumber: 45
                                }, _this),
                                isOther(key) && otherLegend[key].icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fa ".concat(otherLegend[key].icon),
                                    role: "presentation"
                                }, void 0, false, {
                                    fileName: "[project]/src/lib/components/Legend.jsx",
                                    lineNumber: 124,
                                    columnNumber: 71
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/lib/components/Legend.jsx",
                            lineNumber: 122,
                            columnNumber: 25
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/lib/components/Legend.jsx",
                        lineNumber: 121,
                        columnNumber: 21
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "c-legend__label",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "c-legend__label__text ".concat(getJsClassName(key)),
                                children: colors[key].name ? colors[key].name : key
                            }, void 0, false, {
                                fileName: "[project]/src/lib/components/Legend.jsx",
                                lineNumber: 128,
                                columnNumber: 25
                            }, _this),
                            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$Toggle$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                context: action.callback,
                                selectorId: action.selectorId || selectorId,
                                className: "c-legend__action ".concat(action.className),
                                disabled: action.visible !== undefined ? !action.visible : action.disabled,
                                ariaLabel: action.ariaLabel
                            }, void 0, false, {
                                fileName: "[project]/src/lib/components/Legend.jsx",
                                lineNumber: 132,
                                columnNumber: 29
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/lib/components/Legend.jsx",
                        lineNumber: 127,
                        columnNumber: 21
                    }, _this)
                ]
            }, "legend--".concat(key), true, {
                fileName: "[project]/src/lib/components/Legend.jsx",
                lineNumber: 119,
                columnNumber: 17
            }, _this));
        };
        var result = [];
        var helpLabel;
        if (help) {
            help.label = helpLabel = help.label || 'Help';
            colors[help.label] = 'transparent';
        }
        var isHelp = function(key) {
            return key === helpLabel;
        };
        var isOther = function(key) {
            return otherLegend[key] !== undefined;
        };
        var hasFilter = function(key) {
            return otherLegend[key].filterValue !== undefined;
        };
        var getColor = function(key) {
            return typeof colors[key] === 'string' ? colors[key] : colors[key].color || 'transparent';
        };
        var keyToClassName = function(key) {
            return key.replaceAll(' ', '-');
        };
        var getJsClassName = function(key) {
            return isHelp(key) ? 'js-legend--help' : isOther(key) && !hasFilter(key) ? "js-legend--".concat(keyToClassName(key)) : 'js-legend--trigger';
        };
        var getTitle = function(key) {
            return isOther(key) && otherLegend[key].title ? otherLegend[key].title : null;
        };
        var action;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jquery$2f$dist$2f$jquery$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].extend(colors, otherLegend);
        for(var key in colors)_loop(key);
        return result;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "c-legend c-legend--".concat(selectorId, " ").concat(filterable ? 'c-legend--filterable' : '', " ").concat(className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            children: [
                buildLegend(),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/lib/components/Legend.jsx",
            lineNumber: 145,
            columnNumber: 13
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/lib/components/Legend.jsx",
        lineNumber: 144,
        columnNumber: 9
    }, _this);
};
_s(Legend, "KzIX+FjZ+i6NlhxMND/qRgGefC0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useHelpHtml$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Legend;
Legend.propTypes = {
    colorMap: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].object.isRequired,
    help: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].object,
    otherLegend: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].object,
    actionMap: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].object,
    children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].object,
    filterNodes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].bool,
    selectorId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].string,
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].string
};
const __TURBOPACK__default__export__ = Legend;
var _c;
__turbopack_context__.k.register(_c, "Legend");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$ProvenanceUI$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/components/ProvenanceUI.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$Legend$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/components/Legend.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/neo4j/DataConverterNeo4J.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/constants.js [client] (ecmascript)");
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function App() {
    _s();
    var _useContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"]), contextData = _useContext.contextData, options = _useContext.options, loading = _useContext.loading;
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), data = _useState[0], setData = _useState[1];
    var initialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": function() {
            if (contextData !== null && (options.dontCheckInitialized || !initialized.current)) {
                initialized.current = true;
                setData(contextData);
            }
        }
    }["App.useEffect"], [
        setData,
        contextData,
        options.dontCheckInitialized
    ]);
    var toggleData = function(e, hideActivity, selectorId) {
        var ui = window.ProvenanceTreeD3[selectorId];
        ui.toggleData({
            filter: hideActivity ? 'Activity' : '',
            parentKey: hideActivity ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].KEY_P_ENTITY : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].KEY_P_ACT
        });
    };
    var toggleEdgeLabels = function(e, hideActivity, selectorId) {
        var ui = window.ProvenanceTreeD3[selectorId];
        ui.toggleEdgeLabels();
    };
    var actionMap = {
        Activity: {
            callback: toggleData,
            className: 'c-toggle--eye',
            ariaLabel: 'Toggle Activity Nodes',
            disabled: true
        },
        Edge: {
            callback: toggleEdgeLabels,
            className: 'c-toggle--eye',
            ariaLabel: 'Toggle Edge Labels',
            visible: false
        }
    };
    var expandCb = function() {
        console.log('expanded');
    };
    var zoomCb = function(e, selectorId) {
        var ui = window.ProvenanceTreeD3[selectorId];
        ui.disableZoom();
    };
    var otherLegend = {
        DatasetComponent: {
            iconContainerClass: 'c-help',
            icon: 'shape shape--blob',
            filterValue: 'CentralProcess',
            name: 'Data (Component)',
            title: 'Data (Component)'
        },
        Expand: {
            icon: 'fa-expand',
            callback: expandCb,
            title: 'Expand to full view'
        },
        ToggleZoom: {
            name: 'Toggle Lock',
            icon: 'fa-lock',
            callback: zoomCb,
            title: 'Toggle zooming and moving the graph'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "c-App",
        children: [
            !loading && data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$ProvenanceUI$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                data: data,
                options: options
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 81,
                columnNumber: 35
            }, this),
            options.colorMap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$Legend$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                colorMap: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, options.colorMap), {
                    Edge: '#a5abb6'
                }),
                otherLegend: otherLegend,
                className: "c-legend--flex c-legend--btns",
                help: {
                    title: 'Help, Provenance Graph',
                    infoPanel: '<li>Some entities have different shapes.</li>'
                },
                actionMap: actionMap,
                selectorId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SELECTOR_ID"]
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 82,
                columnNumber: 35
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.js",
        lineNumber: 77,
        columnNumber: 9
    }, this);
}
_s(App, "VX/COZwR0YmffaWIDdAWuaWJ8M8=");
_c = App;
const __TURBOPACK__default__export__ = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    function() {
        return __turbopack_context__.r("[project]/src/pages/index.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__c8f79584._.js.map