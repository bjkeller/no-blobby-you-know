/* @flow */
/*
 * Copyright (c) 2015 Benjamin Keller
 * All rights reserved
 *
 * This source code is licensed under the MIT License found in the LICENSE
 * file in the route directory of the source tree.
 *
 */

declare class Path2D {
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  arc(x:number,y:number,p:number,s:number,e:number,p:boolean): void;
  moveTo(x:number,y:number):void;
  bezierCurveTo(x:number,y:number,ex:number,ey:number,tx:number,ty:number): void;
}
