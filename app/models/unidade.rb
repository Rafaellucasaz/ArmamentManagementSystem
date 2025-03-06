class Unidade < ApplicationRecord
  validates :nome, presence: { message: "O nome da unidade não pode ser vazio" },
  uniqueness: { message: "Nome de unidade já em uso" }
end
