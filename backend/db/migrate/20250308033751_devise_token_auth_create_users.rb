class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table(:users) do |t|
      ## Required
      t.string :provider, null: false, default: "email"
      t.string :uid, null: false, default: ""

      ## Database authenticatable
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.boolean  :allow_password_change, default: false

      ## Rememberable
      t.datetime :remember_created_at

      ## User Info
      t.string :name
      t.string :email

      ## Tokens
      t.text :tokens

      ## New field for first login
      t.boolean :first_login, default: true

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, [ :uid, :provider ], unique: true
    add_index :users, :reset_password_token, unique: true
    # Remova o índice do confirmation_token se não for mais necessário
    # add_index :users, :confirmation_token, unique: true
  end
end
