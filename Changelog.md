## Changes

### 6.1.0
* Better support for Infinity from the Haskell side.

### 6.0.0

* Support for ReScript v11 with uncurried mode

**BREAKING CHANGE**

* Remove dependency to `bs-zarith`
* Remove sized int and float encoders/decoders like `int8`, `int16`, and so on.
* Bigint encoder/decoder uses native ReScript `bigint` type instead of types from `bs-zarith`

### 5.1.0
* Support Infinity and -Infinity as floats.

### 4.9.0

* Add new function called `Aeson.Encode.beltMap1` to encode `Belt.Map.t` as dictionary

### 4.8.0

* `Aeson.Decode.beltMap` now supports decoding object as long as the key is a string. If the key is a number, it still needs to be wrapped with `""`. 
  * The given `decodeKey` will be called appropriately with either string or number.
  * Decoding array of tuples is still supported.

### 4.7.0

* BREAKING CHANGE: Remove 'nativeint' since Rescript no longer supports this

### 4.6.0

* Add `Aeson.Decode.beltMap`, `Aeson.Decode.beltMapInt`, `Aeson.Decode.beltMapString`.
* Add `Aeson.Encode.beltMap`, `Aeson.Encode.beltMapInt`, `Aeson.Encode.beltMapString`.

### 4.5.0

* BREAKING CHANGE: Rename `int64_string` to `int64_to_string` (this matches the naming convention).
* Fix `int64_of_string` to work with negative numbers.
* Add unit tests for `int64_of_string`, `int64_to_string`, and negative `bigint`.

### 4.4.0

* Require bs-platform 8.4.2 and bs-zarith 3.1.0 as a minimum versions.

### 4.3.0

* Require bs-platform 8.0.0 and bs-zarith 3.0.0 as a minimum versions.

### 4.2.0

* Add `Aeson.Decode.optionalField` returns `null` as none.
* Make `Aeson.Encode.optionalField` parameter order match `Aeson.Decode.optionalField`.

### 4.1.0

* Add `Aeson.Encode.optionalField` and `Aeson.Decode.optionalField`.

### 4.0.0

* Add dependency `bs-zarith`.
* Add `Aeson.Encode`: `uint8`, `uint16`, `uint32`, `uint64`, `int64_of_string`, `bigint`.
* Add `Aeson.Decode`: `uint8`, `uint16`, `uint32`, `uint64`, `int64_of_string`, `bigint`.
* Upgrade `bs-platform` to 7.2.2.
* Upgrade `@glennsl/bs-jest` to 0.4.9.

### 3.2.0

* Fix `Aeson.Decode.tuple6`.
* Add `Aeson.Decode.tuple7`, `Aeson.Decode.tuple8`, `Aeson.Decode.tuple9`, `Aeson.Decode.tuple10`, `Aeson.Encode.tuple6`, `Aeson.Encode.tuple7`, `Aeson.Encode.tuple8`, `Aeson.Encode.tuple9`, `Aeson.Encode.tuple10`.
* Add tests for all of the tuple functions.

### 3.1.0

* Upgrade `bs-platform` to 4.0.18.

### 3.0.0

* Change `Aeson.Decode.int64` to decode a literal.
* Move previous definition of `Aeson.Decode.int64` to `Aeson.Decode.int64_of_array` and `Aeson.Encode.int64` to `Aeson.Decode.int64_to_array`.
* Bring back `Aeson.Compatibility.Either` and the definitions of `Aeson.Decode.boolean` and `Aeson.Encode.boolean` from `1.1.0`.
* Add `Aeson.Compatibility.Either.to_result` and `Aeson.Compatibility.Either.of_result`.

### 2.0.0

* Remove support for `Js.boolean`. Remove `Aeson.Decode.boolean`, `Aeson.Decode.booleanArray`, `Aeson.Encode.boolean` and `Aeson.Encode.boolean`.
* Remove `Aeson.Compatibility`, `Aeson.Decode.either` and `Aeson.Encode.either` depend on `Belt.Result.t`.
* Remove `Aeson.Option`. These functions are now available in the BuckleScript stdlib Belt in `Belt.Option`.
* Add `Aeson.Decode.boolArray`, `Aeson.Encode.boolArray`, `Aeson.Decode.int32`, `Aeson.Encode.int32`, `Aeson.Decode.int64`, `Aeson.Encode.int64`, `Aeson.Decode.nativeint`, `Aeson.Encode.nativeint`, `Aeson.Decode.result`, `Aeson.Encode.result`.
* Require BuckleScript >= 3.1.0.

### 1.1.0

* Add `Aeson.Encode.singleEnumerator` and `Aeson.Decode.singleEnumerator` to support Haskell aeson style of serializing a enumeration type with only a single enumerator (as an empty JSON list `[]`).

* Add `Aeson.Compatibility.Either` and serialization functions.

* Fix `Aeson.Encode.date` and `Aeson.Decode.int`.

### 1.0.0

* Fork from [bs-json](https://github.com/reasonml-community/bs-json).

* Add `Aeson.Decode.date`, `Aeson.Decode.tuple2`, `Aeson.Decode.tuple3`, `Aeson.Decode.tuple4`, `Aeson.Decode.tuple5`, `Aeson.Decode.tuple6`, `Aeson.Decode.unwrapResult`.

* Add `Aeson.Encode.tuple2`, `Aeson.Encode.tuple3`, `Aeson.Encode.tuple4`, `Aeson.Encode.tuple5`, `Aeson.Encode.tuple6`.

