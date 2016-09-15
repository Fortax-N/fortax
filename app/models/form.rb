class Form < ActiveRecord::Base
  FORM_TYPES = {
    "Select Form" => "",
    "T3 Forms" => "T3",
    "T4 Forms" => "T4",
    "T4A Forms" => "T4A",
    "T4A(OAS) Forms" => "T4A(OAS)",
    "T4A P Forms" => "T4A P",
    "T4E Forms" => "T4E",
    "T4RIF Forms" => "T4RIF",
    "T4RSP Forms" => "T4RSP",
    "T5 Forms" => "T5",
    "T5007 Forms" => "T5007",
    "RC62 Forms" => "RC62",
    "RC210 Forms" => "RC210"
  }
end
