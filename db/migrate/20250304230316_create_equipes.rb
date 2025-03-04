class CreateEquipes < ActiveRecord::Migration[8.0]
  def change
    create_table :equipes do |t|
      t.string :nome, null: false

      t.timestamps
    end
    add_index :equipes, :nome, unique: true
  end
end
