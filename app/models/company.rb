class Company < ApplicationRecord
  VALID_PHONE_REGEX = ^[0-9\+][1]\s\d{3}-\d{3}-\d{4}\z
  validates :phone_number, presence: true, format: { with: VALID_PHONE_REGEX }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
end
