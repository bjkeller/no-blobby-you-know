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


import Edge from '../graph/Edge';
import EdgeLayout from '../layout/EdgeLayout';

export function fillHyperedge(context : Context,
                              edge: Edge,
                              layout: EdgeLayout,
                              style: EdgeStyle) {
  var fillStyle = context.fillStyle;
  if (layout.hasPointSet(edge)) {
    var edgePath = layout.getShape(edge);
    context.fillStyle = style.fillColor;
    context.fill(edgePath);
  }
  context.fillStyle = fillStyle;
}

export function strokeHyperedge(context: Context,
                                edge: Edge,
                                layout: EdgeLayout,
                                style: EdgeStyle) {
  var strokeStyle = context.strokeStyle;
  if (layout.hasPointSet(edge)) {
    var edgePath = layout.getShape(edge);
    context.strokeStyle = style.strokeColor;
    context.stroke(edgePath);
  }
  context.strokeStyle = strokeStyle;
}

export function fillHyperedgeLabel(context: Context, edge: Edge, layout: EdgeLayout, style: EdgeStyle) {
  if (layout.hasPointSet(edge)) {
    var centroid = layout.getConvexHull(edge).computeCentroid();
    context.fillText(edge.label,centroid.x,centroid.y);
  }
}
