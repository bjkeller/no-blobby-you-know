/* @flow */
"use strict";
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


/**
* createHullPath - draws hyperedge
* - a circle for a singleton edge, and
* - a series of arcs following convexhull of point set, each centered on
*   equidistant point from ends of each segment
*
* Arguments:
* - convexHull, point set for convex hull of nodes inside the edge.
* - pad, distance from point for boundary of hyperedge shape.
* - scale, multiplier to determine height of isoceles triangle used to determine
*   center point of arcs. Want large enough value to ensure arc doesn't cross
*   the line segment between adjacent points in convex hull, which might not
*   include non-hull nodes in the shape. Visually, it is better if scale >= 3,
*   with smaller giving "vacumm-packed" look, and larger approximating a
*   straight line.
*/
function createHullPath(convexHull: PointSet, pad: number, scale: number = 3): Path2D {
  var edgePath = new Path2D();
  if (convexHull.size() === 1) {
    var point = convexHull.pset[0];
    edgePath.arc(point.x,point.y,pad,0,Math.PI*2,true);
  } else {
    for (var i = 0; i < convexHull.size(); i++) {
      var p0 = convexHull.pset[(i+convexHull.size()-1)%convexHull.size()];
      var p1 = convexHull.pset[i];
      var p2 = convexHull.pset[(i+1)%convexHull.size()];

      var distance = p1.computeDistanceTo(p2);

      //find third point of triangle to serve as center of
      //arc connecting points of the convex hull.
      //need previous and current segment to determine how to draw arc around a
      //node on the hull
      var ls01 = new LineSegment(p0,p1);
      var ctr0 = ls01.computeArcCenter(scale);
      var ls12 = new LineSegment(p1,p2);
      var ctr1 = ls12.computeArcCenter(scale);

      //draw arc around hull point.
      edgePath.arc(p1.x,p1.y,pad,p1.computeAngle(ctr0),p1.computeAngle(ctr1),false);

      //draw arc between hull points p1 and p2 using ctr1 as center
      edgePath.arc(ctr1.x,ctr1.y,
        scale*distance-pad,
        ctr1.computeAngle(p1),
        ctr1.computeAngle(p2),
        true);
    }
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
  var pset = layout.get(edge);
  var centroid = pset.computeCentroid();
  var convexHull = pset.computeConvexHull();
  if (convexHull.size() > 0) {
    edgePath = createHullPath(convexHull,style.padSize);

    context.fillStyle = style.fillColor;
    context.fill(edgePath);
    context.strokeStyle = style.strokeColor;
    context.stroke(edgePath);
    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;

    context.fillText(edge.label,centroid.x,centroid.y);
  }
}
