class Equipe < ApplicationRecord
  has_many :guardas
  validates :nome, presence: { message: "O nome da equipe não pode ser vazio" },
  uniqueness: { message: "Nome de equipe já em uso" }

  before_destroy :verificar_guardas_associados

  private

  def verificar_guardas_associados
    if guardas.any?
      errors.add(:base, "Não é possível deletar uma equipe com guardas associados !")
      throw :abort
    end
  end
end
