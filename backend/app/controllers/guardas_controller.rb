class GuardasController < ApplicationController
  before_action :set_guarda, only: %i[ update destroy ]
  before_action :authenticate_user!

  def index
    @guardas = Guarda.all
    render json: @guardas , status: :ok
  end

  def create
    @guarda = Guarda.new(guarda_params)
    if @guarda.save
      render json: @guarda, status: :created, location: @guarda
    else
      render json: @guarda.errors, status: :unprocessable_entity
    end
  end


  def update
    @guarda = Guarda.find(params[:id])
    if @guarda.update(guarda_params)
      render json: @guarda, status: ok
    else
      render json: @guarda.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @guarda.destroy
    head :no_content
  end

  private
    def set_guarda
      @guarda = Guarda.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Guarda não encontrado" }, status: :not_found
    end

    def guarda_params
      params.require(:guarda).permit(:nome, :matricula, :porte_arma, :equipe_id)
    end
end
