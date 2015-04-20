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

import Node from './graph/Node';
import Hypergraph from './graph/Hypergraph';
import GraphLayout from './layout/GraphLayout';
import drawHypergraph from './render/GraphRenderer';

module.exports.createGraph = function(nodes: Array<Node>, edges: Array<Edge>) {
  return new Hypergraph(nodes,edges,[]);
}

/*
module.exports.createStyleMap = function(gph: Graph) {

}
*/
module.exports.createLayout = function(gph: Hypergraph,nodepos: NodePosObj) {
  return new GraphLayout(gph,nodepos);
}


module.exports.drawHypergraph = function(ctx:any, graph: Hypergraph, layout: GraphLayout) {
  drawHypergraph(ctx,graph,layout);
}
