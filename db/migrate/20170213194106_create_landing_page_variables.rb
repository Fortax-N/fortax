class CreateLandingPageVariables < ActiveRecord::Migration[5.0]
  def change
    create_table :landing_page_variables do |t|
      t.string :name
      t.string :amount
      t.string :unit

      t.timestamps
    end
  end
end
