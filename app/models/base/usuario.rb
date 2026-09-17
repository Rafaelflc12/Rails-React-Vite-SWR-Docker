class Base::Usuario < ApplicationRecord
  has_secure_password

  has_many :pedidos, class_name: "Estoque::Pedido", foreign_key: :base_usuarios_id

  validates :email, presence: true, uniqueness: true
end
