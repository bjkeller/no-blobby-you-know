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


var Immutable = require('immutable');

export default class EdgeLayout {
  edgeMap: Immutable.Map<string,PointSet>;

  constructor(gph : Graph, nodeLayout : NodeLayout) {
    this.edgeMap = new Immutable.Map();
    gph.edges.forEach(e => {
      var s = new PointSet();
      e.nodes.forEach(v => {
        s.add(nodeLayout.get(v));
      });
      this.edgeMap = this.edgeMap.set(e.id,s);
    })
  }

  get(edge: Edge) : PointSet {
    return this.edgeMap.get(edge.id);
  }

  has(edge: Edge) : boolean {
    return this.edgeMap.has(edge.id);
  }

}
