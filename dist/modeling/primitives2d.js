'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.square = square;
exports.circle = circle;
exports.polygon = polygon;
exports.triangle = triangle;

var _csg = require('../csg');

// -- 2D primitives (OpenSCAD like notion)

function square() {
   var v = [1, 1],
       off;var a = arguments,
       p = a[0];
   if (p && !p.size) v = [p, p];
   if (p && p.length) v = a[0], p = a[1];
   if (p && p.size && p.size.length) v = p.size;

   off = [v[0] / 2, v[1] / 2];
   if (p && p.center == true) off = [0, 0];

   var o = _csg.CAG.rectangle({ center: off, radius: [v[0] / 2, v[1] / 2] });

   return o;
}

function circle() {
   var r = 1,
       off,
       fn = 32;var a = arguments,
       p = a[0];
   if (p && p.r) r = p.r;
   if (p && p.fn) fn = p.fn;
   if (p && !p.r && !p.fn && !p.center) r = p;
   off = [r, r];
   if (p && p.center == true) {
      off = [0, 0];
   }
   var o = _csg.CAG.circle({ center: off, radius: r, resolution: fn });
   return o;
}

function polygon(p) {
   // array of po(ints) and pa(ths)
   var points = new Array();
   if (p.paths && p.paths.length && p.paths[0].length) {
      // pa(th): [[0,1,2],[2,3,1]] (two paths)
      for (var j = 0; j < p.paths.length; j++) {
         for (var i = 0; i < p.paths[j].length; i++) {
            points[i] = p.points[p.paths[j][i]];
         }
      }
   } else if (p.paths && p.paths.length) {
      // pa(th): [0,1,2,3,4] (single path)
      for (var i = 0; i < p.paths.length; i++) {
         points[i] = p.points[p.paths[i]];
      }
   } else {
      // pa(th) = po(ints)
      if (p.length) {
         points = p;
      } else {
         points = p.points;
      }
   }
   return _csg.CAG.fromPoints(points);
}

function triangle() {
   // -- new addition
   var a = arguments;
   if (a[0] && a[0].length) a = a[0];
   var o = _csg.CAG.fromPoints(a);
   return o;
}