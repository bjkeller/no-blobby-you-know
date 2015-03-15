/* @flow */

var Point = require('./blobby.geometry.point').Point;

function compareAnglesBy(pivot : Point) {
  var comp = function comp(p1,p2) {
    var d = computeOrientation(pivot,p1,p2);
    if (d < 0) {
      return 1;
    } else if (d > 0) {
      return -1;
    } else {
      var dist1 = pivot.computeDistanceTo(p1);
      var dist2 = pivot.computeDistanceTo(p2);
      if (dist1 < dist2) {
        return 1;
      } else if (dist1 > dist2) {
        return -1;
      } else {
        return 0;
      }
    }
  }
  return comp;
}

// cross product (q-p)*(r-p)
function computeOrientation(p : Point,q : Point, r : Point) {
  return (q.x-p.x)*(r.y-p.y) - (q.y-p.y)*(r.x-p.x);
}

class PointSet {
  pset : Array<Point>;

  constructor(a : Array<Point> = []) {
    this.pset = a.slice();
  }

// adds new point so that the minimum is last element of pset array
  add(p : Point) {
    if (this.pset.length > 1) {
      var min = this.pset[this.pset.length-1];
      var comp = min.compareTo(p);
      if (comp > 0) {
        this.pset.push(p);
      } else if (comp < 0){
        this.pset[this.pset.length-1] = p;
        this.pset.push(min);
      }
    } else {
      this.pset.push(p);
    }
  }

  size() : number {
    return this.pset.length;
  }

  /*
  min() : Point {
    if (pset.length >= 1) {
      return this.pset[length-1];
    }
  }
  */

  computeCentroid() : Point {
    var xsum = 0;
    var ysum = 0;
    for (var i = this.pset.length-1; 0 <= i; i--) {
      xsum += this.pset[i].x;
      ysum += this.pset[i].y;
    }
    return new Point(xsum/this.pset.length, ysum/this.pset.length);
  }

  sort() : void {
    if (this.pset.length >= 2) {
      var pivot = this.pset[this.pset.length-1];
      this.pset.splice(this.pset.length-1,1);
      this.pset.sort(compareAnglesBy(pivot));

      for (var i = 1; i < this.pset.length-1; i++) {
        if (computeOrientation(this.pset[0],this.pset[i],this.pset[i+1])===0) {
          var d1 = this.pset[0].computeDistanceTo(this.pset[i]);
          var d2 = this.pset[0].computeDistanceTo(this.pset[i+1]);
          if (d1 <= d2) {
            this.pset.splice(i,1);
          } else {
            this.pset.splice(i+1,1);
          }
        } else {
          i++;
        }
      }

      //placing pivot at end rather than beginning
      //since array represents a cycle of points
      //TODO make sure this doesn't have adverse effect below
      this.pset.push(pivot);

    }
  }

  computeConvexHull() : PointSet {
    var hull = new PointSet(this.pset);
    hull.sort();
    if (hull.pset.length > 3) {
      var i = 0;
      while ((hull.pset.length > 2)&&(i < hull.pset.length-2)) {
        if (computeOrientation(hull.pset[i],hull.pset[i+1],hull.pset[i+2]) <= 0) {
          hull.pset.splice(i+1,1);
          if (i > 0) { i--; }
        } else {
          i++;
        }
      }
    }
    return hull;
  }

}

module.exports.PointSet = PointSet;
