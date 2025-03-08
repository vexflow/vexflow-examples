function sanitizeId(id) {
  // Replace slashes (or any other problematic characters) with dashes
  return id.replace(/\//g, '-');
}

function showHtml(file, containerClass, start, end) {
  // Create a safe version of the file name for use in element IDs
  const safeId = sanitizeId(file);

  const fileHtml = `${file}.html`;
  const fileMd = `${file}.md`;

  let $target;
  if (containerClass == undefined){
    $target = 'body'
  } else {
   $target = `.${containerClass}`
  }

  // Use safeId for element IDs
  $(`<div id='${safeId}_md'></div>`).appendTo($target);
  $(`<iframe width="100%" height="250" src="${fileHtml}" title="${file}"></iframe>`).appendTo($target);
  $(`<form action="https://jsfiddle.net/api/post/library/pure/" method="post" target="_blank">
      <textarea hidden type="text" id="${safeId}_jsfiddle_html" name="html"></textarea><br>
      <input type="submit" value="Edit in JSFiddle">
    </form>`).appendTo($target);
  $(`<div id='${safeId}_html'></div>`).appendTo($target);

  $.get(fileHtml, (content) => {
    $(`#${safeId}_jsfiddle_html`).val(content);
    $(`#${safeId}_html`).html(window.markdownit().render(
      `\`\`\`html\n${content.split('\n').slice(start, end).join('\n')}\n\`\`\``
    ));
    $(`#${safeId}_html pre code`).each((index, element) => {
      hljs.highlightElement(element);
    });
  });

  $.get(fileMd)
    .done((content) => {
      $(`#${safeId}_md`).html(window.markdownit().render(content));
      $(`#${safeId}_md pre code`).each((index, element) => {
        hljs.highlightElement(element);
      });
    })
    .fail(() => {
      $(`#${safeId}_md`).html(`<h2>${file}</h2>`);
    });
}
