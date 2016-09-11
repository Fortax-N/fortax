Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  #route for homepage
  root 'static_pages#index'
  get '/online_estimate', to: 'online_estimate#index'
  get '/personal_information', to: 'personal_information#index'

  resources :companies
end
