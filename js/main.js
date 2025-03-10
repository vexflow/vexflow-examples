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

  // Use safeId for element IDs and append all needed elements
  $(`<div id='${safeId}_md'></div>`).appendTo($target);
  $(`<iframe width="100%" height="250" src="${fileHtml}" title="${file}"></iframe>`).appendTo($target);
  $(`<form action="https://jsfiddle.net/api/post/library/pure/" method="post" target="_blank">
      <textarea hidden type="text" id="${safeId}_jsfiddle_html" name="html"></textarea><br>
      <input type="submit" value="Edit in JSFiddle">
    </form>`).appendTo($target);
  $(`<div id='${safeId}_html' style='position: relative'></div>`).appendTo($target);

  // handle creating html code + button
  $.get(fileHtml, (content) => {
    $(`#${safeId}_jsfiddle_html`).val(content);
    $(`#${safeId}_html`).html(window.markdownit().render(
      `\`\`\`html\n${content.split('\n').slice(start, end).join('\n')}\n\`\`\``
    ));
    $(`#${safeId}_html pre code`).each((index, element) => {
      hljs.highlightElement(element);
      
      // Create the copy button and style it to be at the top right.
      const $copyBtn = $('<button>Copy</button>');
      $copyBtn.css({
        position: 'absolute',
        top: '5px',
        right: '5px',
        zIndex: 10
      });
      
      $copyBtn.on('click', () => {
        const codeText = $(element).text();
        navigator.clipboard.writeText(codeText)
          .then(() => {
            $copyBtn.text('Copied!');
            setTimeout(() => {
              $copyBtn.text('Copy');
            }, 2000);
          });
      });
      
      // Append the button to the container div
      const $pre = $(element).parent();
      $pre.parent().append($copyBtn);
    });
  });

  // handle creating markdown code + button
  $.get(fileMd)
    .done((content) => {
      $(`#${safeId}_md`).html(window.markdownit().render(content));
      $(`#${safeId}_md pre code`).each((index, element) => {
        hljs.highlightElement(element);

        const $pre = $(element);
        // Wrap the <pre> in a container if not already wrapped
        if (!$pre.parent().hasClass('code-container')) {
          $pre.wrap('<div class="code-container" style="position: relative;"></div>');
        }
        const $container = $pre.parent();
        
        // Create the copy button and style it to appear in the top right
        const $copyBtn = $('<button>Copy</button>');
        $copyBtn.css({
          position: 'absolute',
          top: '5px',
          right: '5px',
          zIndex: 10
        });
        
        $copyBtn.on('click', () => {
          const codeText = $pre.find('code').text();
          navigator.clipboard.writeText(codeText)
            .then(() => {
              $copyBtn.text('Copied!');
              setTimeout(() => {
                $copyBtn.text('Copy');
              }, 2000);
          });
      });
      
      // Append the copy button to the container
      $container.append($copyBtn);
      });
    })
    .fail(() => {
      $(`#${safeId}_md`).html(`<h2>${file}</h2>`);
    });
}

function showNavigation(containerClass){
    $(`.${containerClass}`).load('/partials/nav.html');
}