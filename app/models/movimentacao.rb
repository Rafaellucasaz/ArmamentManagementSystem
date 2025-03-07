class Movimentacao < ApplicationRecord
  belongs_to :arma
  belongs_to :guarda
  belongs_to :armeiro, class_name: "Guarda"
  validates  :data, presence: { message: "A data não pode ser vazia" }
  validates  :hora, presence: { message: "O horário não pode ser vazio" }
  validates  :balas, presence: { message: "A quantidade de balas não pode ser vazia" }
  validates  :calibre, presence: { message: "O calibre da bala deve ser informado" }
  validates  :carregadores, presence: { message: "A quantidade de carregadores deve ser informado" }
  validates  :armeiro_id, presence: { message: "O armeiro deve ser informado" }
  validates  :arma_id, presence: { message: "A arma deve ser informada" }
  validates  :guarda_id, presence: { message: "O guarda deve ser informado" }
end
