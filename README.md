# no-blobby-you-know (blobby.js)
JavaScript for HTML5 Canvas rendering of hypergraphs overlaid by simple graphs as Euler diagrams (or blobs).  Intended for visualization of simple graphs annotated by incidence relation.

It is currently refactored from some really bad procedural style code that I wrote to figure out how to draw blobs, and the repo is only partially setup.

##Context
In bioinformatics it is fairly common to deal with gene annotation data.
These may come from ontologies like the GO (the Gene Ontologies), or they may be derived as, say, terms that cooccur with the gene's name in a sentence of a journal article.
Genes (or the proteins that are made from them) can also be related in a network representing some form of relationship, like a molecular interaction between their protein products.
The goal is to "annotate" the graph with the gene annotations as described  in my [graph annotation](http://www.slideshare.net/BenjaminKeller/graphannotation0714)
presentation.

Blobby is a Java program that was originally developed by Byron Heads, Fatimah Al Ismail, John Markus, Lukas Lang and Stefan Burger, who were students in my first offering of the special topics course "Software for Scientific Reasoning" that I ran a few times at Eastern Michigan University.

When run, Blobby looks like this, and allowed you to add or remove annotations or blobs. Blobby uses the Jung hypergraph implementation, and users are able to drag the vertices around the screen. But, Blobby itself doesn't do any sophisticated layout.
!["screen of blobby"](doc/Blob6.png)

##What blobby.js does (and will do)
With blobby.js, the intent is simply to render an already laid-out graph/hypergraph to Canvas, allowing for style (e.g., color) changes.
Interactivity may come as its needed.

Like the original Blobby, I'm not trying to detect a bad graph layout. Meaning that a vertex might be rendered over top of the blob for a hyperedge that it does not belong to.  This is a layout issue, which would have to be resolved in this code if users are allowed to rearrange the graph.

##What you'll need
The code is written in EcmaScript 6 with Flow annotations. At a minimum, you will need **npm** to get started. Head over to [node.js](https://nodejs.org) for installation information on installing **node**, which will get you **npm**. Once you have it installed, it should be sufficient to run

    npm install

to get everything going.

If you are going to do any coding, you'll also need **flow** (see [flowtype.org](http://flowtype.org))

##The code
Flow and ES6 have a tense relationship, and while my goal was to take advantage of ES6 as much as possible, when flow says "Unimplemented: BLAH" then I stripped out my use of BLAH. At the moment this means

1. ES6 module import
2. let/const instead of var

When flow catches up to the standard, and I notice, I'll shift it that way.
