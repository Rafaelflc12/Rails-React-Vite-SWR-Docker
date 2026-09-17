class DropLegacyProdutos < ActiveRecord::Migration[7.1]
  def change
    # Tabela "produtos" criada manualmente pelo init.sql, sem model/migration.
    drop_table :produtos, if_exists: true
  end
end
