import nestingTOC from "eleventy-plugin-nesting-toc";


export default function(eleventyConfig) {
    eleventyConfig.addPlugin(nestingTOC, {
        tags: ["h2", "h3"],
        ul: true,
        className: "page-toc",
        showTitle: false,
      });
}