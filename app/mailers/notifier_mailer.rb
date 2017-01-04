class NotifierMailer < ApplicationMailer
  default from: 'info@Fortax.ca'

  def mail_to_user(form_params:)
  	@user = form_params[:email]
  	mail(to: @user, subject: 'Welcome to Fortax')
  end

  def mail_to_admin(form_params:, pdf:)
    @form_params = form_params    
    @user = form_params[:email]

    attachments['request.pdf'] = pdf
  	mail(to:'admin@fortax.com', from: @user, subject: 'New Form Submission')
  end
end
