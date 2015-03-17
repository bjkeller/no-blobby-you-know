/* @flow */
//var Node = require('./blobby.hypergraph.node.es6').Node;
//var Edge = require('./blobby.hypergraph.edge.es6').Edge;

type Node = { id: number, label: string };
type Edge = { id: number, label: string, nodes: Array<Node> };
type Arc = { id: number, src: Node, tgt: Node };

class Graph {
  nodes : Array<Node>;
  edges : Array<Edge>;

  constructor(nodes: Array<Node>, edges: Array<Edge>) {
    this.nodes = nodes.slice();
    this.edges = edges.slice();
  }
}

module.exports.Graph = Graph;
