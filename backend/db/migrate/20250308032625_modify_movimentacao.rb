class ModifyMovimentacao < ActiveRecord::Migration[8.0]
  def change
    remove_column :movimentacaos, :armeiro, :string
    remove_column :movimentacaos, :matricula_armeiro, :string

    add_reference :movimentacaos, :armeiro, null: false, foreign_key: { to_table: :guardas }
  end
end
