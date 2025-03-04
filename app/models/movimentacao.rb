class Movimentacao < ApplicationRecord
  belongs_to :arma
  belongs_to :guarda
  validates :armeiro, :matricula_armeiro, :data, :hora, :tipo, :balas, :calibre, :carregadores, :guarda,  presence: true
end
