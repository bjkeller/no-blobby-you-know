/* @flow */

/* type aliases for flow -- should eventually only be in modules */
type Node = { id: number, label: string };
type Edge = { id: number, label: string, nodes: Array<Node> };
type Arc =  { id: number, label: string, src: Node, tgt: Node };
type NodeStyle = {
  size: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number
  };
type EdgeStyle = {
  padSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number
};
type ArcStyle = {
  strokeColor: string,
  strokeWidth: number
};
/* end type aliases for flow */


var Graph = require('./hypergraph/blobby.hypergraph.graph.es6').Graph;

var drawHypergraph = require('./renderer/blobby.renderer.graph.es6').drawHypergraph;


module.exports.createGraph = function(nodes: Array<Node>, edges: Array<Edge>) {
  return new Graph(nodes,edges);
}
