function drawHypergraph(graph,context) {
  for (var i = 0; i < graph.edges.length; i++) {
    drawHyperedge(graph.edges[i],context);
  }
  for (var i = 0; i < graph.nodes.length; i++) {
    drawNode(context,graph.nodes[i]);
  }
}
