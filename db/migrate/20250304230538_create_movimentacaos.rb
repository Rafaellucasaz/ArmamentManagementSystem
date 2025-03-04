class CreateMovimentacaos < ActiveRecord::Migration[8.0]
  def change
    create_table :movimentacaos do |t|
      t.string :armeiro, null: false
      t.string :matricula_armeiro, null: false
      t.date :data, null: false
      t.time :hora, null: false
      t.boolean :tipo, null: false
      t.references :arma, null: false, foreign_key: true
      t.integer :balas, null: false
      t.string :calibre, null: false
      t.integer :carregadores, null: false
      t.references :guarda, null: false, foreign_key: true

      t.timestamps
    end
  end
end
