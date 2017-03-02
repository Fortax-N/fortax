Rails.application.routes.draw do
  get 'user_infos/create'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  #route for homepage
  root 'static_pages#index'
  get '/online_estimates', to: 'online_estimates#index'
  get '/confirmation', to: 'online_estimates#confirmation', as: :confirmation
  get '/personal_information', to: 'personal_information#index'
  post '/online_estimates', to: 'online_estimates#create'
  resources :companies
  match '/contact_forms',     to: 'contact_forms#new',             via: 'get'
  resources :contact_forms, only: [:new, :create]
  resources :user_infos, only: :create
end
