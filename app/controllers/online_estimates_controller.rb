class OnlineEstimatesController < ApplicationController
  layout "form_pages"
  def index

  end

  def create
    send_mail_to_user(params)
    send_mail_to_admin(params)

    flash[:success] = "Thank you! We have received your application and will reach out to you shortly."
    redirect_to root_path
  end


  private

  def send_mail_to_user(form_params)
    NotifierMailer.mail_to_user(form_params).deliver
  end

  def send_mail_to_admin(form_params)
    NotifierMailer.mail_to_admin(form_params).deliver
  end

  def form_params
    params.require(:form_data)   
  end
end
