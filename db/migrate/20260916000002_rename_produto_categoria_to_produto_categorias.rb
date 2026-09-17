class RenameProdutoCategoriaToProdutoCategorias < ActiveRecord::Migration[7.1]
  def change
    # Corrige o nome da tabela para o plural (convenção do Rails).
    rename_table :produto_categoria, :produto_categorias
  end
end
