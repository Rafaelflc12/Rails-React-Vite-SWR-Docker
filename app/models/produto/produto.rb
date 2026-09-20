class Produto::Produto < ApplicationRecord
  belongs_to :categoria, class_name: "Produto::Categoria", foreign_key: :produto_categoria_id,
                         optional: true, inverse_of: :produtos
  has_many :pedido_items, class_name: "Estoque::PedidoItem", foreign_key: :produto_produtos_id,
                          inverse_of: :produto, dependent: :restrict_with_error

  ANIMAIS = %w[dog cat bird fish rodent].freeze

  validates :nome, presence: true
  validates :animal, inclusion: { in: ANIMAIS }, allow_nil: true
end
