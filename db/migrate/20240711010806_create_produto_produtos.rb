class CreateProdutoProdutos < ActiveRecord::Migration[7.1]
  def change
    create_table :produto_produtos do |t|
      t.string :nome
      t.text :descricao
      t.decimal :preco
      t.integer :estoque
      t.references :produto_categoria, null: false, foreign_key: { to_table: :produto_categoria }

      t.timestamps
    end
  end
end
