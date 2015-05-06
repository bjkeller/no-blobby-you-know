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
 import Node from './Node';

 export default class Arc {
   id: string;
   label: string;
   src: Node;
   tgt: Node;
 }
