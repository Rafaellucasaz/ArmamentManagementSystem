class UnidadesController < ApplicationController
  before_action :set_unidade, only: %i[ show edit update destroy ]

  def index
    @unidades = Unidade.all
  end

  def show
    @unidade = Unidade.find(params[:id])
  end

  def new
    @unidade = Unidade.new
  end

  def create
    @unidade = Unidade.new(unidade_params)
    if @unidade.save
      redirect_to unidades_path, notice: "Unidade registrada com sucesso !"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @unidade = Unidade.find(params[:id])
  end

  def update
    @unidade = Unidade.find(params[:id])
    if @unidade.update(unidade_params)
      redirect_to unidade_path, notice: "Unidade atualizada com sucesso !"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @unidade.destroy
    redirect_to unidades_path, notice: "Unidade deletada com sucesso !"
  end

  private
    def set_unidade
      @unidade = Unidade.find(params[:id])
    end

    def unidade_params
      params.require(:unidade).permit(:nome)
    end
end
