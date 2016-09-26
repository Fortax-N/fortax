class OnlineEstimatesController < ApplicationController
  layout "form_pages"
  def index

  end

  def create
    NotifierMailer.sample_email(:form).deliver
  end


  private

  def form_params
    params.require(:form).permit(
    :first_name
    :last_name
    :social_insurance
    :date_of_birth(1i)
    :date_of_birth(2i)
    :date_of_birth(3i)
    :status
    :change_in_status_during_year
    :date_of_change_of_status(1i)
    :date_of_change_of_status(2i)
    :date_of_change_of_status(3i)
    :status_before_date
    :gender
    :address_line_1
    :unit
    :city
    :province
    :country
    :postal_code
    :sign_document
    :phone_number
    :email
    :receive_notice_of_assessment_by_email
    :register_for_direct_deposit
    :branch
    :financial_institution
    :account
    :spouse_name
    :spouse_last_name
    :spouse_date_of_birth
    :spouse_social_insurance
    :spouse_phone_number
    :spouse_email
    :residence
    :property_tax_paid
    :rent_paid
    :child_name
    :child_last_name
    :child_date_of_birth(1i)
    :child_date_of_birth(2i)
    :child_date_of_birth(3i)
    :child_social_insurance
    )
  end
end
