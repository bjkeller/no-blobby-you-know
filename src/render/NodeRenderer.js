/* @flow */
"use strict";
/*
 * Copyright (c) 2015 Benjamin Keller
 * All rights reserved
 *
 * This source code is licensed under the MIT License found in the LICENSE
 * file in the route directory of the source tree.
 *
 */
import Point from '../geometry/Point';
import Node from '../graph/Node';
import NodeLayout from '../layout/NodeLayout';

export default function drawNode(context : any,
                                 node : Node,
                                 layout: NodeLayout,
                                 style: NodeStyle) : void {
  var pos = layout.get(node);
  var nodePath = new Path2D();
  nodePath.arc(pos.x,pos.y,style.size,0,Math.PI*2,true);
  context.fillStyle = style.fillColor;
  context.strokeStyle = style.strokeColor;
  context.lineWidth = style.strokeWidth;

  context.fill(nodePath);
  context.stroke(nodePath);
}
