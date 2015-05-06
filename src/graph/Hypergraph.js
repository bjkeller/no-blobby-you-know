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

import Node from './Node';
import Edge from './Edge';
import Arc from './Arc';

export default class Hypergraph {
  nodes : Array<Node>;
  edges : Array<Edge>;
  arcs  : Array<Arc>;

  constructor(nodes: Array<Node>, edges: Array<Edge> = [], arcs: Array<Arc> = []) {
    this.nodes = nodes.slice();
    this.edges = edges.slice();
    this.arcs  = arcs.slice();
  }
}
