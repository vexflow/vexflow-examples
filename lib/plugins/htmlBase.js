import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig){
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
        // baseHref: eleventyConfig.pathPrefix,
        extensions: "html",
      })
}