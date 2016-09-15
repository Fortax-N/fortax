ActiveAdmin.register Company, as: "Company Information" do
config.filters = false
actions :index, :show, :update, :edit
 
 permit_params :about_us, :address_line_1, :address_line_2, :city, :state, :country, :phone_number, :email, :office_hours, :postal_code

  index do
    selectable_column
    id_column
    	column :about_us
    	column :address_line_1
    	column :address_line_2
    	column :city
    	column :state
    	column :country
      column :postal_code
    	column :phone_number
    	column :email
    	column :office_hours
      actions
  end
end

