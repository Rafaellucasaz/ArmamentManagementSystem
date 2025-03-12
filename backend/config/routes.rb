Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :unidades, except: [ :new, :show, :edit ]
  resources :equipes, except: [ :new, :show, :edit ]
  resources :guardas, except: [ :new, :show, :edit ]
  resources :armas, except: [ :new, :show, :edit ]
  resources :movimentacaos, except: [ :new, :show, :edit, :create ] do
    collection do
      post :create_emprestimo
      post :create_devolucao
    end
  end
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
