module Api
  module V1
    class ProdutosController < ApplicationController
      before_action :set_produto, only: %i[show update destroy]

      # GET /api/v1/produtos?animal=dog&brand=...
      def index
        produtos = Produto::Produto.all
        produtos = produtos.where(animal: params[:animal]) if params[:animal].present?
        produtos = produtos.where(brand: params[:brand]) if params[:brand].present?
        produtos = produtos.where("nome ILIKE ?", "%#{params[:q]}%") if params[:q].present?
        render json: produtos
      end

      # GET /api/v1/produtos/brands
      def brands
        render json: Produto::Produto.distinct.pluck(:brand).compact.sort
      end

      # GET /api/v1/produtos/:id
      def show
        render json: @produto
      end

      # POST /api/v1/produtos
      def create
        @produto = Produto::Produto.new(produto_params)

        if @produto.save
          render json: @produto, status: :created
        else
          render json: { errors: @produto.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/produtos/:id
      def update
        if @produto.update(produto_params)
          render json: @produto
        else
          render json: { errors: @produto.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/produtos/:id
      def destroy
        @produto.destroy!
        head :no_content
      end

      private

      def set_produto
        @produto = Produto::Produto.find(params[:id])
      end

      def produto_params
        params.require(:produto).permit(
          :nome, :descricao, :preco, :estoque, :produto_categoria_id,
          :brand, :animal, :weight, :image, :rating, :original_price
        )
      end
    end
  end
end
