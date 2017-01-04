class Form < ActiveRecord::Base
  FORM_TYPES = {
    "Select Form" => [" "," "],
    "Basic tax return" => ["Basic tax return",49.99],
    "T3" => ["T3",4],
    "T4" => ["T4",4],
    "T4A" => ["T4A",4],
    "T4A(OAS)" => ["T4A(OAS)",4],
    "T4A P" => ["T4A P",4],
    "T4E" => ["T4E",4],
    "T4RIF" => ["T4RIF",4],
    "T4RSP" => ["T4RSP",4],
    "T5" => ["T5",4],
    "T5007" => ["T5007",4],
    "RC62" => ["RC62",4],
    "RC210" => ["RC210",4],
    "Charitable donation" => ["Charitable donation",4],
    "Medical expense" => ["Medical expense",2],
    "StudentT2202" => ["Student T2202 <span style=\"color:green\">Discount</span>",-20]
  }
end
