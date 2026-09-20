class Base::Usuario < ApplicationRecord
  has_secure_password

  has_many :pedidos, class_name: "Estoque::Pedido", foreign_key: :base_usuarios_id,
                     inverse_of: :usuario, dependent: :restrict_with_error

  validates :email, presence: true, uniqueness: true
end
