# Be sure to restart your server when you modify this file.

# CORS: permite que o frontend (em outra origem) acesse a API.
# Em produção, quando Nginx serve front e back na mesma origem, o CORS é
# desnecessário — aí vale restringir `origins` aos domínios reais.
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*"

    resource "*",
             headers: :any,
             methods: %i[get post put patch delete options head]
  end
end
