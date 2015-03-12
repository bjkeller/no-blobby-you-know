/* @flow */

//flow 0.4.0 doesn't support ES6 module system

var Point = require('./blobby.geometry.point').Point;

// from http://stackoverflow.com/questions/7624920/number-sign-in-javascript
function sign(x) {
  return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

class LineSegment {
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
  computeArcCenter(): Point {
    var x = ((this.p2.x+this.p1.x)+Math.sqrt(3)*(this.p2.y-this.p1.y))/2;
    var y = ((this.p2.y+this.p1.y)-Math.sqrt(3)*(this.p2.x-this.p1.x))/2;

    return new Point(x,y);
  }
}

module.exports.LineSegment = LineSegment;
