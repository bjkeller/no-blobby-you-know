/* @flow */

var Node = require('../hypergraph/blobby.hypergraph.node').Node;

function drawNode(context : any, node : Node) : void {
  var fillStyle = context.fillStyle;
  var strokeStyle = context.strokeStyle
  context.beginPath();

  context.arc(node.pt.x,node.pt.y,node.size,0,Math.PI*2,true);
  context.closePath();

  context.fillStyle = node.color;
  context.strokeStyle = node.strokeColor;
  context.fill();
  context.stroke();
  context.fillStyle = fillStyle;
  context.strokeStyle = strokeStyle;
}

module.exports.drawNode = drawNode;
