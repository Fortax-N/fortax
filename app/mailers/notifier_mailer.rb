class NotifierMailer < ApplicationMailer
  default from: 'notifications@fortax.com'

  def mail_to_user(form_params)
  	@user = form_params[:email]
  	mail(to: @user, subject: 'Welcome to Fortax')
  end

  def mail_to_admin(form_params)
    @form_params = form_params
    @user = form_params[:email]
  	mail(to:'admin@fortax.com', from: @user, subject: 'New Form Submission')
  end
end
