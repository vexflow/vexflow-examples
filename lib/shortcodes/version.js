import globalData from "../../src/_data/global.js";

/**
 * Eleventy shortcode to lookup a VexFlow version number by key.
 *
 * @param {string} [versionKey="v5"] - The version key to retrieve (e.g., "v5", "v4", "v3").
 * @returns {string} The version number string corresponding to the given key (e.g., "5.0.0").
 * @throws {Error} If the provided versionKey does not exist in the global data.
 */
export default function versionShortcode(versionKey = "v5") {
      // Find the entry on globalData (v5, v4, v3)
      const entry = globalData[versionKey];
      if (!entry) {
        throw new Error(`[ver shortcode] Invalid version “${versionKey}”.`);
      }
      return entry.version_number;
}