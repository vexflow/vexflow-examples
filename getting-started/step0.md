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
    <script src="https://cdn.jsdelivr.net/npm/vexflow@5.0.0-alpha.4/build/cjs/vexflow-core.js"></script>

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
    <script src="https://cdn.jsdelivr.net/npm/vxflw-early-access@alpha/build/cjs/vexflow.js"></script>

    <script>
      document.fonts.ready.then(() => {
        VexFlow.setFonts('Bravura', 'Academico');
        // YOUR CODE GOES HERE
      });
    </script>
  </body>
</html>
```

Specifying a particular version `vxflw-early-access@x.y.z` is good practice, to prevent rare issues with a future update breaking your deployment. During development &amp; testing, feel free to use the latest release by omitting the version number: https://cdn.jsdelivr.net/npm/vxflw-early-access/build/cjs/vexflow.js

If your project uses a bundler, you can install VexFlow from npm:

```sh
npm install vxflw-early-access
```

## Factory (with EasyScore)

Factory is VexFlow's recommended API for creating music notation. EasyScore is VexFlow's high-level API for creating voices and notes. On a web page containing a `<div id="output"></div>`, the following code displays a score:
