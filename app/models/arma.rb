class Arma < ApplicationRecord
  has_many :movimentacaos, dependent: :destroy
  validates :modelo, presence: { message: "Modelo da arma não pode ser vazio" }
  validates :registro, presence: { message: "Registro da arma não pode ser vazio" }, uniqueness: { message: "Esse registro já existe" }
  attribute :emprestada, :boolean, default: false
end
