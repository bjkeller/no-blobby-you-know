/* @flow */

function drawHypergraph( context: any, graph: Graph) {
  for (var i = 0; i < graph.edges.length; i++) {
    drawHyperedge(context, graph.edges[i]);
  }
  for (var i = 0; i < graph.nodes.length; i++) {
    drawNode(context, graph.nodes[i]);
  }
}

module.exports.drawHypergraph = drawHypergraph;
