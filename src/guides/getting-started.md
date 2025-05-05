---
title: "Getting Started"
layout: layouts/base.html
eleventyNavigation:
  key: Getting Started
  parent: Guides
---

# VexFlow

VexFlow is an open-source library for rendering music notation. It is written in TypeScript (compiled to ES6), and outputs scores to HTML Canvas and SVG. It works in browsers and also in Node.js projects (e.g., a command line script to save a score as a PDF).

The guide below refers to VexFlow 5.

## Quick Start

The quickest way to add VexFlow to a web page is via a `<script>` tag.

```html
<!doctype html>
<html>
  <head>
    <!-- IMPORTANT: Set the character set to UTF-8. Otherwise you may get weird symbols on the score. -->
    <meta charset="utf-8" />
  </head>
  <body>
    <!-- Div where the scores will be output -->
    <div id="output"></div>

    <!-- Load library -->
    <script src="https://cdn.jsdelivr.net/npm/vexflow@{% ver %}/build/cjs/vexflow-core.js"></script>

    <!-- Load Bravura and Academico (see vexflow-fonts for available fonts) -->
    <script>
    /* global VexFlow */
    VexFlow.loadFonts('Bravura', 'Academico').then(() => {
      VexFlow.setFonts('Bravura', 'Academico');
      // YOUR CODE GOES HERE
    });
    </script>
  </body>
</html>
```

It is also possible to use face fonts 

```html
<!doctype html>
<html>
  <head>
    <!-- IMPORTANT: Set the character set to UTF-8. Otherwise you may get weird symbols on the score. -->
    <meta charset="utf-8" />
  </head>
  <body>
    <!-- Load Bravura and Academico (see vexflow-fonts for available fonts) -->
    <style>
      @font-face {
        font-family: 'Bravura';
        src: url(https://cdn.jsdelivr.net/npm/@vexflow-fonts/bravura/bravura.woff2) format(woff2);
      }
      @font-face {
        font-family: 'Academico';
        src: url(https://cdn.jsdelivr.net/npm/@vexflow-fonts/academico/academico.woff2) format(woff2);
      }
    </style>
    <span style="font-family: Academico"></span>
    <span style="font-family: Bravura"></span>

    <!-- Div where the scores will be output -->
    <div id="output"></div>

    <!-- Load library -->
    <script src="https://cdn.jsdelivr.net/npm/vexflow@{% ver %}/build/cjs/vexflow.js"></script>

    <script>
      document.fonts.ready.then(() => {
        VexFlow.setFonts('Bravura', 'Academico');
        // YOUR CODE GOES HERE
      });
    </script>
  </body>
</html>
```

Specifying a particular version `vexflow@x.y.z` is good practice, to prevent rare issues with a future update breaking your deployment. During development &amp; testing, feel free to use the latest release by omitting the version number: https://cdn.jsdelivr.net/npm/vexflow/build/cjs/vexflow.js

If your project uses a bundler, you can install VexFlow from npm:

```sh
npm install vexflow
```

## Factory (with EasyScore)

Factory is VexFlow's recommended API for creating music notation. EasyScore is VexFlow's high-level API for creating voices and notes. On a web page containing a `<div id="output"></div>`, the following code displays a score:

{% demo "html" false true %}
<!doctype html>
<html>
  <head>
    <!-- IMPORTANT: Set the character set to UTF-8. Otherwise you may get weird symbols on the score. -->
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="output"></div>
    <script src="https://cdn.jsdelivr.net/npm/vexflow@{% ver %}/build/cjs/vexflow-core.js"></script>
    <script>
    /* global VexFlow */
    VexFlow.loadFonts('Bravura', 'Academico').then(() => {
      VexFlow.setFonts('Bravura', 'Academico');
      const factory = new VexFlow.Factory({
        renderer: { elementId: 'output', width: 500, height: 200 },
      });
      const score = factory.EasyScore();
      const system = factory.System();
      system
        .addStave({
          voices: [
            score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),
            score.voice(score.notes('C#4/h, C#4', { stem: 'down' })),
          ],
        })
        .addClef('treble')
        .addTimeSignature('4/4');
      factory.draw();
    });
    </script>
  </body>
</html>
{% enddemo %}

## Native API

If you need more control, you can use the low-level VexFlow API. Below, we render a stave using SVG.

{% demo "html" false true %}
<!doctype html>
<html>
  <head>
    <!-- IMPORTANT: Set the character set to UTF-8. Otherwise you may get weird symbols on the score. -->
    <meta charset="utf-8" />
  </head>
  <body>
  <!-- Div where the scores will be output -->
  <div id="output"></div>
  <!-- Load library -->
  <script src="https://cdn.jsdelivr.net/npm/vexflow@{% ver %}/build/cjs/vexflow-core.js"></script>
  <script>
  /* global VexFlow */
  VexFlow.loadFonts('Bravura', 'Academico').then(() => {
    VexFlow.setFonts('Bravura', 'Academico');
    const { Renderer, Stave } = VexFlow;
    // Create an SVG renderer and attach it to the DIV element with id="output".
    const div = document.getElementById('output');
    const renderer = new Renderer(div, Renderer.Backends.SVG);
    // Configure the rendering context.
    renderer.resize(500, 500);
    const context = renderer.getContext();
    context.setFont('Arial', 10);
    // Create a stave of width 400 at position 10, 40.
    const stave = new Stave(10, 40, 400);
    // Add a clef and time signature.
    stave.addClef('treble').addTimeSignature('4/4');
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
  });
  </script>
  </body>
</html>
{% enddemo %}