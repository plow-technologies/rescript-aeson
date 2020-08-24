'use strict';

var Aeson_encode = require("../src/Aeson_encode.js");

console.log(JSON.stringify([
          "foo",
          "bar"
        ]));

console.log(JSON.stringify([
            "foo",
            "bar"
          ].map(function (prim) {
              return prim;
            })));

console.log(Aeson_encode.object_({
          hd: [
            "x",
            42
          ],
          tl: {
            hd: [
              "foo",
              "bar"
            ],
            tl: /* [] */0
          }
        }));

function point(r) {
  return Aeson_encode.object_({
              hd: [
                "x",
                r.x
              ],
              tl: {
                hd: [
                  "y",
                  r.y
                ],
                tl: /* [] */0
              }
            });
}

function line(r) {
  var x = r.thickness;
  return Aeson_encode.object_({
              hd: [
                "start",
                point(r.start)
              ],
              tl: {
                hd: [
                  "end",
                  point(r.end_)
                ],
                tl: {
                  hd: [
                    "thickness",
                    x !== undefined ? x : null
                  ],
                  tl: /* [] */0
                }
              }
            });
}

var Encode = {
  point: point,
  line: line
};

var data = {
  start: {
    x: 1.1,
    y: -0.4
  },
  end_: {
    x: 5.3,
    y: 3.8
  },
  thickness: 2
};

console.log(line(data));

exports.Encode = Encode;
exports.data = data;
/*  Not a pure module */
