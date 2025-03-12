class ArmasController < ApplicationController
  before_action :set_arma, only: %i[  update destroy ]


  def index
    @armas = Arma.all
    render json: @armas, status: :ok
  end

  def create
    @arma = Arma.new(arma_params)
    if @arma.save
      render json: @arma, status: :created, location: @arma
    else
      render json: @arma.errors, status: :unprocessable_entity
    end
  end

  def update
    @arma = Arma.find(params[:id])
    if @arma.update(arma_params)
      render json: @arma, status: :ok
    else
      render json: @arma.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @arma.destroy
    head :no_content
  end

  private
    def set_arma
      @arma = Arma.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Arma não encontrada" }, status: :not_found
    end

    def arma_params
      params.require(:arma).permit(:modelo, :registro)
    end
end
