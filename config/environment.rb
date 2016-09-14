# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

#Configure ActionMailer to use SendGrid
ActionMailer::Base.smtp_settings = {
  :user_name => 'app56582241@heroku.com',
  :password => 'z23755tk6452',
  :domain => 'fortax.com',
  :address => 'smtp.sendgrid.net',
  :port => 587
  :authentication => :plain,
  :enable_starttls_auto => true
}