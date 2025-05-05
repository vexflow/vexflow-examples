import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

/**
 * Helps create infinite-depth hierarchical navigation. 
 * 
 * @param {*} eleventyConfig config object to attach plugin to 
 * 
 * @see {@link https://www.11ty.dev/docs/plugins/navigation/ EleventyNavigationPlugin}
 */
export default function (eleventyConfig){
    eleventyConfig.addPlugin(eleventyNavigationPlugin)
}