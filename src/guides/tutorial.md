---
title: "Tutorial"
layout: layouts/base.html
eleventyNavigation:
  key: Tutorial
  parent: Guides
---
# Tutorial

VexFlow is an engraving engine for music notation and can be used as a rendering backend to various kinds of web-based music tools, libraries, and applications. It written in TypeScript/JavaScript and works with both HTML5 Canvas and SVG.

This tutorial expects you to have JavaScript programming experience and a basic understanding of music notation terminology.

## Step 1: The Basics 

Let's draw an empty stave on this SVG, and set the clef and time signature.

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
    <script src="https://cdn.jsdelivr.net/npm/vexflow@5.0.0/build/cjs/vexflow-core.js"></script>
    <script>
    /* global VexFlow */
    VexFlow.loadFonts('Bravura', 'Academico').then(() => {
      VexFlow.setFonts('Bravura', 'Academico');
      const factory = new VexFlow.Factory({
        renderer: { elementId: 'output', width: 500, height: 200 },
      });
      const system = factory.System();
      system
        .addStave({
          voices: [],
        })
        .addClef('treble')
        .addTimeSignature('4/4');
      factory.draw();
    });
    </script>
  </body>
</html>
{% enddemo %}

## Step 2: Add Notes

A `StaveNote` is a group of note heads representing a chord. It can consist of one or more notes with or without a stem and flag.

A sequence of notes is represented by a `Voice`.

Finally, you have the `System`, which adds a `Stave` with an array of voices and aligns, justifies, and renders the voices based on configurable rules, so that all the voices in the group look pretty on the stave(s).

In the code below we create a voice with two notes, a rest and a chord and associate it to a stave of the system.

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
    <script src="https://cdn.jsdelivr.net/npm/vexflow@5.0.0/build/cjs/vexflow-core.js"></script>
    <script>
    /* global VexFlow */
    VexFlow.loadFonts('Bravura', 'Academico').then(() => {
      VexFlow.setFonts('Bravura', 'Academico');
      const factory = new VexFlow.Factory({
        renderer: { elementId: 'output', width: 500, height: 200 },
      });
      const system = factory.System({ width: 400 });
      const notes = [
        // A quarter-note C.
        factory.StaveNote({ keys: ['c/4'], duration: 'q' }),
        // A quarter-note D.
        factory.StaveNote({ keys: ['d/4'], duration: 'q' }),
        // A quarter-note rest. Note that the key (b/4) specifies the vertical
        // position of the rest.
        factory.StaveNote({ keys: ['b/4'], duration: 'qr' }),
        // A C-Major chord.
        factory.StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: 'q' }),
      ];
      const voice = factory.Voice().addTickables(notes);
      system
        .addStave({
          voices: [voice],
        })
        .addClef('treble')
        .addTimeSignature('4/4');
      factory.draw();
    });
    </script>
  </body>
</html>
{% enddemo %}
Let's change the font to **Finale Ash** and add a second voice with a single whole note to this tune.

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
    <script src="https://cdn.jsdelivr.net/npm/vexflow@5.0.0/build/cjs/vexflow-core.js"></script>
    <script>
    /* global VexFlow */
    VexFlow.loadFonts('Finale Ash', 'Finale Ash Text').then(() => {
      VexFlow.setFonts('Finale Ash', 'Finale Ash Text');
      const factory = new VexFlow.Factory({
        renderer: { elementId: 'output', width: 500, height: 200 },
      });
      const system = factory.System({ width: 400 });
      const notes = [
        // A quarter-note C.
        factory.StaveNote({ keys: ['c/5'], duration: 'q' }),
        // A quarter-note D.
        factory.StaveNote({ keys: ['d/4'], duration: 'q' }),
        // A quarter-note rest. Note that the key (b/4) specifies the vertical
        // position of the rest.
        factory.StaveNote({ keys: ['b/4'], duration: 'qr' }),
        // A C-Major chord.
        factory.StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: 'q' }),
      ];
      const notes2 = [
        factory.StaveNote({ keys: ['c/4'], duration: 'w' }),
      ];
      const voice = factory.Voice().addTickables(notes);
      const voice2 = factory.Voice().addTickables(notes2);
      system
        .addStave({
          voices: [voice, voice2],
        })
        .addClef('treble')
        .addTimeSignature('4/4');
      factory.draw();
    });
    </script>
  </body>
</html>
{% enddemo %}

# Step 3: Modifiers 

A modifier is an element that is attached to a note. Modifiers typically inherit from the `Modifier` base class. VexFlow supports modifiers like `Accidental`, `Vibrato`, `Annotation`, and more.

Modifiers are self-positioning – they juxtapose themselves alongside other modifiers and notes based on standard music notation rules.

Let's add some accidentals and dots.

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
    <script src="https://cdn.jsdelivr.net/npm/vexflow@5.0.0/build/cjs/vexflow-core.js"></script>
    <script>
    /* global VexFlow */
    VexFlow.loadFonts('Bravura', 'Academico').then(() => {
      VexFlow.setFonts('Bravura', 'Academico');
      const { Factory, Dot } = VexFlow;
      const factory = new Factory({
        renderer: { elementId: 'output', width: 500, height: 200 },
      });
      const system = factory.System({ width: 400 });
      function dotted(staveNote, noteIndex = -1) {
        if (noteIndex < 0) {
          Dot.buildAndAttach([staveNote], {
            all: true,
          });
        } else {
          Dot.buildAndAttach([staveNote], {
            index: noteIndex,
          });
        }
        return staveNote;
      }
      const notes = [
        dotted(factory.StaveNote({
          keys: ['e##/5'],
          duration: '8d',
        }).addModifier(factory.Accidental({ type: '##' }))),
        factory.StaveNote({
          keys: ['eb/5'],
          duration: '16',
        }).addModifier(factory.Accidental({ type: 'b' })),
        dotted(factory.StaveNote({
          keys: ['eb/4', 'd/5'],
          duration: 'h',
        }), 0 /* add dot to note at index==0 */),
        dotted(factory.StaveNote({
          keys: ['c/5', 'eb/5', 'g#/5'],
          duration: 'q',
        })
          .addModifier(factory.Accidental({ type: 'b' }), 1)
          .addModifier(factory.Accidental({ type: '#' }), 2)),
      ];
      const voice = factory.Voice().addTickables(notes);
      system
        .addStave({
          voices: [voice],
        })
        .addClef('treble')
        .addTimeSignature('4/4');
      factory.draw();
    });
    </script>
  </body>
</html>
{% enddemo %}