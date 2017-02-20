ActiveAdmin.register Form, as: "Form Fields" do
 
 permit_params :name, :price, :included_forms

  index do
    selectable_column
    id_column
  	column :name
    column :price
    column :included_forms
    actions
  end  
end

