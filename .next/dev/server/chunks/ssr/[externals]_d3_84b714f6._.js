module.exports = [
"[externals]/d3 [external] (d3, esm_import, [project]/node_modules/d3, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_d3_316333b9._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/d3 [external] (d3, esm_import, [project]/node_modules/d3)");
    });
});
}),
];