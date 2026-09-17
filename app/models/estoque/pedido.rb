class Estoque::Pedido < ApplicationRecord
  belongs_to :usuario, class_name: "Base::Usuario", foreign_key: :base_usuarios_id
  has_many :pedido_items, class_name: "Estoque::PedidoItem", foreign_key: :estoque_pedidos_id
end
