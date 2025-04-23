import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

export default function(eleventyConfig) {
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