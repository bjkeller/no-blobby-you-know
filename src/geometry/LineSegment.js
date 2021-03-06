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

//flow 0.4.0 doesn't support ES6 module system

import Point from './Point';

// from http://stackoverflow.com/questions/7624920/number-sign-in-javascript
function sign(x) {
  return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

export default class LineSegment {
  p1 : Point;
  p2 : Point;

  constructor(p1 : Point, p2 : Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  length(): number {
    return this.p1.computeDistanceTo(this.p2);
  }

  //+1 if to the "left" facing from first point,
  //-1 if to the "right"
  //0 if on the line
  relativePosition(c: Point): number {
    var det = (c.x-this.p1.x)*(this.p2.y-this.p1.y)-(c.y-this.p1.y)*(this.p2.x-this.p1.x);
    return sign(det);
  }

  //compute center of arc passing through points p1 and p2 of convex hull
  //on "outside" of hull. (know that centroid always on the right)
  // first answer from
  // http://math.stackexchange.com/questions/92836/point-of-an-equilateral-triangle
  //
  // note: scale === 1 is equilateral triangle
  //
  computeArcCenter(scale: number = 1): Point {
    var dx = this.p2.x-this.p1.x;
    var dy = this.p2.y-this.p1.y;
    var x = (this.p2.x+this.p1.x)/2+Math.sqrt(scale*scale*4-1)*dy/2;
    var y = (this.p2.y+this.p1.y)/2-Math.sqrt(scale*scale*4-1)*dx/2;
    return new Point(x,y);
  }

  //computes point that is translated along the line p1-p2 distance dist from p1
  //
  translatePoint(dist : number) : Point {
    var vx = this.p2.x-this.p1.x;
    var vy = this.p2.y-this.p1.y;
    var vnorm = Math.sqrt(vx*vx + vy*vy);
    return new Point(this.p1.x + dist*vx/vnorm, this.p1.y + dist*vy/vnorm);
  }

  //find point p that is dist distance away from p1 on line perpendicular to
  // line determined by p1 and p2
  //
  perpendicularPoint(dist : number) : Point {
    if (this.p2.y === this.p1.y) {
      return new Point(this.p1.x, this.p1.y + dist);
    } else {
      var vy = -(this.p2.x-this.p1.x)/(this.p2.y-this.p1.y);
      var vnorm = Math.sqrt(1 + vy*vy);
      return new Point(this.p1.x + dist/vnorm, this.p1.y + dist*vy/vnorm);
    }
  }

}
