/* @flow */
"use strict";
/*
 * Copyright (c) 2015 Benjamin Keller
 * All rights reserved
 *
 * This source code is licensed under the MIT License found in the LICENSE
 * file in the route directory of the source tree.
 *
 */

import Point from '../geometry/Point';
import Node from '../graph/Node';

var Immutable = require('immutable');

export default class NodeLayout {
  nodeMap : Immutable.Map<string,Point>;

  constructor(npos : NodePosObj) {
    this.nodeMap = new Immutable.Map(npos);
    for (var prop in npos) {
      if (npos.hasOwnProperty(prop)) {
        var p = new Point(npos[prop].x,npos[prop].y);
        this.nodeMap = this.nodeMap.set(prop,p);
      }
    }
  }

  get (n: Node): Point {
    return this.nodeMap.get(n.id);
  }

  has (n: Node): boolean {
    return this.nodeMap.has(n.id);
  }

}
