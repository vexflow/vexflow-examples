const RAW_VERSIONS = {
  v5: "5.0.0",
  v4: "4.2.6",
  v3: "3.0.9",
};

/**
 * Global site data for VexFlow examples.
 * 
 * @see {@link https://www.11ty.dev/docs/data/ Eleventy Data}
*/
export default {
  name: "VexFlow",
  year: 2025,
  v5: {
    version_number: RAW_VERSIONS.v5,
    github_url: `https://github.com/vexflow/vexflow/releases/tag/${RAW_VERSIONS.v5}`,
    npm_url: `https://www.npmjs.com/package/vexflow/v/${RAW_VERSIONS.v5}`,
    jsdelivr_cjs_url: `https://cdn.jsdelivr.net/npm/vexflow@${RAW_VERSIONS.v5}/build/cjs/vexflow-debug.js`,
    jsdelivr_esm_url: `https://cdn.jsdelivr.net/npm/vexflow@${RAW_VERSIONS.v5}/build/esm/entry/vexflow-debug.js`,
  },
  v4: {
    version_number: RAW_VERSIONS.v4,
    github_url: `https://github.com/0xfe/vexflow/releases/tag/${RAW_VERSIONS.v4}`,
    npm_url: `https://www.npmjs.com/package/vexflow4/v/${RAW_VERSIONS.v4}`,
    jsdelivr_cjs_url:`https://cdn.jsdelivr.net/npm/vexflow4@${RAW_VERSIONS.v4}/build/cjs/vexflow-debug.js`,
    jsdelivr_esm_url:`https://cdn.jsdelivr.net/npm/vexflow4@${RAW_VERSIONS.v4}/build/esm/entry/vexflow-debug.js`,
  },
  v3: {
    version_number: RAW_VERSIONS.v3,
    github_url: `https://github.com/vexflow/vexflow/releases/tag/${RAW_VERSIONS.v3}`,
    npm_url: `https://www.npmjs.com/package/vexflow/v/${RAW_VERSIONS.v3}`,
    jsdelivr_cjs_url:`https://cdn.jsdelivr.net/npm/vexflow@${RAW_VERSIONS.v3}/releases/vexflow-debug.js`,
  },
};
