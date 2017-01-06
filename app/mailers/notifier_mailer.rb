class NotifierMailer < ApplicationMailer
  default from: 'info@Fortax.ca'

  def mail_to_user(form_params:)
  	@user = form_params[:email]
  	mail(to: @user, subject: 'Welcome to Fortax')
  end

  def mail_to_admin(form_params:, pdf:, files:)
    @form_params = form_params    
    @user = form_params[:email]

    attachments['request.pdf'] = pdf    
    attachments[files["spouse_t220a"].filename] = open(files["spouse_t220a"].url).read if files.key?("spouse_t220a")    
    attachments[files["t220a"].filename] = open(files["t220a"].url).read if files.key?("t220a")    
    attachments[files["t_1013"].filename] = open(files["t_1013"].url).read if files.key?("t_1013")
    attachments[files["t_183"].filename] = open(files["t_183"].url).read if files.key?("t_183")
    
  	mail(to:'admin@fortax.com', from: @user, subject: 'New Form Submission')
  end
end
