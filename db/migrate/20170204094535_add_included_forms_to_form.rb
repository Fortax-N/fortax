class AddIncludedFormsToForm < ActiveRecord::Migration[5.0]
  def change
    add_column :forms, :included_forms, :integer, default: 1
  end
end
