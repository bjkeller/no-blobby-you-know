/* @flow */

var Point = require('../geometry/blobby.geometry.point.es6').Point;

class Node {
  pt : Point;
  size : number;
  color : string;
  strokeColor : string;

  constructor(p : Point) {
    this.pt = p;
    this.size = 5;
    this.color = 'white';
    this.strokeColor = 'black';
  }

  

  toString() : string {
    return "Node ["+this.pt.x+","+this.pt.y+"]";
  }

}

module.exports.Node = Node;
