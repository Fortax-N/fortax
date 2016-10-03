class FixColumnName < ActiveRecord::Migration[5.0]
  def change
  	rename_column :companies, :adress_line_1, :address_line_1
  end
end
