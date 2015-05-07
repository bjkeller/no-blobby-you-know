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

import Node from './graph/Node';
import Edge from './graph/Edge';
import Arc from './graph/Arc';
import Hypergraph from './graph/Hypergraph';
import GraphLayout from './layout/GraphLayout';
import drawHypergraph from './render/GraphRenderer';
import GraphStyle from './style/GraphStyle';

module.exports.createGraph = function(nodes: Array<Node>, edges: Array<Edge>, arcs: Array<Arc>) {
  return new Hypergraph(nodes,edges,arcs);
}


module.exports.createStyleMap = function(nodeStyles: { [key: string]: NodeStyle },
                                         edgeStyles: { [key: string]: EdgeStyle },
                                         arcStyles: { [key: string]: ArcStyle } ) {
  return new GraphStyle(nodeStyles,edgeStyles,arcStyles);
}

module.exports.createLayout = function(gph: Hypergraph,nodepos: NodePosObj, padSize: number) {
  return new GraphLayout(gph,nodepos,padSize);
}


module.exports.drawHypergraph = function(ctx:any, graph: Hypergraph, layout: GraphLayout, style: GraphStyle) {
  drawHypergraph(ctx,graph,layout,style);
}
