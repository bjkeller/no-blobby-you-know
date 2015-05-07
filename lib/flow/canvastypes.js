/* @flow */
/*
 * Copyright (c) 2015 Benjamin Keller
 * All rights reserved
 *
 * This source code is licensed under the MIT License found in the LICENSE
 * file in the root directory of the source tree.
 *
 */

declare class Path2D {
  arc(x:number,y:number,p:number,s:number,e:number,p:boolean): void;
  moveTo(x:number,y:number):void;
  lineTo(x:number,y:number): void;
  bezierCurveTo(x:number,y:number,ex:number,ey:number,tx:number,ty:number): void;
  fillText(x:number,y:number,t:string): void;
}

declare class Context {
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  fill(path: Path2D): void;
  stroke(path: Path2D): void;
  fillText(t:string,x:number,y:number): void;
}
