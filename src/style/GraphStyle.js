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

import EdgeStyle from './EdgeStyle';

var Immutable = require('immutable');

 export default class GraphStyle {
   edgeMap : Immutable.Map<string,EdgeStyle>;
   nodeMap : Immutable.Map<string,NodeStyle>;
   arcMap  : Immutable.Map<string,ArcStyle>;

   constructor(nmap: {[key: string]: NodeStyle},
               emap: { [key: string]: EdgeStyle},
               amap: { [key: string]: ArcStyle}) {
     this.edgeMap = new Immutable.Map(emap);
     this.nodeMap = new Immutable.Map(nmap);
     this.arcMap = new Immutable.Map(amap);
   }
 }
