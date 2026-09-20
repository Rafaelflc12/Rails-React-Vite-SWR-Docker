module Api
  module V1
    class PedidoItemsController < ApplicationController
      before_action :set_pedido_item, only: %i[show update destroy]

      # GET /api/v1/pedido_items
      def index
        render json: Estoque::PedidoItem.all
      end

      # GET /api/v1/pedido_items/:id
      def show
        render json: @pedido_item
      end

      # POST /api/v1/pedido_items
      def create
        @pedido_item = Estoque::PedidoItem.new(pedido_item_params)

        if @pedido_item.save
          render json: @pedido_item, status: :created
        else
          render json: { errors: @pedido_item.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/pedido_items/:id
      def update
        if @pedido_item.update(pedido_item_params)
          render json: @pedido_item
        else
          render json: { errors: @pedido_item.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/pedido_items/:id
      def destroy
        @pedido_item.destroy!
        head :no_content
      end

      private

      def set_pedido_item
        @pedido_item = Estoque::PedidoItem.find(params[:id])
      end

      def pedido_item_params
        params.require(:pedido_item).permit(:estoque_pedidos_id, :produto_produtos_id, :quantidade, :preco)
      end
    end
  end
end
