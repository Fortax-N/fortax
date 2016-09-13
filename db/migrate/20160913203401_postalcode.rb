class Postalcode < ActiveRecord::Migration[5.0]
  def change
  	add_column :companies, :postal_code, :string
  end
end
