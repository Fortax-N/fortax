class NotifierMailer < ApplicationMailer
  default from: 'notifications@fortax.com'

  def sample_email(user)
  	@user = user
  	mail(to: @user.email, subject: 'Welcome to Fortax')
  end
end
