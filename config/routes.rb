Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  #route for homepage
  root 'static_pages#index'
  get '/online_estimates', to: 'online_estimates#index'
  get '/personal_information', to: 'personal_information#index'
  post '/online_estimates', to: 'online_estimates#create'
  resources :companies
end
