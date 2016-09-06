class Company < ApplicationRecord
  validates :phone_number, presence: true, format: { with: VALID_PHONE_REGEX }
  validates :email, presence: true, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  
  VALID_PHONE_REGEX = ^[0-9\+][1]\s\d{3}-\d{3}-\d{4}\z
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
end
