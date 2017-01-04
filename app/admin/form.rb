ActiveAdmin.register Form, as: "Form Fields" do
 
 permit_params :name, :price

  index do
    selectable_column
    id_column
  	column :name
    column :price
    actions
  end
end

