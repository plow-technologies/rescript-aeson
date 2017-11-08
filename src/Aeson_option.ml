let map f o =
  match o with
  | None   -> None
  | Some x -> Some (f x)
            
let default f o =
  match o with
  | None   -> f
  | Some x -> x
