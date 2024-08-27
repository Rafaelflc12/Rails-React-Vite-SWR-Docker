json.extract! estoque_pedido_item, :id, :estoque_pedidos_id, :produto_produtos_id, :quantidade, :preco, :created_at, :updated_at
json.url estoque_pedido_item_url(estoque_pedido_item, format: :json)
