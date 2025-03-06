class Guarda < ApplicationRecord
  belongs_to :equipe
  has_many :movimentacaos
  validates :nome, presence: { message: "Nome não pode ser vazio" }
  validates :matricula, presence: { message: "Nº da matrícula não pode ser vazio" },  uniqueness: { message: "Nº de matrícula já existe" }
  validates :porte_arma, presence: { message: "Nº de porte de arma não pode ser vazio" }
end
