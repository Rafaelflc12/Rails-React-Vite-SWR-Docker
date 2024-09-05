class Estoque::PedidosController < ApplicationController
  before_action :set_estoque_pedido, only: %i[ show update destroy ]

  # GET /estoque/pedidos
  # GET /estoque/pedidos.json
  def index
    @estoque_pedidos = Estoque::Pedido.all
    render json: @estoque_pedidos
  end

  # GET /estoque/pedidos/1
  # GET /estoque/pedidos/1.json
  def show
  end

  # POST /estoque/pedidos
  # POST /estoque/pedidos.json
  def create
    @estoque_pedido = Estoque::Pedido.new(estoque_pedido_params)

    if @estoque_pedido.save
      render :show, status: :created, location: @estoque_pedido
    else
      render json: @estoque_pedido.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /estoque/pedidos/1
  # PATCH/PUT /estoque/pedidos/1.json
  def update
    if @estoque_pedido.update(estoque_pedido_params)
      render :show, status: :ok, location: @estoque_pedido
    else
      render json: @estoque_pedido.errors, status: :unprocessable_entity
    end
  end

  # DELETE /estoque/pedidos/1
  # DELETE /estoque/pedidos/1.json
  def destroy
    @estoque_pedido.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_estoque_pedido
      @estoque_pedido = Estoque::Pedido.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def estoque_pedido_params
      params.require(:estoque_pedido).permit(:base_usuarios_id, :preco_total, :status)
    end
end
