import htmlBase from "./lib/plugins/htmlBase.js";
import navigation from "./lib/plugins/navigation.js";
import toc from "./lib/plugins/toc.js";
import configureMarkdown from "./lib/plugins/markdown.js";
import syntaxHighlight from "./lib/plugins/syntaxHighlight.js";
import addCopyButtons from "./lib/transforms/addCopyButtons.js";
import demoShortcode from "./lib/shortcodes/demo.js";

// TODO: The GitHub workflow can set an environment variable to turn off debug mode.
const DEBUG_MODE = true;

export default async function (eleventyConfig) {
  eleventyConfig.addGlobalData("currDate", () => new Date());
  eleventyConfig.addPassthroughCopy({ static: "/" });

  // allows for named arguments in liquid shortcodes
  eleventyConfig.setLiquidParameterParsing("builtin");

  // plugins
  htmlBase(eleventyConfig);
  navigation(eleventyConfig);
  toc(eleventyConfig);
  configureMarkdown(eleventyConfig);
  syntaxHighlight(eleventyConfig)

  // transforms
  addCopyButtons(eleventyConfig)

  eleventyConfig.addPairedShortcode("demo", demoShortcode)
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