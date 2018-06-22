module Decode = Aeson_decode
module Encode = Aeson_encode
module Compatibility = Aeson_compatibility
module Json = Aeson_json
module JsJson = struct
  module Decode = Aeson_Js_Json_decode
  module Encode = Aeson_Js_Json_encode
end
