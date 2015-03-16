/* @flow */
var Node = require('./blobby.hypergraph.node').Node;
var Edge = require('./blobby.hypergraph.edge').Edge;

class Graph {
  nodes : Array<Node>;
  edges : Array<Edge>;

  constructor(nodes: Array<Node>, edges: Array<Edge>) {
    this.nodes = nodes;
    this.edges = edges;
  }
}

module.exports.Graph = Graph;
