Rails.application.routes.draw do
  #route for homepage
  root 'staticpages#index'
  get '/onlineestimate', to: 'onlineestimate#index'
  get '/personalinformation', to: 'personalinformation#index'
end
