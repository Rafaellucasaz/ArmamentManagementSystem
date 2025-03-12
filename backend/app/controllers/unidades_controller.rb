class UnidadesController < ApplicationController
  before_action :set_unidade, only: %i[ update destroy ]
  before_action :authenticate_user!

  def index
    @unidades = Unidade.all
    render json: @unidades, status: :ok
  end


  def create
    @unidade = Unidade.new(unidade_params)
    if @unidade.save
      render json: @unidade, status: :created, location: @unidade
    else
      render json: @unidade.errors, status: :unprocessable_entity
    end
  end

  def update
    @unidade = Unidade.find(params[:id])
    if @unidade.update(unidade_params)
      render json: @unidade, status: :ok
    else
      render json: @unidade.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @unidade.destroy
    head :no_content
  end

  private
    def set_unidade
      @unidade = Unidade.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Unidade não encontrada" }, status: :not_found
    end

    def unidade_params
      params.require(:unidade).permit(:nome)
    end
end
