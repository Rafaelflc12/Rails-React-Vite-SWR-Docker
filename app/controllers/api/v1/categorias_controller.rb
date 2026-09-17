module Api
  module V1
    class CategoriasController < ApplicationController
      before_action :set_categoria, only: %i[show update destroy]

      # GET /api/v1/categorias
      def index
        render json: Produto::Categoria.all
      end

      # GET /api/v1/categorias/:id
      def show
        render json: @categoria
      end

      # POST /api/v1/categorias
      def create
        @categoria = Produto::Categoria.new(categoria_params)

        if @categoria.save
          render json: @categoria, status: :created
        else
          render json: { errors: @categoria.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/categorias/:id
      def update
        if @categoria.update(categoria_params)
          render json: @categoria
        else
          render json: { errors: @categoria.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/categorias/:id
      def destroy
        @categoria.destroy!
        head :no_content
      end

      private

      def set_categoria
        @categoria = Produto::Categoria.find(params[:id])
      end

      def categoria_params
        params.require(:categoria).permit(:nome)
      end
    end
  end
end
