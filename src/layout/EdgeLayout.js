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
import Edge from '../graph/Edge';
import NodeLayout from './NodeLayout';
import createHullShape from '../canvas/HullShape'

var Immutable = require('immutable');

export default class EdgeLayout {
  nodeLayout: NodeLayout;
  padSize: number;
  edgeMap: Immutable.Map<string,PointSet>;
  hullMap: Immutable.Map<string,PointSet>;
  shapeMap: Immutable.Map<string,Path2D>;

  constructor(gph : Graph, nodeLayout : NodeLayout, padSize: number) {
    this.nodeLayout = nodeLayout;
    this.padSize = padSize;
    this.edgeMap = new Immutable.Map();
    gph.edges.forEach(e => {
      var s = new PointSet();
      e.nodes.forEach(v => {
        s.add(nodeLayout.get(v));
      });
      this.edgeMap = this.edgeMap.set(e.id,s);
    })
    this.hullMap = new Immutable.Map();
    this.shapeMap = new Immutable.Map();
  }

  getPointSet(edge: Edge) : PointSet {
    return this.edgeMap.get(edge.id);
  }

  hasPointSet(edge: Edge) : boolean {
    return this.edgeMap.has(edge.id);
  }

  getConvexHull(edge: Edge) : PointSet {
    var s = new PointSet();
    if (this.hasPointSet(edge)){
      if (this.hullMap.has(edge.id)) {
        s = this.hullMap.get(edge.id);
      } else {
        s = this.edgeMap.get(edge.id).computeConvexHull();
        this.hullMap = this.hullMap.set(edge.id,s);
      }
    }
    return s;
  }

  getShape(edge: Edge) : Path2D {
    var p = new Path2D();
    if (this.hasPointSet(edge)) {
      if (this.shapeMap.has(edge.id)) {
        p = this.shapeMap.get(edge.id);
      } else {
        var convexHull = this.getConvexHull(edge);
        p = createHullShape(convexHull,this.padSize);
        this.shapeMap = this.shapeMap.set(edge.id,p);
      }
    }
    return p;
  }
}
