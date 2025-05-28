import highlightPairedShortcode from "@11ty/eleventy-plugin-syntaxhighlight/src/HighlightPairedShortcode.js";

/**
 * Escapes HTML special characters in a string to their entity equivalents.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str = "") {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/**
 * Renders a code demo wrapper with optional live iframe and syntax-highlighted code.
 *
 * @param {*} content - The raw code content to render.
 * @param {string} [language="html"] - The language class for syntax highlighting.
 * @param {string|boolean} [showRun="true"] - "true"/true to render run code button
 * @param {string|boolean} [showIframe="false"] - "true"/true to render a live demo iframe.
 * @param {number} [height=250] - Height of the iframe in pixels.
 * @returns {string} HTML string for the code demo.
 */
export default function demoShortcode(
    content,
    language = "html",
    showRun = "true",
    showIframe = "false",
    height = 250
) {
    const raw = String(content).trim();
    const button = showRun === true || showRun === "true"
      ? `<button type="button" class="run-btn" data-demo>Run Code</button>` : ""

    // highlight at build using syntax highlight plugin
    const codeHtml = highlightPairedShortcode(raw, language);

    // optional iframe
    const safe = escapeHtml(raw);
    const iframeHtml =
      showIframe === true || showIframe === "true"
        ? `<iframe
             srcdoc="${safe}"
             style="width:100%;height:${height}px;border:1px solid #ddd"
             loading="lazy"
           ></iframe>
           <form
            action="https://jsfiddle.net/api/post/library/pure"
            method="post"
            target="_blank"
            >
            <textarea hidden name="html">${safe}</textarea><br>
            <input type="submit" value = "Edit in JSFiddle">
            </form>
           `
        : "";
         
    return `
  <div class="code-demo">
    ${button}
    ${iframeHtml}
    ${codeHtml}
  </div>`;
};
