@new external _unsafeCreateUninitializedArray: int => array<'a> = "Array"

let _isInteger = value => Js.Float.isFinite(value) && Js.Math.floor_float(value) === value

type decoder<'a> = Js.Json.t => 'a

exception DecodeError(string)

let unwrapResult = r =>
  switch r {
  | Belt.Result.Ok(v) => v
  | Belt.Result.Error(message) => DecodeError(message)->raise
  }

let wrapResult = (decoder, json) =>
  switch decoder(json) {
  | v => Belt.Result.Ok(v)
  | exception DecodeError(message) => Belt.Result.Error(message)
  }

let bool = json =>
  if Js.typeof(json) == "boolean" {
    (Obj.magic((json: Js.Json.t)): bool)
  } else {
    DecodeError("Expected boolean, got " ++ Js.Json.stringify(json))->raise
  }

let float = json =>
  if Js.typeof(json) == "number" {
    (Obj.magic((json: Js.Json.t)): float)
  } else if Js.typeof(json) == "string" {
    switch (Obj.magic((json: Js.Json.t)): string) {
    | "+inf" => Js.Float.fromString("Infinity")
    | "-inf" => Js.Float.fromString("-Infinity")
    | "Infinity" => Js.Float.fromString("Infinity")
    | "+Infinity" => Js.Float.fromString("Infinity")
    | "-Infinity" => Js.Float.fromString("-Infinity")
    | _ => DecodeError("Expected \"+inf\" or \"-inf\", got " ++ Js.Json.stringify(json))->raise
    }
  } else {
    DecodeError("Expected number, got " ++ Js.Json.stringify(json))->raise
  }

let int = json => {
  let f = float(json)
  if _isInteger(f) {
    (Obj.magic((f: float)): int)
  } else {
    DecodeError("Expected int, got " ++ Js.Json.stringify(json))->raise
  }
}

let string = json =>
  if Js.typeof(json) == "string" {
    (Obj.magic((json: Js.Json.t)): string)
  } else {
    DecodeError("Expected string, got " ++ Js.Json.stringify(json))->raise
  }

let bigint = json =>
  if Js.typeof(json) == "string" {
    let source: string = Obj.magic((json: Js.Json.t))

    try {
      BigInt.fromStringExn(source)
    } catch {
    | Exn.Error(_error) => DecodeError("Expected bigint, got " ++ source)->raise
    }
  } else {
    DecodeError("Expected bigint, got " ++ Js.Json.stringify(json))->raise
  }

let date = json =>
  if Js.typeof(json) == "string" {
    let source: string = Obj.magic((json: Js.Json.t))
    let encodedDate = Js_date.fromString(source)
    if Js_float.isNaN(Js_date.getTime(encodedDate)) {
      DecodeError("Expected date, got " ++ source)->raise
    } else {
      encodedDate
    }
  } else {
    DecodeError("Expected date, got " ++ Js.Json.stringify(json))->raise
  }

let nullable = (decode, json) =>
  if (Obj.magic(json): Js.null<'a>) === Js.null {
    Js.null
  } else {
    Js.Null.return(decode(json))
  }

let nullAs = (value, json) => {
  if (Obj.magic(json): Js.null<'a>) === Js.null {
    value
  } else {
    DecodeError("Expected null, got " ++ Js.Json.stringify(json))->raise
  }
}

let array = (decode, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    let target = _unsafeCreateUninitializedArray(length)
    for i in 0 to length - 1 {
      let value = decode(Array.getUnsafe(source, i))
      Array.setUnsafe(target, i, value)
    }
    target
  } else {
    DecodeError("Expected array, got " ++ Js.Json.stringify(json))->raise
  }

let list = (decode, json) => List.fromArray(array(decode, json))

let pair = (left, right, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 2 {
      (left(Array.getUnsafe(source, 0)), right(Array.getUnsafe(source, 1)))
    } else {
      DecodeError(`Expected array of length 2, got array of length ${Int.toString(length)}`)->raise
    }
  } else {
    DecodeError("Expected array, got " ++ Js.Json.stringify(json))->raise
  }

let tuple2 = pair

let tuple3 = (first, second, third, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 3 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
      )
    } else {
      DecodeError(`Expected array of length 3, got array of length ${Int.toString(length)}`)->raise
    }
  } else {
    DecodeError("Expected array, got " ++ Js.Json.stringify(json))->raise
  }

let tuple4 = (first, second, third, fourth, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 4 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
      )
    } else {
      DecodeError(`Expected array of length 4, got array of length ${Int.toString(length)}`)->raise
    }
  } else {
    DecodeError("Expected array, got " ++ Js.Json.stringify(json))->raise
  }

let tuple5 = (first, second, third, fourth, fifth, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 5 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
      )
    } else {
      DecodeError(`Expected array of length 5, got array of length ${Int.toString(length)}`)->raise
    }
  } else {
    DecodeError("Expected array, got " ++ Js.Json.stringify(json))->raise
  }

let tuple6 = (first, second, third, fourth, fifth, sixth, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 6 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
      )
    } else {
      DecodeError(`Expected array of length 6, got array of length ${Int.toString(length)}`)->raise
    }
  } else {
    DecodeError("Expected array, got " ++ Js.Json.stringify(json))->raise
  }

let tuple7 = (first, second, third, fourth, fifth, sixth, seventh, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 7 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
        seventh(Array.getUnsafe(source, 6)),
      )
    } else {
      DecodeError(`Expected array of length 7, got array of length ${Int.toString(length)}`)->raise
    }
  } else {
    DecodeError("Expected array, got " ++ Js.Json.stringify(json))->raise
  }

let tuple8 = (first, second, third, fourth, fifth, sixth, seventh, eighth, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 8 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
        seventh(Array.getUnsafe(source, 6)),
        eighth(Array.getUnsafe(source, 7)),
      )
    } else {
      DecodeError(`Expected array of length 8, got array of length ${Int.toString(length)}`)->raise
    }
  } else {
    DecodeError("Expected array, got " ++ Js.Json.stringify(json))->raise
  }

let tuple9 = (first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 9 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
        seventh(Array.getUnsafe(source, 6)),
        eighth(Array.getUnsafe(source, 7)),
        ninth(Array.getUnsafe(source, 8)),
      )
    } else {
      \"@@"(
        raise,
        DecodeError(`Expected array of length 9, got array of length ${Int.toString(length)}`),
      )
    }
  } else {
    \"@@"(raise, DecodeError("Expected array, got " ++ Js.Json.stringify(json)))
  }

let tuple10 = (first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 10 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
        seventh(Array.getUnsafe(source, 6)),
        eighth(Array.getUnsafe(source, 7)),
        ninth(Array.getUnsafe(source, 8)),
        tenth(Array.getUnsafe(source, 9)),
      )
    } else {
      \"@@"(
        raise,
        DecodeError(`Expected array of length 10, got array of length ${Int.toString(length)}`),
      )
    }
  } else {
    \"@@"(raise, DecodeError("Expected array, got " ++ Js.Json.stringify(json)))
  }

let singleEnumerator = (a, json) =>
  if Js.Array.isArray(json) {
    let source: array<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let length = Js.Array.length(source)
    if length == 0 {
      a
    } else {
      \"@@"(
        raise,
        DecodeError(`Expected array of length 0, got array of length ${Int.toString(length)}`),
      )
    }
  } else {
    \"@@"(raise, DecodeError("Expected array, got " ++ Js.Json.stringify(json)))
  }

let dict = (decode, json) =>
  if (
    Js.typeof(json) == "object" &&
      (!Js.Array.isArray(json) &&
      !((Obj.magic(json): Js.null<'a>) === Js.null))
  ) {
    let source: Js.Dict.t<Js.Json.t> = Obj.magic((json: Js.Json.t))
    let keys = Js.Dict.keys(source)
    let l = Js.Array.length(keys)
    let target = Js.Dict.empty()
    for i in 0 to l - 1 {
      let key = Array.getUnsafe(keys, i)
      let value = decode(Js.Dict.unsafeGet(source, key))
      Js.Dict.set(target, key, value)
    }
    target
  } else {
    \"@@"(raise, DecodeError("Expected object, got " ++ Js.Json.stringify(json)))
  }

let has_some = mas => {
  let count = Array.reduce(mas, 0, (acc, (x, _y)) =>
    switch x {
    | None => acc + 1
    | Some(_a) => acc
    }
  )
  count > 0
}

let beltMap = (decodeKey, decodeValue, ~id, json) =>
  switch array(x => pair(decodeKey, decodeValue, x), json) {
  | decoded_array => Belt.Map.fromArray(decoded_array, ~id)
  | exception DecodeError(_) =>
    switch dict(decodeValue, json) {
    | decoded_dict =>
      let entries = Js.Dict.entries(decoded_dict)
      let entries = Js.Array.map(((k, v)) => {
        let key = switch decodeKey(Obj.magic(k)) {
        | key => key
        | exception DecodeError(err) =>
          switch Belt.Int.fromString(Obj.magic(k)) {
          | Some(key) =>
            switch decodeKey(Aeson_encode.int(key)) {
            | key => key
            | exception DecodeError(_) => \"@@"(raise, DecodeError(`Object key must be a string`))
            }
          | None => \"@@"(raise, DecodeError(err))
          }
        }
        (key, v)
      }, entries)
      Belt.Map.fromArray(entries, ~id)
    | exception DecodeError(_) =>
      \"@@"(
        raise,
        DecodeError(`Expected an array of tuples or dictionary of object with string key`),
      )
    }
  }

let beltMapInt = (decodeValue, json) =>
  switch dict(decodeValue, json) {
  | decoded_dict =>
    let arr = Array.map(Js.Dict.entries(decoded_dict), ((k, v)) => (Belt.Int.fromString(k), v))
    if has_some(arr) {
      \"@@"(raise, DecodeError(`Unexpectedly received non-integer as key`))
    } else {
      Belt.Map.Int.fromArray(
        Array.map(Js.Dict.entries(decoded_dict), ((k, v)) => (int_of_string(k), v)),
      )
    }
  | exception DecodeError(_) =>
    \"@@"(raise, DecodeError(`Expected an associative array with keys as strings`))
  }

let beltMapString = (decodeValue, json) =>
  switch dict(decodeValue, json) {
  | decoded_dict => Belt.Map.String.fromArray(Js.Dict.entries(decoded_dict))
  | exception DecodeError(_) =>
    \"@@"(raise, DecodeError(`Expected an associative array with keys as strings`))
  }

let field = (key, decode, json) =>
  if (
    Js.typeof(json) == "object" &&
      (!Js.Array.isArray(json) &&
      !((Obj.magic(json): Js.null<'a>) === Js.null))
  ) {
    let dict: Js.Dict.t<Js.Json.t> = Obj.magic((json: Js.Json.t))
    switch Js.Dict.get(dict, key) {
    | Some(value) => decode(value)
    | None => \"@@"(raise, DecodeError(`Expected field '$(key)'`))
    }
  } else {
    \"@@"(raise, DecodeError("Expected object, got " ++ Js.Json.stringify(json)))
  }

let optionalField = (key, decode, json) =>
  if (
    Js.typeof(json) == "object" &&
      (!Js.Array.isArray(json) &&
      !((Obj.magic(json): Js.null<'a>) === Js.null))
  ) {
    let dict: Js.Dict.t<Js.Json.t> = Obj.magic((json: Js.Json.t))
    switch Js.Dict.get(dict, key) {
    | Some(value) =>
      if value === Aeson_encode.null {
        None
      } else {
        Some(decode(value))
      }
    | None => None
    }
  } else {
    \"@@"(raise, DecodeError("Expected object, got " ++ Js.Json.stringify(json)))
  }

let rec at = (key_path, decoder, json) =>
  switch key_path {
  | list{key} => field(key, decoder, json)
  | list{first, ...rest} => field(first, x => at(rest, decoder, x), json)
  | list{} => \"@@"(raise, Invalid_argument("Expected key_path to contain at least one element"))
  }

let optional = (decode, json) =>
  switch decode(json) {
  | exception DecodeError(_) => None
  | v => Some(v)
  }

let result = (decodeA, decodeB, json) =>
  switch Js.Json.decodeObject(json) {
  | Some(o) =>
    switch Js_dict.get(o, "Ok") {
    | Some(l) => Belt.Result.Ok(decodeA(l))
    | None =>
      switch Js_dict.get(o, "Error") {
      | Some(r) => Belt.Result.Error(decodeB(r))
      | None =>
        DecodeError(
          "Expected object with a \"Ok\" key or \"Error\" key, got " ++ Js.Json.stringify(json),
        )->raise
      }
    }
  | None =>
    DecodeError(
      "Expected object with a \"Ok\" key or \"Error\" key, got " ++ Js.Json.stringify(json),
    )->raise
  }

let either = (decodeL, decodeR, json) =>
  switch Js.Json.decodeObject(json) {
  | Some(o) =>
    switch Js_dict.get(o, "Left") {
    | Some(l) => Aeson_compatibility.Either.Left(decodeL(l))
    | None =>
      switch Js_dict.get(o, "Right") {
      | Some(r) => Aeson_compatibility.Either.Right(decodeR(r))
      | None =>
        DecodeError(
          "Expected object with a \"Left\" key or \"Right\" key, got " ++ Js.Json.stringify(json),
        )->raise
      }
    }
  | None =>
    DecodeError(
      "Expected object with a \"Left\" key or \"Right\" key, got " ++ Js.Json.stringify(json),
    )->raise
  }

let rec oneOf = (decoders, json) =>
  switch decoders {
  | list{} =>
    let length = List.length(decoders)
    DecodeError(`Expected oneOf ${Int.toString(length)}, got ` ++ Js.Json.stringify(json))->raise
  | list{decode, ...rest} =>
    switch decode(json) {
    | v => v
    | exception _ => oneOf(rest, json)
    }
  }

let tryEither = (a, b, e) => oneOf(list{a, b}, e)

let withDefault = (default, decode, json) =>
  switch decode(json) {
  | v => v
  | exception _ => default
  }

let map = (f, decode, json) => f(decode(json))

let andThen = (b, a, json) => b(a(json), json)
