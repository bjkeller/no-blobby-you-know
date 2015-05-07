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

import Graph from '../graph/Hypergraph';
import NodeLayout from './NodeLayout';
import EdgeLayout from './EdgeLayout';

export default class GraphLayout {
  nodeLayout : NodeLayout;
  edgeLayout : EdgeLayout;

  constructor(gph: Graph, npos : NodePosObj, padSize: number) {
    this.nodeLayout = new NodeLayout(npos);
    this.edgeLayout = new EdgeLayout(gph,this.nodeLayout,padSize);
  }

}
