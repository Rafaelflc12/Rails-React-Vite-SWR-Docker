# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_11_011347) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "base_usuarios", force: :cascade do |t|
    t.string "nome"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "estoque_pedido_items", force: :cascade do |t|
    t.bigint "estoque_pedidos_id", null: false
    t.bigint "produto_produtos_id", null: false
    t.integer "quantidade"
    t.decimal "preco"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["estoque_pedidos_id"], name: "index_estoque_pedido_items_on_estoque_pedidos_id"
    t.index ["produto_produtos_id"], name: "index_estoque_pedido_items_on_produto_produtos_id"
  end

  create_table "estoque_pedidos", force: :cascade do |t|
    t.bigint "base_usuarios_id", null: false
    t.decimal "preco_total"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["base_usuarios_id"], name: "index_estoque_pedidos_on_base_usuarios_id"
  end

  create_table "produto_categoria", force: :cascade do |t|
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "produto_produtos", force: :cascade do |t|
    t.string "nome"
    t.text "descricao"
    t.decimal "preco"
    t.integer "estoque"
    t.bigint "produto_categoria_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["produto_categoria_id"], name: "index_produto_produtos_on_produto_categoria_id"
  end

  create_table "produtos", id: :serial, force: :cascade do |t|
    t.string "nome", limit: 255, null: false
  end

  add_foreign_key "estoque_pedido_items", "estoque_pedidos", column: "estoque_pedidos_id"
  add_foreign_key "estoque_pedido_items", "produto_produtos", column: "produto_produtos_id"
  add_foreign_key "estoque_pedidos", "base_usuarios", column: "base_usuarios_id"
  add_foreign_key "produto_produtos", "produto_categoria", column: "produto_categoria_id"
end
