class CreateUnidades < ActiveRecord::Migration[8.0]
  def change
    create_table :unidades do |t|
      t.string :nome, null: false

      t.timestamps
    end
    add_index :unidades, :nome, unique: true
  end
end
