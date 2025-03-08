class MovimentacaosController < ApplicationController
  before_action :set_movimentacao, only: %i[ show edit update destroy ]

  def index
    @movimentacoes = Movimentacao.all
    @guardas = Guarda.all
    @armas = Arma.all
  end

  def show
    @movimentacao = Movimentacao.find(params[:id])
    @armeiro = Guarda.find(@movimentacao.armeiro_id)
    @arma = Arma.find(@movimentacao.arma_id)
    @guarda = Guarda.find(@movimentacao.guarda_id)
  end

  def emprestimo
    # tipo: true = emprestimo
    @movimentacao = Movimentacao.new(tipo: true)
    set_armas_guardas(true)
  end

  def devolucao
    # tipo: false = devolucao
    @movimentacao = Movimentacao.new(tipo: false)
    set_armas_guardas(false)
  end

  def create_emprestimo
    @movimentacao = Movimentacao.new(movimentacao_params)
    if @movimentacao.save
      update_arma_status(@movimentacao.arma_id)

      redirect_to movimentacaos_path, notice: "Empréstimo registrada com sucesso !"
    else
      set_armas_guardas(true)
      render :emprestimo, status: :unprocessable_entity
    end
  end

  def create_devolucao
    @movimentacao = Movimentacao.new(movimentacao_params)

    if @movimentacao.valid?
      # Buscar o último empréstimo da arma
      @emprestimo = Movimentacao.where(arma_id: @movimentacao.arma_id).order(data: :desc, hora: :desc).first
      # Verificar se quantidade balas mudou
      if @emprestimo.balas != @movimentacao.balas && @movimentacao.observacao.blank?
        set_armas_guardas(false)
        flash.now[:alert] = "A quantidade de balas devolvidas não corresponde ao empréstimo. Justifique na observação."
        return render :devolucao, status: :unprocessable_entity
      end
      # Verificar se arma está sendo devolvida por quem a pegou emprestada
      if @emprestimo.guarda_id != @movimentacao.guarda_id
        set_armas_guardas(false)
        flash.now[:alert] = "A devolução da arma só pode ser feita pelo guarda que a recebeu emprestada."
        return render :devolucao, status: :unprocessable_entity
      end

      @movimentacao.save
      update_arma_status(@movimentacao.arma_id)

      return redirect_to movimentacaos_path, notice: "Devolução registrada com sucesso!"
    end

    set_armas_guardas(false)
    render :devolucao, status: :unprocessable_entity
  end

  def edit
    @movimentacao = Movimentacao.find(params[:id])
    @equipes = Equipe.all
  end

  def update
    @movimentacao = Movimentacao.find(params[:id])
    if @movimentacao.update(movimentacao_params)
      redirect_to @movimentacao, notice: "Movimentacao atualizada com sucesso !"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @movimentacao.destroy
    redirect_to movimentacaos_path, notice: "Movimentacao deletada com sucesso !"
  end

  private
    def set_movimentacao
      @movimentacao = Movimentacao.find(params[:id])
    end

    def set_armas_guardas(tipo)
      @armas = @movimentacao.tipo ? Arma.where(emprestada: false) : Arma.where(emprestada: true)
      @guardas = Guarda.order(:nome)
    end

    def update_arma_status(arma_id)
      arma = Arma.find(arma_id)
      arma.update(emprestada: !arma.emprestada)
    end

    def movimentacao_params
      params.require(:movimentacao).permit(:armeiro_id, :data, :hora, :tipo, :arma_id, :balas, :calibre, :carregadores, :guarda_id, :observacao)
    end
end
