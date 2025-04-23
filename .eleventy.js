import htmlBase from "./lib/plugins/html-base.js";
import navigation from "./lib/plugins/navigation.js";
import toc from "./lib/plugins/toc.js";
import configureMarkdown from "./lib/plugins/markdown.js";

// TODO: The GitHub workflow can set an environment variable to turn off debug mode.
const DEBUG_MODE = true;

export default async function (eleventyConfig) {
  eleventyConfig.addGlobalData("currDate", () => new Date());
  eleventyConfig.addPassthroughCopy({ static: "/" });

  htmlBase(eleventyConfig);
  navigation(eleventyConfig);
  toc(eleventyConfig);
  configureMarkdown(eleventyConfig);
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