class EquipesController < ApplicationController
  before_action :set_equipe, only: %i[ show edit update destroy ]
  def index
    @equipes = Equipe.all
  end

  def show
    @equipe = Equipe.find(params[:id])
  end
  def new
    @equipe = Equipe.new
  end

  def create
    @equipe = Equipe.new(equipe_params)
    if @equipe.save
      redirect_to @equipe
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @equipe = Equipe.find(params[:id])
  end

  def update
    @equipe = Equipe.find(params[:id])
    if @equipe.update(equipe_params)
      redirect_to @equipe
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @equipe.destroy
    redirect_to equipes_path
  end

  private
    def set_equipe
      @equipe = Equipe.find(params[:id])
    end

    def equipe_params
      params.expect(equipe: [ :nome ])
    end
end
