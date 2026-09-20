class AddUniqueIndexToBaseUsuariosEmail < ActiveRecord::Migration[7.1]
  def change
    # Garante unicidade do email também no banco (o `uniqueness` no model
    # sozinho tem race condition em concorrência).
    add_index :base_usuarios, :email, unique: true
  end
end
