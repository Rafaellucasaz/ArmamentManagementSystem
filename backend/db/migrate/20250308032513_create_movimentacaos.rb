class CreateMovimentacaos < ActiveRecord::Migration[8.0]
  def change
    create_table :movimentacaos do |t|
      t.string :armeiro
      t.string :matricula_armeiro
      t.date :data
      t.time :hora
      t.boolean :tipo
      t.references :arma, null: false, foreign_key: true
      t.integer :balas
      t.string :calibre
      t.integer :carregadores
      t.references :guarda, null: false, foreign_key: true

      t.timestamps
    end
  end
end
