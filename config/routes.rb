Rails.application.routes.draw do
  # Health check (usado por load balancers / monitores)
  get "up" => "rails/health#show", as: :rails_health_check

  # API versionada: /api/v1
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :produtos do
        collection do
          get :brands
        end
      end
      resources :categorias
      resources :usuarios
      resources :pedidos
      resources :pedido_items
    end
  end
end
