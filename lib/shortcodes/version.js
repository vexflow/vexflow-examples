import globalData from "../../src/_data/global.js";

export default function versionShortcode(versionKey = "v5") {
      // Find the entry on your globalData (v5, v4, v3)
      const entry = globalData[versionKey];
      if (!entry) {
        throw new Error(`[ver shortcode] Invalid version “${versionKey}”.`);
      }
      return entry.version_number;
}