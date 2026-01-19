/* Parsing a JSON string using Js.Json.parse */

let arrayOfInts = str => {
  let json = JSON.parseOrThrow(str)
  open Aeson.Decode
  array(int, json)
}

/* prints `[3, 2, 1]` */
let _ = Console.log(arrayOfInts("[1, 2, 3]")->Array.reverse)
