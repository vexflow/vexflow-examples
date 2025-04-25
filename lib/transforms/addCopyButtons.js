export default function (eleventyConfig) {
    eleventyConfig.addTransform("addCopyButtons", (content, outputPath) => {
      if (!outputPath || !outputPath.endsWith(".html")) {
        return content;
      }
      // Wrap every <pre><code…>…</code></pre> in a .code-block + prepend a button
      return content.replace(
        /<pre><code([\s\S]*?)>([\s\S]*?)<\/code><\/pre>/g,
        `<div class="code-block">
    <button class="copy-btn" type="button" aria-label="Copy code">Copy</button>
    <pre><code$1>$2</code></pre>
  </div>`
      );
    });
  }