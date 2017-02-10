class ChangeFormToFloat < ActiveRecord::Migration[5.0]
  def change
    change_column :forms, :price, :float
  end
end
