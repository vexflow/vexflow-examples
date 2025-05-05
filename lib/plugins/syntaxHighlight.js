import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

/**
 * Applies syntax highlighting on build. Uses PrismJS. 
 * 
 * @param {*} eleventyConfig config object to attach plugin to 
 * 
 * @see {@link https://www.11ty.dev/docs/plugins/syntaxhighlight/ EleventySyntaxHighlight}
 */
export default function (eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlight);
};
