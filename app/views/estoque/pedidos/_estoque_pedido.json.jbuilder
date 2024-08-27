json.extract! estoque_pedido, :id, :base_usuarios_id, :preco_total, :status, :created_at, :updated_at
json.url estoque_pedido_url(estoque_pedido, format: :json)
