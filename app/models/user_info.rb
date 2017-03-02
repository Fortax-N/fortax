class UserInfo < ApplicationRecord
  after_create :send_email

  private

  def send_email
    NotifierMailer.new_user_info(self).deliver
  end
end
