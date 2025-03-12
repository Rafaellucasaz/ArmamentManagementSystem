class EquipesController < ApplicationController
  before_action :set_equipe, only: %i[  update destroy ]
  before_action :authenticate_user!

  def index
    @equipes = Equipe.all
    render json: @equipes, status: :ok
  end

  def create
    @equipe = Equipe.new(equipe_params)
    if @equipe.save
      render json: @equipe, status: :created, location: @equipe
    else
      render json: @equipe.errors, status: :unprocessable_entity
    end
  end

  def update
    @equipe = Equipe.find(params[:id])
    if @equipe.update(equipe_params)
      render json: @equipe, status: :ok
    else
      render json: @equipe.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @equipe.destroy
    head :no_content
  end

  private
    def set_equipe
      @equipe = Equipe.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Equipe não encontrada" }, status: :not_found
    end

    def equipe_params
      params.require(:equipe).permit(:nome)
    end
end
