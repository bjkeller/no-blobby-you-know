/* @flow */
"use strict;"
/*
 * Copyright (c) 2015 Benjamin Keller
 * All rights reserved
 *
 * This source code is licensed under the MIT License found in the LICENSE
 * file in the route directory of the source tree.
 *
 */

import Hypergraph from '../graph/Hypergraph';
import GraphLayout from '../layout/GraphLayout';
import drawHyperedge from './EdgeRenderer';
import drawNode from './NodeRenderer';

var defNodeStyle = { size: 5, fillColor: "black", strokeColor: "blue", strokeWidth: 1 };
var defEdgeStyle = { padSize: 20, fillColor: "pink", strokeColor: "rgba(91, 191, 63, 0.6)", strokeWidth: 1};

export default function drawHypergraph( context: any, graph: Hypergraph, layout: GraphLayout) {
  for (var i = 0; i < graph.edges.length; i++) {
    drawHyperedge(context, graph.edges[i],layout.edgeLayout,defEdgeStyle);
  }
  for (var i = 0; i < graph.nodes.length; i++) {
    drawNode(context, graph.nodes[i],layout.nodeLayout,defNodeStyle);
  }
  //TODO: add Arcs
}
