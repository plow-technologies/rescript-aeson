'use strict';

var Aeson_encode = require("../src/Aeson_encode.js");

console.log(JSON.stringify([
          "foo",
          "bar"
        ]));

console.log(JSON.stringify([
            "foo",
            "bar"
          ].map((function (prim) {
                return prim;
              }))));

console.log(Aeson_encode.object_(/* :: */[
          /* tuple */[
            "x",
            42
          ],
          /* :: */[
            /* tuple */[
              "foo",
              "bar"
            ],
            /* [] */0
          ]
        ]));

function point(r) {
  return Aeson_encode.object_(/* :: */[
              /* tuple */[
                "x",
                r.x
              ],
              /* :: */[
                /* tuple */[
                  "y",
                  r.y
                ],
                /* [] */0
              ]
            ]);
}

function line(r) {
  var match = r.thickness;
  return Aeson_encode.object_(/* :: */[
              /* tuple */[
                "start",
                point(r.start)
              ],
              /* :: */[
                /* tuple */[
                  "end",
                  point(r.end_)
                ],
                /* :: */[
                  /* tuple */[
                    "thickness",
                    match !== undefined ? match : null
                  ],
                  /* [] */0
                ]
              ]
            ]);
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
