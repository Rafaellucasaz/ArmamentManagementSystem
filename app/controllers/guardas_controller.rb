class GuardasController < ApplicationController
  before_action :set_guarda, only: %i[ show edit update destroy ]

  def index
    @guardas = Guarda.all
    @equipes = Equipe.all
  end

  def show
    @guarda = Guarda.find(params[:id])
    @equipe = Equipe.find(@guarda.equipe_id)
  end

  def new
    @guarda = Guarda.new
    @equipes = Equipe.all
  end

  def create
    @guarda = Guarda.new(guarda_params)
    if @guarda.save
      redirect_to guardas_path, notice: "Guarda registrado com sucesso !"
    else
      @equipes = Equipe.all
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @guarda = Guarda.find(params[:id])
    @equipes = Equipe.all
  end

  def update
    @guarda = Guarda.find(params[:id])
    if @guarda.update(guarda_params)
      redirect_to @guarda, notice: "Guarda atualizado com sucesso !"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @guarda.destroy
    redirect_to guardas_path, notice: "Guarda deletado com sucesso !"
  end

  private
    def set_guarda
      @guarda = Guarda.find(params[:id])
    end

    def guarda_params
      params.require(:guarda).permit(:nome, :matricula, :porte_arma, :equipe_id)
    end
end
