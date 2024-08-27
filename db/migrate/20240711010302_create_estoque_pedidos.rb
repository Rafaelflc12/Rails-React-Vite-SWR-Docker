class CreateEstoquePedidos < ActiveRecord::Migration[7.1]
  def change
    create_table :estoque_pedidos do |t|
      t.references :base_usuarios, null: false, foreign_key: true
      t.decimal :preco_total
      t.string :status

      t.timestamps
    end
  end
end
