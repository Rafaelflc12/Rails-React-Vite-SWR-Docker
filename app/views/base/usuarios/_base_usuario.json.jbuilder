json.extract! base_usuario, :id, :nome, :email, :password_digest, :created_at, :updated_at
json.url base_usuario_url(base_usuario, format: :json)
