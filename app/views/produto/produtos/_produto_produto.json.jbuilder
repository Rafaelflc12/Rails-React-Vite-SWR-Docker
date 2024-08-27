json.extract! produto_produto, :id, :nome, :descricao, :preco, :estoque, :produto_categoria_id, :created_at, :updated_at
json.url produto_produto_url(produto_produto, format: :json)
