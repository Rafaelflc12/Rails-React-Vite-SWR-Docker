class Produto::Produto < ApplicationRecord
  belongs_to :produto_categoria, class_name: 'Categoria'
end
