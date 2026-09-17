module Api
  module V1
    class PedidosController < ApplicationController
      before_action :set_pedido, only: %i[show update destroy]

      # GET /api/v1/pedidos
      def index
        render json: Estoque::Pedido.all
      end

      # GET /api/v1/pedidos/:id
      def show
        render json: @pedido
      end

      # POST /api/v1/pedidos
      def create
        @pedido = Estoque::Pedido.new(pedido_params)

        if @pedido.save
          render json: @pedido, status: :created
        else
          render json: { errors: @pedido.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/pedidos/:id
      def update
        if @pedido.update(pedido_params)
          render json: @pedido
        else
          render json: { errors: @pedido.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/pedidos/:id
      def destroy
        @pedido.destroy!
        head :no_content
      end

      private

      def set_pedido
        @pedido = Estoque::Pedido.find(params[:id])
      end

      def pedido_params
        params.require(:pedido).permit(:base_usuarios_id, :preco_total, :status)
      end
    end
  end
end
