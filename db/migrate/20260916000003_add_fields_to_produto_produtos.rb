class AddFieldsToProdutoProdutos < ActiveRecord::Migration[7.1]
  def change
    change_table :produto_produtos do |t|
      t.string :brand
      t.string :animal
      t.string :weight
      t.string :image
      t.decimal :original_price, precision: 10, scale: 2
      t.decimal :rating, precision: 3, scale: 2
    end

    # Permite produto sem categoria (o front atual não envia categoria).
    change_column_null :produto_produtos, :produto_categoria_id, true
  end
end
