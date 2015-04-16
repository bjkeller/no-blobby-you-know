/* @flow */

type Node = { id: number; label: string };
type Edge = { id: number; label: string; nodes: Array<Node> };
type Arc  = { id: number; src: Node; tgt: Node };

export default class Graph {
  nodes : Array<Node>;
  edges : Array<Edge>;
  arcs  : Array<Arc>;

  constructor(nodes: Array<Node>, edges: Array<Edge>, arcs: Array<Arc>) {
    this.nodes = nodes.slice();
    this.edges = edges.slice();
    this.arcs  = arcs.slice();
  }
}

//module.exports.Graph = Graph;
