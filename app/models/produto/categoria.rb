class Produto::Categoria < ApplicationRecord
  has_many :produtos, class_name: "Produto::Produto", foreign_key: :produto_categoria_id

  validates :nome, presence: true
end
