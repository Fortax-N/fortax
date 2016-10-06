class NotifierMailer < ApplicationMailer
  default from: 'info@Fortax.ca'

  def sample_email(user)
  	@user = user
  	mail(to: @user.email, subject: 'Welcome to Fortax')
  end
end
