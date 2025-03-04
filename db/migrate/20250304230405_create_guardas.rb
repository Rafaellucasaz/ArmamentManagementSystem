class CreateGuardas < ActiveRecord::Migration[8.0]
  def change
    create_table :guardas do |t|
      t.string :nome, null: false
      t.string :matricula, null: false
      t.string :porte_arma, null: false
      t.references :equipe, null: false, foreign_key: true

      t.timestamps
    end
    add_index :guardas, :matricula, unique: true
  end
end
