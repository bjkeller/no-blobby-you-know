/* @flow */

var PointSet = require('../geometry/blobby.geometry.pointset').PointSet;
var Node = require('../hypergraph/blobby.hypergraph.node').Node;

class Edge {
  nodes : Array<Node>;
  color : string;
  strokeColor : string;
  padSize : number;

  constructor(a : Array<Node> = []) {
    this.nodes = a.slice();
  }

  getPointSet() : PointSet {
    var points = new PointSet();
    this.nodes.forEach(function(node){
      points.add(node.pt);
    });
    return points;
  }

  getPadSize() : number {
    return this.padSize + this.nodes[0].size;
  }
}

module.exports.Edge = Edge;
