class CreateProdutoCategoria < ActiveRecord::Migration[7.1]
  def change
    create_table :produto_categoria do |t|
      t.string :nome

      t.timestamps
    end
  end
end
