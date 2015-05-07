/* @flow */
"use strict;"
/*
 * Copyright (c) 2015 Benjamin Keller
 * All rights reserved
 *
 * This source code is licensed under the MIT License found in the LICENSE
 * file in the root directory of the source tree.
 *
 */

import Hypergraph from '../graph/Hypergraph';
import GraphLayout from '../layout/GraphLayout';
import { fillHyperedge, strokeHyperedge, fillHyperedgeLabel } from './EdgeRenderer';
import drawNode from './NodeRenderer';
import drawArc from './ArcRenderer';
import GraphStyle from '../style/GraphStyle'

export default function drawHypergraph( context: Context, graph: Hypergraph, layout: GraphLayout, style:GraphStyle) {
  for (var i = 0; i < graph.edges.length; i++) {
    if (style.edgeMap.has(graph.edges[i].id)) {
      var edgeStyle = style.edgeMap.get(graph.edges[i].id);
      fillHyperedge(context, graph.edges[i],layout.edgeLayout,edgeStyle);
    }
  }
  for (var i = 0; i < graph.arcs.length; i++) {
    var arc = graph.arcs[i];
    if (style.nodeMap.has(arc.src.id) && style.nodeMap.has(arc.tgt.id) &&
        style.arcMap.has(arc.id)) {
      var arcStyle = style.arcMap.get(arc.id);
      drawArc(context,arc,layout.nodeLayout,arcStyle);
    }
  }
  for (var i = 0; i < graph.edges.length; i++) {
    if (style.edgeMap.has(graph.edges[i].id)) {
      var edgeStyle = style.edgeMap.get(graph.edges[i].id);
      strokeHyperedge(context, graph.edges[i],layout.edgeLayout,edgeStyle);
      fillHyperedgeLabel(context,graph.edges[i],layout.edgeLayout,edgeStyle);
    }
  }
  for (var i = 0; i < graph.nodes.length; i++) {
    if (style.nodeMap.has(graph.nodes[i].id)) {
      var nodeStyle = style.nodeMap.get(graph.nodes[i].id);
      drawNode(context, graph.nodes[i],layout.nodeLayout,nodeStyle);
    }
  }

}
