class Guarda < ApplicationRecord
  belongs_to :equipe
  has_many :movimentacaos_as_armeiro, class_name: "Movimentacao", foreign_key: "armeiro_id"
  has_many :movimentacaos_as_guarda, class_name: "Movimentacao", foreign_key: "guarda_id"
  validates :nome, presence: { message: "Nome não pode ser vazio" }
  validates :matricula, presence: { message: "Nº da matrícula não pode ser vazio" },  uniqueness: { message: "Nº de matrícula já existe" }
  validates :porte_arma, presence: { message: "Nº de porte de arma não pode ser vazio" }
end
