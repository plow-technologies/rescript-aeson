type encoder<'a> = 'a => Js.Json.t

@val external null: Js.Json.t = "null"
external string: string => Js.Json.t = "%identity"
external float: float => Js.Json.t = "%identity"
external int: int => Js.Json.t = "%identity"
external bool: bool => Js.Json.t = "%identity"
external dict: Js_dict.t<Js.Json.t> => Js.Json.t = "%identity"
let bigint = (x: bigint) => BigInt.toString(x)->string

let nullable = (encode, x) =>
  switch x {
  | None => null
  | Some(v) => encode(v)
  }

let withDefault = (d, encode, x) =>
  switch x {
  | None => d
  | Some(v) => encode(v)
  }

let optional = (encode, optionalValue) =>
  switch optionalValue {
  | Some(value) => encode(value)
  | None => null
  }

let optionalField = (fieldName, encode, optionalValue) =>
  switch optionalValue {
  | Some(value) => list{(fieldName, encode(value))}
  | None => list{}
  }

/* Haskell aeson renders .000Z as Z */
let date = (d): Js.Json.t => string(Js.String.replace(".000Z", "Z", Js_date.toISOString(d)))

let object_ = (props): Js.Json.t => dict(Js.Dict.fromList(props))

external array: array<Js.Json.t> => Js.Json.t = "%identity"

let list = (encode, l) => array(List.toArray(List.map(l, x => encode(x))))

let pair = (encodeT0, encodeT1, tuple) => {
  let (t0, t1) = tuple
  array([encodeT0(t0), encodeT1(t1)])
}

let tuple2 = pair

let beltMap = (encodeKey, encodeValue, obj) =>
  list(pair(encodeKey, encodeValue, ...), List.fromArray(Belt.Map.toArray(obj)))

let beltMap1 = (encodeKey, encodeValue, obj) => {
  let xs = Belt.Map.toArray(obj)
  let encodeKey1 = key =>
    switch Js.Json.classify(encodeKey(key)) {
    | JSONString(str) => str
    | _ => Js.Json.stringify(encodeKey(key))
    }
  let xs = Array.map(xs, ((k, v)) => (encodeKey1(k), encodeValue(v)))
  object_(List.fromArray(xs))
}

let beltMapInt = (encodeValue, obj) =>
  object_(
    List.map(List.fromArray(Belt.Map.Int.toArray(obj)), ((k, v)) => (
      string_of_int(k),
      encodeValue(v),
    )),
  )

let beltMapString = (encodeValue, obj) =>
  List.map(List.fromArray(Belt.Map.String.toArray(obj)), ((k, v)) => (k, encodeValue(v)))->object_

let tuple3 = (encodeT0, encodeT1, encodeT2, tuple) => {
  let (t0, t1, t2) = tuple
  array([encodeT0(t0), encodeT1(t1), encodeT2(t2)])
}

let tuple4 = (encodeT0, encodeT1, encodeT2, encodeT3, tuple) => {
  let (t0, t1, t2, t3) = tuple
  array([encodeT0(t0), encodeT1(t1), encodeT2(t2), encodeT3(t3)])
}

let tuple5 = (encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, tuple) => {
  let (t0, t1, t2, t3, t4) = tuple
  array([encodeT0(t0), encodeT1(t1), encodeT2(t2), encodeT3(t3), encodeT4(t4)])
}

let tuple6 = (encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, encodeT5, tuple) => {
  let (t0, t1, t2, t3, t4, t5) = tuple
  array([encodeT0(t0), encodeT1(t1), encodeT2(t2), encodeT3(t3), encodeT4(t4), encodeT5(t5)])
}

let tuple7 = (encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, encodeT5, encodeT6, tuple) => {
  let (t0, t1, t2, t3, t4, t5, t6) = tuple
  array([
    encodeT0(t0),
    encodeT1(t1),
    encodeT2(t2),
    encodeT3(t3),
    encodeT4(t4),
    encodeT5(t5),
    encodeT6(t6),
  ])
}

let tuple8 = (
  encodeT0,
  encodeT1,
  encodeT2,
  encodeT3,
  encodeT4,
  encodeT5,
  encodeT6,
  encodeT7,
  tuple,
) => {
  let (t0, t1, t2, t3, t4, t5, t6, t7) = tuple
  array([
    encodeT0(t0),
    encodeT1(t1),
    encodeT2(t2),
    encodeT3(t3),
    encodeT4(t4),
    encodeT5(t5),
    encodeT6(t6),
    encodeT7(t7),
  ])
}

let tuple9 = (
  encodeT0,
  encodeT1,
  encodeT2,
  encodeT3,
  encodeT4,
  encodeT5,
  encodeT6,
  encodeT7,
  encodeT8,
  tuple,
) => {
  let (t0, t1, t2, t3, t4, t5, t6, t7, t8) = tuple
  array([
    encodeT0(t0),
    encodeT1(t1),
    encodeT2(t2),
    encodeT3(t3),
    encodeT4(t4),
    encodeT5(t5),
    encodeT6(t6),
    encodeT7(t7),
    encodeT8(t8),
  ])
}

let tuple10 = (
  encodeT0,
  encodeT1,
  encodeT2,
  encodeT3,
  encodeT4,
  encodeT5,
  encodeT6,
  encodeT7,
  encodeT8,
  encodeT9,
  tuple,
) => {
  let (t0, t1, t2, t3, t4, t5, t6, t7, t8, t9) = tuple
  array([
    encodeT0(t0),
    encodeT1(t1),
    encodeT2(t2),
    encodeT3(t3),
    encodeT4(t4),
    encodeT5(t5),
    encodeT6(t6),
    encodeT7(t7),
    encodeT8(t8),
    encodeT9(t9),
  ])
}

let result = (encodeA, encodeB, e) =>
  switch e {
  | Belt.Result.Ok(a) => object_(list{("Ok", encodeA(a))})
  | Belt.Result.Error(b) => object_(list{("Error", encodeB(b))})
  }

let either = (encodeL, encodeR, e) =>
  switch e {
  | Aeson_compatibility.Either.Left(l) => object_(list{("Left", encodeL(l))})
  | Aeson_compatibility.Either.Right(r) => object_(list{("Right", encodeR(r))})
  }

let singleEnumerator = _x => array([])

external stringArray: array<string> => Js.Json.t = "%identity"
external numberArray: array<float> => Js.Json.t = "%identity"
external boolArray: array<bool> => Js.Json.t = "%identity"
