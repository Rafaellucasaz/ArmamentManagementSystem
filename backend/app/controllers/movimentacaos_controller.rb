class MovimentacaosController < ApplicationController
  before_action :set_movimentacao, only: %i[ update destroy ]


  def index
    @movimentacoes = Movimentacao.all
    render json: @movimentacoes, status: :ok
  end

  # Criar um empréstimo
  def create_emprestimo
    @movimentacao = Movimentacao.new(movimentacao_params)
    if @movimentacao.save
      update_arma_status(@movimentacao.arma_id)
      render json: @movimentacao,  status: :created, location: @movimentacao
    else
      render json: @movimentacao.errors, status: :unprocessable_entity
    end
  end

  # Criar uma devolução
  def create_devolucao
    @movimentacao = Movimentacao.new(movimentacao_params)

    if @movimentacao.valid?
      # Buscar o último empréstimo da arma
      @emprestimo = Movimentacao.where(arma_id: @movimentacao.arma_id).order(created_at: :desc).first

      if @emprestimo.nil?
        @movimentacao.save
        update_arma_status(@movimentacao.arma_id)
        return render json:  @movimentacao, status: :created
      end

      # Verificar se quantidade de balas mudou
      if @emprestimo.balas != @movimentacao.balas && @movimentacao.observacao.blank?
        return render json: { error: "A quantidade de balas devolvidas não corresponde ao empréstimo. Justifique na observação." }, status: :unprocessable_entity
      end

      # Verificar se arma está sendo devolvida por quem a pegou emprestada
      if @emprestimo.guarda_id != @movimentacao.guarda_id
        return render json: { error: "A devolução da arma só pode ser feita pelo guarda que a recebeu emprestada." }, status: :unprocessable_entity
      end

      @movimentacao.save
      update_arma_status(@movimentacao.arma_id)

      render json: @movimentacao, status: :created, location: @movimentacao
    else
      render json: @movimentacao.errors, status: :unprocessable_entity
    end
  end


  def update
    if @movimentacao.update(movimentacao_params)
      render json:  @movimentacao, status: :ok
    else
      render json:  @movimentacao.errors, status: :unprocessable_entity
    end
  end


  def destroy
    @movimentacao.destroy
    head :no_content
  end

  private

    def set_movimentacao
      @movimentacao = Movimentacao.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Movimentação não encontrada" }, status: :not_found
    end

    def update_arma_status(arma_id)
      arma = Arma.find(arma_id)
      arma.update(emprestada: !arma.emprestada)
    end

    def movimentacao_params
      params.require(:movimentacao).permit(:armeiro_id, :data, :hora, :tipo, :arma_id, :balas, :calibre, :carregadores, :guarda_id, :observacao)
    end
end
