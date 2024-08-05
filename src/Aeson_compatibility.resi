module Either: {
  type t<'a, 'b> =
    | Left('a)
    | @ocaml.doc(" the type parameter order of Belt.Result.t is backwards from Either ") Right('b)

  let left: 'a => t<'a, 'b>
  let right: 'b => t<'a, 'b>

  let either: ('a => 'c, 'b => 'c, t<'a, 'b>) => 'c

  let to_result: t<'a, 'b> => Belt.Result.t<'b, 'a>
  let of_result: Belt.Result.t<'b, 'a> => t<'a, 'b>

  let map: ('b => 'c, t<'a, 'b>) => t<'a, 'c>
  let \"<$>": ('b => 'c, t<'a, 'b>) => t<'a, 'c>
  let map_left: ('a => 'c, t<'a, 'b>) => t<'c, 'b>

  let bimap: ('a => 'c, 'b => 'd, t<'a, 'b>) => t<'c, 'd>

  let pure: 'b => t<'a, 'b>
  let apply: (t<'a, 'b => 'c>, t<'a, 'b>) => t<'a, 'c>
  let \"<*>": (t<'a, 'b => 'c>, t<'a, 'b>) => t<'a, 'c>

  let return: 'b => t<'a, 'b>
  let bind: (t<'a, 'b>, 'b => t<'a, 'c>) => t<'a, 'c>

  let \">>=": (t<'a, 'b>, 'b => t<'a, 'c>) => t<'a, 'c>
  let throw: 'a => t<'a, 'b>

  let is_left: t<'a, 'b> => bool
  let is_right: t<'a, 'b> => bool

  let to_string: ('a => string, 'b => string, t<'a, 'b>) => string

  let error: t<exn, 'a> => 'a

  let try_: (unit => 'b) => t<exn, 'b>

  let hush: t<'a, 'b> => option<'b>
  let note: ('a, option<'b>) => t<'a, 'b>

  let fold: (('b, 'c) => 'c, 'c, t<'a, 'b>) => 'c
}
