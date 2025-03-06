class ArmasController < ApplicationController
  before_action :set_arma, only: %i[ show edit update destroy ]

  def index
    @armas = Arma.all
  end

  def show
    @arma = Arma.find(params[:id])
  end

  def new
    @arma = Arma.new
  end

  def create
    @arma = Arma.new(arma_params)
    if @arma.save
      redirect_to armas_path, notice: "Arma registrada com sucesso !"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @arma = Arma.find(params[:id])
  end

  def update
    @arma = Arma.find(params[:id])
    if @arma.update(arma_params)
      redirect_to @arma, notice: "Arma atualizada com sucesso !"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @arma.destroy
    redirect_to armas_path, notice: "Arma deletada com sucesso !"
  end

  private
    def set_arma
      @arma = Arma.find(params[:id])
    end

    def arma_params
      params.require(:arma).permit(:modelo, :registro)
    end
end
