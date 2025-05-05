import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

/**
 * Register Eleventy HTML Base, which injects a <base> tag
 * (or rewrites URLs) so all links respect `pathPrefix`.
 *
 * @param {*} eleventyConfig config object to attach plugin to
 *
 * @see {@link https://www.11ty.dev/docs/plugins/html-base/ EleventyHtmlBasePlugin}
 */
export default function (eleventyConfig){
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
        // baseHref: eleventyConfig.pathPrefix,
        extensions: "html",
      })
}