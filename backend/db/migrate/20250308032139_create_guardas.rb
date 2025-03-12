class CreateGuardas < ActiveRecord::Migration[8.0]
  def change
    create_table :guardas do |t|
      t.string :nome
      t.string :matricula
      t.string :porte_arma
      t.references :equipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
