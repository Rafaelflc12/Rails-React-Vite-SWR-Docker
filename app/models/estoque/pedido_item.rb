class Estoque::PedidoItem < ApplicationRecord
  belongs_to :estoque_pedidos
  belongs_to :produto_produtos
end
