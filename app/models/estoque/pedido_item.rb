class Estoque::PedidoItem < ApplicationRecord
  belongs_to :pedido, class_name: "Estoque::Pedido", foreign_key: :estoque_pedidos_id, inverse_of: :pedido_items
  belongs_to :produto, class_name: "Produto::Produto", foreign_key: :produto_produtos_id, inverse_of: :pedido_items
end
