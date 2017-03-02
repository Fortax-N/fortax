class UserInfosController < ApplicationController
  layout "form_pages"
  def create
    UserInfo.create(user_info_params)
    flash[:success] = "Thank you for signing up! We will get back to you shortly."
  end

  private

  def user_info_params
    params.require(:user_info).permit(:email)
  end
end
