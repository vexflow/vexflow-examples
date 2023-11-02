## Step 2: Add Notes

A `StaveNote` is a group of note heads representing a chord. It can consist of one or more notes with or without a stem and flag.

A sequence of notes is represented by a `Voice`.

Finally, you have the `System`, which adds a `Stave` with an array of voices and aligns, justifies, and renders the voices based on configurable rules, so that all the voices in the group look pretty on the stave(s).

In the code below we create a voice with two notes, a rest and a chord and associate it to a stave of the system.
