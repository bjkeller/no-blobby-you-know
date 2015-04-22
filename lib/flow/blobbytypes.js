/* @flow */
/*
 * Copyright (c) 2015 Benjamin Keller
 * All rights reserved
 *
 * This source code is licensed under the MIT License found in the LICENSE
 * file in the route directory of the source tree.
 *
 */


declare class NodePosObj {
  [id: string]: { x: number; y: number}
}


declare class NodeStyle {
  size: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}

declare class EdgeStyle {
  padSize: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}

declare class ArcStyle {
  strokeColor: string;
  strokeWidth: number;
}
