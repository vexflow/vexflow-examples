import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import nestingTOC from "eleventy-plugin-nesting-toc";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";


// TODO: The GitHub workflow can set an environment variable to turn off debug mode.
const DEBUG_MODE = true;

export default async function (eleventyConfig) {
  eleventyConfig.addGlobalData("currDate", () => new Date());
  eleventyConfig.addPassthroughCopy({ static: "/" });
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    // baseHref: eleventyConfig.pathPrefix,
    extensions: "html",
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin); 

  eleventyConfig.addPlugin(nestingTOC, {
    tags: ["h2", "h3"],
    ul: true,
    className: "page-toc",
    showTitle: false,
  });

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(),
    slugify: s =>
      s
        .trim()
        .toLowerCase()
        .replace(/[^\w]+/g, '-'),
  });

  eleventyConfig.setLibrary("md", md);
}

export const config = {
  dir: {
    input: "src/",
    includes: "./_includes/",
    data: "./_data/",
    output: "./_site/",
  },
  pathPrefix: "/vexflow-examples/",
};