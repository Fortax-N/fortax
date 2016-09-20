class Form < ActiveRecord::Base
  FORM_TYPES = {
    "Basic tax return" => ["Basic tax return",49.99],
    "T3 Forms" => ["T3",4],
    "T4 Forms" => ["T4",4],
    "T4A Forms" => ["T4A",4],
    "T4A(OAS) Forms" => ["T4A(OAS)",4],
    "T4A P Forms" => ["T4A P",4],
    "T4E Forms" => ["T4E",4],
    "T4RIF Forms" => ["T4RIF",4],
    "T4RSP Forms" => ["T4RSP",4],
    "T5 Forms" => ["T5",4],
    "T5007 Forms" => ["T5007",4],
    "RC62 Forms" => ["RC62",4],
    "RC210 Forms" => ["RC210",4],
    "Charitable donation" => ["Charitable donation",4],
    "Medical expense" => ["Medical expense",2],
    "Student T2202" => ["Student T2202 <span style=\"color:green\">Discount</span>",-20]
  }
end
