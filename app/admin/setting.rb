ActiveAdmin.register Setting do
 
 permit_params :email

  index do
    selectable_column
    id_column
    column :email
    actions
  end  
end

