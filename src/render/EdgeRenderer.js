/* @flow */
"use strict;"
/*
 * Copyright (c) 2015 Benjamin Keller
 * All rights reserved
 *
 * This source code is licensed under the MIT License found in the LICENSE
 * file in the root directory of the source tree.
 *
 */

import Point from '../geometry/Point';
import PointSet from '../geometry/PointSet';
import LineSegment from '../geometry/LineSegment';
import Edge from '../graph/Edge';
import EdgeLayout from '../layout/EdgeLayout';

// Draws a circle for a singleton edge
//
function createSingletonPath(convexHull: PointSet, pad: number) {
  var edgePath = new Path2D();
  var point = convexHull.pset[0];
  edgePath.arc(point.x,point.y,pad,0,Math.PI*2,true);
  return edgePath;
}

//draws hyperedge following convexhull of point set
//using arcs centered on equidistant point relative to ends of each segment
//
function createHullPath(convexHull: PointSet, pad: number) {
  //var scale = 1;
  //if (convexHull.size() === 2) {
//    scale = 3;
//  }

  var edgePath = new Path2D();
  for (var i = 0; i < convexHull.size(); i++) {
    var p0 = convexHull.pset[(i+convexHull.size()-1)%convexHull.size()];
    var p1 = convexHull.pset[i];
    var p2 = convexHull.pset[(i+1)%convexHull.size()];

    var distance = p1.computeDistanceTo(p2);

    //compute scale
    //multiplier for height of equilateral triangle
    //var height = Math.sqrt(3)/2*distance+2*pad;
    //var scale = Math.sqrt((height*height)/(distance*distance)+1/4);
    var scale = 3;

    //find third point of equilateral triangle to serve as center of
    //arc connecting points of the convex hull.
    var ls01 = new LineSegment(p0,p1);
    var ctr0 = ls01.computeArcCenter(scale);
    var ls12 = new LineSegment(p1,p2);
    var ctr1 = ls12.computeArcCenter(scale);

    //draw arc around hull point.
    edgePath.arc(p1.x,p1.y,pad,p1.computeAngle(ctr0),p1.computeAngle(ctr1),false);

    //draw arc between hull point arcs using ctr1 as center

    edgePath.arc(ctr1.x,ctr1.y,
      scale*distance-pad, //scale*distance-pad,
      ctr1.computeAngle(p1),
      ctr1.computeAngle(p2),
      true);
  }
  return edgePath;
}


export default function drawHyperedge(context : Context,
                                      edge: Edge,
                                      layout: EdgeLayout,
                                      style: EdgeStyle) {
  var fillStyle = context.fillStyle;
  var strokeStyle = context.strokeStyle;

  var edgePath = new Path2D();
  var convexHull = layout.get(edge).computeConvexHull();
  if (convexHull.size() > 0) {
    if (convexHull.size() === 1) {
      edgePath = createSingletonPath(convexHull,style.padSize);
    } else {
      edgePath = createHullPath(convexHull,style.padSize);
    }
    context.fillStyle = style.fillColor;
    context.fill(edgePath);
    context.strokeStyle = style.strokeColor;
    context.stroke(edgePath);
    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;
  }
}
