Rails.application.routes.draw do
  root to: 'messages#index'
  get 'messages', to: 'messages#index'
end
 