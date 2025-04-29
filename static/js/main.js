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

function setupTOC(){
  document.addEventListener("DOMContentLoaded", () => {
    const allTOCLinks = document.querySelectorAll(".toc a");
    const headings = Array.from(allTOCLinks)
      .map(link => document.querySelector(decodeURIComponent(link.getAttribute("href"))))
      .filter(Boolean);
  
    const isVisible = el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
  
          // Remove active from all visible TOCs
          allTOCLinks.forEach(link => {
            if (isVisible(link)) link.classList.remove("active");
          });
  
          // Add active to visible link matching this heading
          const matchingLinks = Array.from(document.querySelectorAll(`.toc a[href="#${id}"]`));
          matchingLinks.forEach(link => {
            if (isVisible(link)) link.classList.add("active");
          });
        }
      });
    }, {
      // rootMargin: "-50% 0% -40% 0%",
      threshold: 0.1
    });
  
    headings.forEach(h => observer.observe(h));
  })
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
setupTOC()
setupCopy()
setupRun()