class Estoque::PedidoItemsController < ApplicationController
  before_action :set_estoque_pedido_item, only: %i[ show update destroy ]

  # GET /estoque/pedido_items
  # GET /estoque/pedido_items.json
  def index
    @estoque_pedido_items = Estoque::PedidoItem.all
  end

  # GET /estoque/pedido_items/1
  # GET /estoque/pedido_items/1.json
  def show
  end

  # POST /estoque/pedido_items
  # POST /estoque/pedido_items.json
  def create
    @estoque_pedido_item = Estoque::PedidoItem.new(estoque_pedido_item_params)

    if @estoque_pedido_item.save
      render :show, status: :created, location: @estoque_pedido_item
    else
      render json: @estoque_pedido_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /estoque/pedido_items/1
  # PATCH/PUT /estoque/pedido_items/1.json
  def update
    if @estoque_pedido_item.update(estoque_pedido_item_params)
      render :show, status: :ok, location: @estoque_pedido_item
    else
      render json: @estoque_pedido_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /estoque/pedido_items/1
  # DELETE /estoque/pedido_items/1.json
  def destroy
    @estoque_pedido_item.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_estoque_pedido_item
      @estoque_pedido_item = Estoque::PedidoItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def estoque_pedido_item_params
      params.require(:estoque_pedido_item).permit(:estoque_pedidos_id, :produto_produtos_id, :quantidade, :preco)
    end
end
