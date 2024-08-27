class CreateEstoquePedidoItems < ActiveRecord::Migration[7.1]
  def change
    create_table :estoque_pedido_items do |t|
      t.references :estoque_pedidos, null: false, foreign_key: true
      t.references :produto_produtos, null: false, foreign_key: true
      t.integer :quantidade
      t.decimal :preco

      t.timestamps
    end
  end
end
