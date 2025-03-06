class Movimentacao < ApplicationRecord
  belongs_to :arma
  belongs_to :guarda
  belongs_to :armeiro, class_name: "Guarda"
  validates  :data, :hora, :tipo, :balas, :calibre, :carregadores, presence: true
end
