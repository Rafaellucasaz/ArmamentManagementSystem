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

ActiveRecord::Schema[8.0].define(version: 2025_03_04_230538) do
  create_table "armas", force: :cascade do |t|
    t.string "modelo", null: false
    t.string "registro", null: false
    t.boolean "emprestada"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["registro"], name: "index_armas_on_registro", unique: true
  end

  create_table "equipes", force: :cascade do |t|
    t.string "nome", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["nome"], name: "index_equipes_on_nome", unique: true
  end

  create_table "guardas", force: :cascade do |t|
    t.string "nome", null: false
    t.string "matricula", null: false
    t.string "porte_arma", null: false
    t.integer "equipe_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["equipe_id"], name: "index_guardas_on_equipe_id"
    t.index ["matricula"], name: "index_guardas_on_matricula", unique: true
  end

  create_table "movimentacaos", force: :cascade do |t|
    t.string "armeiro", null: false
    t.string "matricula_armeiro", null: false
    t.date "data", null: false
    t.time "hora", null: false
    t.boolean "tipo", null: false
    t.integer "arma_id", null: false
    t.integer "balas", null: false
    t.string "calibre", null: false
    t.integer "carregadores", null: false
    t.integer "guarda_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["arma_id"], name: "index_movimentacaos_on_arma_id"
    t.index ["guarda_id"], name: "index_movimentacaos_on_guarda_id"
  end

  create_table "unidades", force: :cascade do |t|
    t.string "nome", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["nome"], name: "index_unidades_on_nome", unique: true
  end

  add_foreign_key "guardas", "equipes"
  add_foreign_key "movimentacaos", "armas"
  add_foreign_key "movimentacaos", "guardas"
end
