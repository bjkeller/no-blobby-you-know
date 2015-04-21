/* @flow */
"use strict;"
/*
 * Copyright (c) 2015 Benjamin Keller
 * All rights reserved
 *
 * This source code is licensed under the MIT License found in the LICENSE
 * file in the route directory of the source tree.
 *
 */

import Point from '../geometry/Point';
import PointSet from '../geometry/PointSet';
import LineSegment from '../geometry/LineSegment';
import EdgeLayout from '../layout/EdgeLayout';

// Draws a circle for a singleton edge
//
function createSingletonPath(context: any, convexHull: PointSet, pad: number) {
  var edgePath = new Path2D();
  var point = convexHull.pset[0];
  edgePath.arc(point.x,point.y,pad,0,Math.PI*2,true);
  return edgePath;
}

// Finds control points for connecting seqments when drawing splines
// transmogrified code from
// http://scaledinnovation.com/analytics/splines/aboutSplines.html
//
function getControlPoints(p0:Point,p1:Point,p2:Point) : Array<Point> {
  var d01= p0.computeDistanceTo(p1);
  var d12= p1.computeDistanceTo(p2);
  var fa = 0.4*d01/(d01+d12);   // scaling factor for triangle Ta
  var fb = 0.4*d12/(d01+d12);   // ditto for Tb, simplifies to fb=t-fa
  var cpt1 = new Point(p1.x-fa*(p2.x-p0.x), p1.y-fa*(p2.y-p0.y));
  var cpt2 = new Point(p1.x+fb*(p2.x-p0.x), p1.y+fb*(p2.y-p0.y));
  return [cpt1,cpt2];
}

//draws hyperedge that is a pair of vertices using splines
//connecting arcs around each node.
//
function createPairPath(context : any, convexHull : PointSet, pad: number) {

  var p0 = convexHull.pset[0];
  var p1 = convexHull.pset[1];
  var mid = new Point((p0.x+p1.x)/2,(p0.y+p1.y)/2);

  var ls01 = new LineSegment(p0,p1);
  var ctr01 = ls01.computeArcCenter();
  var ls10 = new LineSegment(p1,p0);
  var ctr10 = ls10.computeArcCenter();

  var shape = [];
  //want to draw closed chain of bezier curves around pair of nodes.
  //want 5 points padSize distance from each hull point along:
  shape.push(ls01.translatePoint(-pad));      //0
  shape.push((new LineSegment(p0,ctr01)).translatePoint(-pad));//1
  shape.push(ls01.perpendicularPoint(pad));   //2
  shape.push((new LineSegment(mid,p1)).perpendicularPoint(pad/2));//4
  shape.push(ls10.perpendicularPoint(pad));  //6
  shape.push((new LineSegment(p1,ctr01)).translatePoint(-pad));//7

  shape.push(ls10.translatePoint(-pad));      //8
  shape.push((new LineSegment(p1,ctr10)).translatePoint(-pad));//9
  shape.push(ls10.perpendicularPoint(-pad));   //10
  shape.push((new LineSegment(mid,p0)).perpendicularPoint(-pad/2));//12
  shape.push(ls01.perpendicularPoint(-pad));  //14
  shape.push((new LineSegment(p0,ctr10)).translatePoint(-pad)); //15

  var edgePath = new Path2D();
  edgePath.moveTo(shape[0].x,shape[0].y);
  for (var i = 0; i < shape.length; i++) {
    var startcp = getControlPoints(shape[(i+shape.length-1)%shape.length],
                                   shape[i],
                                   shape[(i+1)%shape.length]);
    var endcp = getControlPoints(shape[i],
                                 shape[(i+1)%shape.length],
                                 shape[(i+2)%shape.length]);
    edgePath.bezierCurveTo(startcp[1].x,startcp[1].y,
                          endcp[0].x,endcp[0].y,
                          shape[(i+1)%shape.length].x,shape[(i+1)%shape.length].y);
  }
  return edgePath;
}

//draws hyperedge following convexhull of point set
//using arcs centered on equidistant point relative to ends of each segment
//
function createHullPath(context: any, convexHull: PointSet, pad: number) {
  var edgePath = new Path2D();
  for (var i = 0; i < convexHull.size(); i++) {
    var p0 = convexHull.pset[(i+convexHull.size()-1)%convexHull.size()];
    var p1 = convexHull.pset[i];
    var p2 = convexHull.pset[(i+1)%convexHull.size()];

    //find third point of equilateral triangle to serve as center of
    //arc connecting points of the convex hull.
    var ls01 = new LineSegment(p0,p1);
    var ctr0 = ls01.computeArcCenter();
    var ls12 = new LineSegment(p1,p2);
    var ctr1 = ls12.computeArcCenter();

    //determine angle between current point and centers for previous
    //arc and current arc
    var angle0 = p1.computeAngle(ctr0);
    var angle1 = p1.computeAngle(ctr1);

    //draw arc around hull point
    edgePath.arc(p1.x,p1.y,pad,angle0,angle1,false);

    //draw arc between hull point arcs using ctr1 as center
    var distance = p1.computeDistanceTo(p2);
    edgePath.arc(ctr1.x,ctr1.y,
      distance-pad,
      angle1+Math.PI,
      angle1+2*Math.PI/3,
      true);
  }
  return edgePath;
}


export default function drawHyperedge(context : any,
                                      edge: Edge,
                                      layout: EdgeLayout,
                                      style: EdgeStyle) {
  var fillStyle = context.fillStyle;
  var strokeStyle = context.strokeStyle;

  var edgePath = new Path2D();
  var convexHull = layout.get(edge).computeConvexHull();
  if (convexHull.size() > 0) {
    if (convexHull.size() === 1) {
      edgePath = createSingletonPath(context,convexHull,style.padSize);
    } else if (convexHull.size() === 2) {
      edgePath = createPairPath(context,convexHull,style.padSize);
    } else {
      edgePath = createHullPath(context,convexHull,style.padSize);
    }
    context.fillStyle = style.fillColor;
    context.fill(edgePath);
    context.strokeStyle = style.strokeColor;
    context.stroke(edgePath);
    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;
  }
}
