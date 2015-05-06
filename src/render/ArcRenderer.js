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
 import Arc from '../graph/Arc';
 import NodeLayout from '../layout/NodeLayout';

 export default function drawArc(context: Context,
                                 arc: Arc,
                                 layout: NodeLayout,
                                 style: ArcStyle) : void {
    var srcPos = layout.get(arc.src);
    var tgtPos = layout.get(arc.tgt);
    var arcPath = new Path2D();
    arcPath.moveTo(srcPos.x,srcPos.y);
    arcPath.lineTo(tgtPos.x,tgtPos.y);
    context.strokeStyle = style.strokeColor;
    context.lineWidth = style.strokeWidth;
    context.stroke(arcPath);
}
