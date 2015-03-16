/* @flow */

var Point = require('../geometry/blobby.geometry.point.es6').Point;
var PointSet = require('../geometry/blobby.geometry.pointset.es6').PointSet;
var LineSegment = require('../geometry/blobby.geometry.linesegment.es6').LineSegment;
var Node = require('../hypergraph/blobby.hypergraph.node.es6').Node;
var Edge = require('../hypergraph/blobby.hypergraph.edge.es6').Edge;

function computeConvexHull(edge) : PointSet {
  var points = edge.getPointSet();
  points.computeConvexHull();
  return points;
}

function drawSingleton(context: any, convexHull: Array<Point>, pad: number) {
  var point = convexHull[0];
  context.beginPath();
  context.arc(point.x,point.y,pad,0,Math.PI*2,true);
  context.closePath();
}

function computeAngle(p1 : Point,p2 : Point) {
  var dx = p2.y - p1.y;
  var dy = p2.x - p1.x;

  return Math.atan2(dx,dy);
}

// transmogrified code from
// http://scaledinnovation.com/analytics/splines/aboutSplines.html
//
function getControlPoints(p0,p1,p2){
  var d01= p0.computeDistanceTo(p1);
  var d12= p1.computeDistanceTo(p2);
  var fa = d01/(d01+d12);   // scaling factor for triangle Ta
  var fb = d12/(d01+d12);   // ditto for Tb, simplifies to fb=t-fa
  var cpt1 = new Point(p1.x-fa*(p2.x-p0.x), p1.y-fa*(p2.y-p0.y));
  var cpt2 = new Point(p1.x+fb*(p2.x-p0.x), p1.y+fb*(p2.y-p0.y));
  return [cpt1,cpt2];
}

//draws hyperedge that is a pair of vertices using splines
//connecting arcs around each node.
//
function drawPair(context : any, convexHull : Array<Point>, pad: number) {
  var p0 = convexHull[0];
  var p1 = convexHull[1];
  var mid = new Point((p0.x+p1.x)/2,(p0.y+p1.y)/2);

  var ls01 = new LineSegment(p0,p1);
  var ctr01 = ls01.computeArcCenter();
  var ls10 = new LineSegment(p1,p0);
  var ctr10 = ls10.computeArcCenter();
  var angle01 = computeAngle(p0,ctr01);
  var angle10 = computeAngle(p0,ctr10);
  context.beginPath();
  var angle01 = computeAngle(p0,ctr01);
  var angle10 = computeAngle(p0,ctr10);
  context.arc(p0.x,p0.y,pad,angle10,angle01,false);
  var ctrl01 = getControlPoints(p1,mid,p0);

  var angle01 = computeAngle(p1,ctr01);
  var angle10 = computeAngle(p1,ctr10);
  context.arc(p1.x,p1.y,pad,angle01,angle10,false);
  var ctrl10 = getControlPoints(p1,mid,p0);

  context.closePath();
}

//draws hyperedge following convexhull of point set
//using arcs centered on equidistant point relative to ends of each segment
//
function drawEdge(context: any, convexHull: Array<Point>, pad: number) {
  context.beginPath();
  for (var i = 0; i < convexHull.length; i++) {
    var p0 = convexHull[(i+convexHull.length-1)%convexHull.length];
    var p1 = convexHull[i];
    var p2 = convexHull[(i+1)%convexHull.length];

    //find third point of equilateral triangle to serve as center of
    //arc connecting points of the convex hull.
    var ls01 = new LineSegment(p0,p1);
    var ctr0 = ls01.computeArcCenter();
    var ls12 = new LineSegment(p1,p2);
    var ctr1 = ls12.computeArcCenter();

    //determine angle between current point and centers for previous
    //arc and current arc
    var angle0 = computeAngle(p1,ctr0);
    var angle1 = computeAngle(p1,ctr1);

    //draw arc around hull point
    context.arc(p1.x,p1.y,pad,angle0,angle1,false);

    //draw arc between hull point arcs using ctr1 as center
    var distance = p1.computeDistanceTo(p2);
    context.arc(ctr1.x,ctr1.y,
      distance-pad,
      angle1+Math.PI,
      angle1+2*Math.PI/3,
      true);
  }
  context.closePath();
}

  //TODO by changing convex hull to Points, lost size of nodes
function drawHyperedge(context : any, edge : Edge) {
  var fillStyle = context.fillStyle;
  var strokeStyle = context.strokeStyle;

  var convexHull = computeConvexHull(edge).pset;
  if (convexHull.length > 0) {
    if (convexHull.length === 1) {
      drawSingleton(context,convexHull,edge.getPadSize());
    } else if (convexHull.length === 2) {
      drawPair(context,convexHull,edge.getPadSize());
    } else {
      drawEdge(context,convexHull,edge.getPadSize());
    }
    context.fillStyle = edge.color;
    context.fill();
    context.strokeStyle = edge.strokeColor;
    context.stroke();
    context.closePath();

    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;
  }
}

  module.exports.drawHyperedge = drawHyperedge;
