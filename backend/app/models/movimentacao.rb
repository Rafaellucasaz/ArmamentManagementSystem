class Movimentacao < ApplicationRecord
  belongs_to :arma
  belongs_to :guarda
  belongs_to :armeiro, class_name: "Guarda"
  validates  :data, presence: { message: "A data não pode ser vazia" }
  validates  :hora, presence: { message: "O horário não pode ser vazio" }
  validates  :balas, numericality: { greater_than: 0, message: "A quantidade de balas deve ser informada" }
  validates  :calibre, presence: { message: "O calibre da bala deve ser informado" }
  validates  :carregadores, numericality: { greater_than: 0, message: "A quantidade de carregadores deve ser informado" }
  validates  :armeiro_id, numericality: { greater_than: 0, message: "O armeiro é obrigatório" }
  validates  :arma_id, numericality: { greater_than: 0, message: "A arma é obrigatória" }
  validates  :guarda_id, numericality: { greater_than: 0, message: "O guarda é obrigatório" }
end
