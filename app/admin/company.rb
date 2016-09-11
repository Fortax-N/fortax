ActiveAdmin.register Company, as: "Company Information" do
config.filters = false
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


 permit_params :about_us, :address_line_1, :address_line_2, :city, :state, :country, :phone_number, :email, :office_hours

  index do
    selectable_column
    id_column
	column :about_us
	column :address_line_1
	column :address_line_2
	column :city
	column :state
	column :country
	column :phone_number
	column :email
	column :office_hours
    actions
  end

  form do |f|
    f.inputs "Company Details" do
      f.input :about_us
      f.input :address_line_1
      f.input :address_line_2
      f.input :city
      f.input :state
      f.input :country
      f.input :phone_number
      f.input :email
      f.input :office_hours
    end
    f.actions
  end
end

