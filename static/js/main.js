function sanitizeId(str) {
  let id = str.replace(/[^a-z0-9_\-]/gi, '_');
  // If the id starts with a digit, prefix it with a letter.
  if (/^\d/.test(id)) {
    id = 'id_' + id;
  }
  return id;
}

// used in entry demos:
let codeArray;
function showCode(...c) {
  codeArray = c;

  for (let i = 0; i < c.length; i++) {
    document.getElementById('code' + i).textContent = c[i];
  }
}

function copyCode(index) {
  navigator.clipboard.writeText(codeArray[index]);
}

function runCode(index) {
  eval('"use strict";' + codeArray[index]);
}
