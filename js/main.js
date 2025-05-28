function copyCode(index) {
  navigator.clipboard.writeText(codeArray[index]);
}

function runCode(index) {
  eval('"use strict";' + codeArray[index]);
}

function setupNav(){
  const toggleButton = document.getElementById('open-sidebar-btn');
  const overlay = document.getElementById('overlay');
  const themeSelector = document.getElementById('theme-select')
  
  toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
  });    
  
  overlay.addEventListener('click', () => {
  document.body.classList.remove('nav-open');
  });  
}

function setupCopy(){
  document.addEventListener("click", (e) => {
    // Only run on clicks of copy buttons
    const btn = e.target.closest(".copy-btn");
    if (!btn) return;

    // Find the nearest code block wrapper
    const block = e.target.closest(".code-block");
    if (!block) return;

    // Grab the code text (innerText so spans from highlighting are ignored)
    const codeEl = block.querySelector("code");
    const text   = codeEl.innerText;

    // Copy it
    navigator.clipboard.writeText(text);
  });
}

function setupRun(){
  document.addEventListener("click", (e) => {
    // Only run on clicks of copy buttons
    const btn = e.target.closest(".run-btn");
    if (!btn) return;
  
    // Find the nearest code block wrapper
    const block = e.target.closest(".code-demo");
    if (!block) return;
  
    // Grab the code text (innerText so spans from highlighting are ignored)
    const codeEl = block.querySelector("code");
    const text   = codeEl.innerText;
    eval(`"use strict";\n${text}`);
  });  
}

function setupButtons(){
  document.addEventListener("click")
}

setupNav()
setupCopy()
setupRun()