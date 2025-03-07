class AddObservacaoToMovimentacaos < ActiveRecord::Migration[8.0]
  def change
    add_column :movimentacaos, :observacao, :text
  end
end
