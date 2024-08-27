Rails.application.routes.draw do

  
  namespace :estoque, defaults: { format: :json } do
    resources :pedido_items
    resources :pedidos
  end
  namespace :produto, defaults: { format: :json }do
    resources :categoria
    resources :produtos
  end
  namespace :base, defaults: { format: :json } do
    resources :usuarios
  end
  
  get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # root 'application#index'
  root 'home#index'

  # Defines the root path route ("/")
  # root "posts#index"
end
