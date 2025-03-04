class Guarda < ApplicationRecord
  belongs_to :equipe
  has_many :movimentacaos
  validates :nome_completo, :matricula, :porte_arma, presence: true
  validates :matricula, uniqueness: true
end
