class Equipe < ApplicationRecord
  has_many :guardas
  validates :nome, presence: { message: "O nome da equipe não pode ser vazio" },
  uniqueness: { message: "Nome de equipe já em uso" }
end
