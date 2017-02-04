class Form < ActiveRecord::Base
  def self.basic_tax_return_price
    find_by(name: "Basic tax return").price
  end 
end
