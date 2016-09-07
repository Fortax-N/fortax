Rails.application.routes.draw do
  #route for homepage
  root 'static_pages#index'
  get '/online_estimate', to: 'online_estimate#index'
  get '/personal_information', to: 'personal_information#index'
end
