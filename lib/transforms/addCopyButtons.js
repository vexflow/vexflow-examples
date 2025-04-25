export default function (eleventyConfig) {
    eleventyConfig.addTransform("addCopyButtons", (content, outputPath) => {
      if (!outputPath || !outputPath.endsWith(".html")) {
        return content;
      }
      const COPY_REGEX = /<pre[^>]*>\s*<code([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/g;

      // Wrap every <pre><code…>…</code></pre> in a .code-block + prepend a button
      return content.replace(
        COPY_REGEX,
        `<div class="code-block">
    <button class="copy-btn svg-btn" type="button" aria-label="Copy code">
    <svg fill="blue" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M27.2,8.22H23.78V5.42A3.42,3.42,0,0,0,20.36,2H5.42A3.42,3.42,0,0,0,2,5.42V20.36a3.43,3.43,0,0,0,3.42,3.42h2.8V27.2A2.81,2.81,0,0,0,11,30H27.2A2.81,2.81,0,0,0,30,27.2V11A2.81,2.81,0,0,0,27.2,8.22ZM5.42,21.91a1.55,1.55,0,0,1-1.55-1.55V5.42A1.54,1.54,0,0,1,5.42,3.87H20.36a1.55,1.55,0,0,1,1.55,1.55v2.8H11A2.81,2.81,0,0,0,8.22,11V21.91ZM28.13,27.2a.93.93,0,0,1-.93.93H11a.93.93,0,0,1-.93-.93V11a.93.93,0,0,1,.93-.93H27.2a.93.93,0,0,1,.93.93Z"></path></g></svg>
    </button>
    <pre><code$1>$2</code></pre>
  </div>`
      );
    });
  }