class Arma < ApplicationRecord
  has_many :movimentacaos
  validates :modelo, :registro, presence: true
  validates :registro, uniqueness: true
  attribute :emprestada, :boolean, default: false
end
