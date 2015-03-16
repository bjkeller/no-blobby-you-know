/* @flow */
var Node = require('./blobby.hypergraph.node.es6').Node;
var Edge = require('./blobby.hypergraph.edge.es6').Edge;

class Graph {
  nodes : Array<Node>;
  edges : Array<Edge>;

  constructor(nodes: Array<Node>, edges: Array<Edge>) {
    this.nodes = nodes;
    this.edges = edges;
  }
}

module.exports.Graph = Graph;
