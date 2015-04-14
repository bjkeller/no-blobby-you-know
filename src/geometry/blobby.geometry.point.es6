/* @flow */

//flow 0.4.0 doesn't support ES6 module system
export default class Point {
  x: number;
  y: number;
  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
  norm() : number {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }
  compareTo(p2 : Point) : number {
    if (this.y < p2.y) {
      return -1;
    } else if (this.y === p2.y) {
      if (this.x < p2.x) {
        return -1;
      } else if (this.x === p2.x) {
        return 0;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }
  computeDistanceTo(p: Point) : number {
    var dx = p.x - this.x;
    var dy = p.y - this.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
  computeAngle(p2 : Point) : number {
    var dx = p2.y - this.y;
    var dy = p2.x - this.x;

    return Math.atan2(dx,dy);
  }
  toString() : string {
    return "Point[ " + this.x + ", " + this.y + "]";
  }
}

//module.exports.Point = Point;
