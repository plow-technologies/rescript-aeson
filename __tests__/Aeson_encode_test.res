open Jest
open Expect
open! Aeson.Encode

module Test = {
  type singleEnumerator = SingleEnumerator
}

type onpingKey = OnpingKey(string)

let encodeOnpingKey = (x: onpingKey) =>
  switch x {
  | OnpingKey(x) => string(x)
  }

module OnpingKeyComparable = Belt.Id.MakeComparableU({
  type t = onpingKey
  let cmp = compare
})

type onpingDescription = {descriptions: Belt.Map.t<onpingKey, string, OnpingKeyComparable.identity>}

let encodeOnpingDescription = (x: onpingDescription) => {
  let v: Js.Json.t = Aeson.Encode.beltMap(encodeOnpingKey, Aeson.Encode.string, x.descriptions)
  Aeson.Encode.object_(list{("descriptions", v)})
}

type pid = Pid(int)

let encodePid = (x: pid) =>
  switch x {
  | Pid(x) => int(x)
  }

module PidComparable = Belt.Id.MakeComparableU({
  type t = pid
  let cmp = compare
})

let _ = {
  test("null", () => expect(null)->toEqual(Obj.magic(Js.null)))

  test("string", () => expect(string("foo"))->toEqual(Obj.magic("foo")))

  test("date - non-float time", () => {
    let nowString = "2017-12-08T06:03:22Z"
    let now = Js_date.fromString(nowString)

    expect(date(now))->toEqual(Obj.magic(nowString))
  })

  test("date - float time", () => {
    let nowString = "2017-12-08T06:03:22.123Z"
    let now = Js_date.fromString(nowString)

    expect(date(now))->toEqual(Obj.magic(nowString))
  })

  test("float", () => expect(float(1.23))->toEqual(Obj.magic(1.23)))

  test("int", () => expect(int(23))->toEqual(Obj.magic(23)))

  //  test("bigint", () =>
  //    \"@@"(
  //      toEqual,
  //      Obj.magic("38293829382888882338928"),
  //      \"@@"(expect, bigint(Bigint.of_string("38293829382888882338928"))),
  //    )
  //  )
  //
  //  test("bigint", () =>
  //    \"@@"(
  //      toEqual,
  //      Obj.magic("-38293829382888882338928"),
  //      \"@@"(expect, bigint(Bigint.of_string("-38293829382888882338928"))),
  //    )
  //  )

  test("bool", () => expect(bool(true))->toEqual(Obj.magic(true)))

  test("onpingKey string Belt.Map.t (encoded as array of tuples)", () => {
    let arr = [("a", "A"), ("b", "B")]
    let arrWithKey = Array.map(arr, ((k, v)) => (OnpingKey(k), v))
    let bm: Belt.Map.t<onpingKey, string, OnpingKeyComparable.identity> = Belt.Map.fromArray(
      arrWithKey,
      ~id=module(OnpingKeyComparable),
    )
    expect(beltMap(encodeOnpingKey, string, bm))->toEqual(Obj.magic(arr))
  })

  test("onpingKey string Belt.Map.t (encoded as dictionary)", () => {
    let arr = [("a", "A"), ("b", "B")]
    let arrWithKey = Array.map(arr, ((k, v)) => (OnpingKey(k), v))
    let bm: Belt.Map.t<onpingKey, string, OnpingKeyComparable.identity> = Belt.Map.fromArray(
      arrWithKey,
      ~id=module(OnpingKeyComparable),
    )
    expect(beltMap1(encodeOnpingKey, string, bm))->toEqual(Obj.magic(Js.Dict.fromArray(arr)))
  })

  test("pid string Belt.Map.t (encoded as array of tuples)", () => {
    let arr = [(1, "A"), (2, "B")]
    let arrWithKey = Array.map(arr, ((k, v)) => (Pid(k), v))
    let bm: Belt.Map.t<pid, string, PidComparable.identity> = Belt.Map.fromArray(
      arrWithKey,
      ~id=module(PidComparable),
    )
    expect(beltMap(encodePid, string, bm))->toEqual(Obj.magic(arr))
  })

  test("pid string Belt.Map.t (encoded as dictionary)", () => {
    let arr = [(1, "A"), (2, "B")]
    let arrWithKey = Array.map(arr, ((k, v)) => (Pid(k), v))
    let bm: Belt.Map.t<pid, string, PidComparable.identity> = Belt.Map.fromArray(
      arrWithKey,
      ~id=module(PidComparable),
    )

    expect(beltMap1(encodePid, string, bm))->toEqual(
      Array.map(arr, ((k, v)) => (Belt.Int.toString(k), v))->Js.Dict.fromArray->Obj.magic,
    )
  })

  test("string Belt.Map.Int.t", () => {
    let arr = [(1, "A"), (2, "B")]
    let bm: Belt.Map.Int.t<string> = Belt.Map.Int.fromArray(arr)
    expect(beltMapInt(string, bm))->toEqual(
      Js.Dict.fromArray(Array.map(arr, ((k, v)) => (string_of_int(k), v)))->Obj.magic,
    )
  })

  test("string Belt.Map.String.t", () => {
    let arr = [("a", "A"), ("b", "B")]
    let bm: Belt.Map.String.t<string> = Belt.Map.String.fromArray(arr)
    expect(beltMapString(string, bm))->toEqual(Js.Dict.fromArray(arr)->Obj.magic)
  })

  test("dict - empty", () => expect(dict(Js.Dict.empty()))->toEqual(Js.Dict.empty()->Obj.magic))

  test("dict - simple", () => {
    let o = Js.Dict.empty()
    Js.Dict.set(o, "x", int(42))

    expect(dict(o))->toEqual(Obj.magic(o))
  })

  test("object_ - empty", () => expect(object_(list{}))->toEqual(Js.Dict.empty()->Obj.magic))

  test("object_ - simple", () =>
    expect(object_(list{("x", int(42))}))->toEqual(Obj.magic(Js.Dict.fromList(list{("x", 42)})))
  )

  test("object_ - option", () =>
    expect(object_(list{("x", optional(int, Some(42)))}))->toEqual(
      Obj.magic(Js.Dict.fromList(list{("x", 42)})),
    )
  )

  test("object_ - option Some", () =>
    expect(object_(list{("x", optional(int, Some(42)))}))->toEqual(
      Obj.magic(Js.Dict.fromList(list{("x", 42)})),
    )
  )

  test("object_ - option None", () =>
    expect(object_(list{("x", optional(int, None))}))->toEqual(
      Obj.magic(Js.Dict.fromList(list{("x", null)})),
    )
  )

  test("object_ - optionalField Some", () =>
    expect(object_(optionalField("x", int, Some(42))))->toEqual(
      Obj.magic(Js.Dict.fromList(list{("x", 42)})),
    )
  )

  test("object_ - optionalField Some", () =>
    expect(object_(optionalField("x", int, (None: option<int>))))->toEqual(
      Obj.magic(Js.Dict.fromList(list{})),
    )
  )

  test("array int", () => expect(array(Array.map([1, 2, 3], int)))->toEqual(Obj.magic([1, 2, 3])))

  test("list int", () => expect(list(int, list{1, 2, 3}))->toEqual(Obj.magic([1, 2, 3])))

  test("singleEnumerator typeParameterRef0", () =>
    expect(singleEnumerator(Test.SingleEnumerator))->toEqual(Obj.magic([]))
  )

  test("stringArray", () => expect(stringArray(["a", "b"]))->toEqual(Obj.magic(["a", "b"])))

  test("numberArray", () => expect(numberArray([0., 4.]))->toEqual(Obj.magic([0, 4])))

  test("boolArray", () => expect(boolArray([true, false]))->toEqual(Obj.magic([true, false])))

  test("result", () =>
    expect(result(string, int, Belt.Result.Error(123)))->toEqual(
      Obj.magic(Js.Dict.fromList(list{("Error", 123)})),
    )
  )

  test("result", () =>
    expect(result(string, int, Belt.Result.Ok("Good")))->toEqual(
      Obj.magic(Js.Dict.fromList(list{("Ok", "Good")})),
    )
  )

  test("either", () =>
    expect(either(int, string, Aeson.Compatibility.Either.Left(123)))->toEqual(
      Obj.magic(Js.Dict.fromList(list{("Left", 123)})),
    )
  )

  test("either", () =>
    expect(either(int, string, Aeson.Compatibility.Either.Right("Good")))->toEqual(
      Obj.magic(Js.Dict.fromList(list{("Right", "Good")})),
    )
  )

  test("pair", () => expect(pair(int, string, (1, "a")))->toEqual(Js.Json.parseExn(` [1, "a"] `)))

  test("tuple3", () =>
    expect(tuple3(int, string, bool, (1, "a", false)))->toEqual(
      Js.Json.parseExn(` [1, "a", false] `),
    )
  )

  test("tuple4", () =>
    expect(tuple4(int, string, bool, int, (1, "a", false, 2)))->toEqual(
      Js.Json.parseExn(` [1, "a", false, 2] `),
    )
  )

  test("tuple5", () =>
    expect(tuple5(int, string, bool, int, bool, (1, "a", false, 2, true)))->toEqual(
      Js.Json.parseExn(` [1, "a", false, 2, true] `),
    )
  )

  test("tuple6", () =>
    expect(tuple6(int, string, bool, int, bool, string, (1, "a", false, 2, true, "loop")))->toEqual(
      Js.Json.parseExn(` [1, "a", false, 2, true, "loop"] `),
    )
  )

  test("tuple7", () =>
    expect(
      tuple7(
        int,
        string,
        bool,
        int,
        bool,
        string,
        string,
        (1, "a", false, 2, true, "loop", "recursion"),
      ),
    )->toEqual(Js.Json.parseExn(` [1, "a", false, 2, true, "loop", "recursion"] `))
  )

  test("tuple8", () =>
    expect(
      tuple8(
        int,
        string,
        bool,
        int,
        bool,
        string,
        string,
        int,
        (1, "a", false, 2, true, "loop", "recursion", 33),
      ),
    )->toEqual(Js.Json.parseExn(` [1, "a", false, 2, true, "loop", "recursion", 33] `))
  )

  test("tuple9", () =>
    expect(
      tuple9(
        int,
        string,
        bool,
        int,
        bool,
        string,
        string,
        int,
        string,
        (1, "a", false, 2, true, "loop", "recursion", 33, "blah"),
      ),
    )->toEqual(Js.Json.parseExn(` [1, "a", false, 2, true, "loop", "recursion", 33, "blah"] `))
  )

  test("tuple10", () =>
    expect(
      tuple10(
        int,
        string,
        bool,
        int,
        bool,
        string,
        string,
        int,
        string,
        bool,
        (1, "a", false, 2, true, "loop", "recursion", 33, "blah", false),
      ),
    )->toEqual(
      Js.Json.parseExn(` [1, "a", false, 2, true, "loop", "recursion", 33, "blah", false] `),
    )
  )
}
