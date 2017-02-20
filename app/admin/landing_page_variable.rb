ActiveAdmin.register LandingPageVariable do
 
 permit_params :name, :amount, :unit

  index do
    selectable_column
    id_column
    column :name
    column :amount
    column :unit
    actions
  end

  form do |f|
    inputs :amount
    inputs :unit
    actions
  end
end

