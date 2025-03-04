class CreateArmas < ActiveRecord::Migration[8.0]
  def change
    create_table :armas do |t|
      t.string :modelo, null: false
      t.string :registro, null: false
      t.boolean :emprestada

      t.timestamps
    end
    add_index :armas, :registro, unique: true
  end
end
