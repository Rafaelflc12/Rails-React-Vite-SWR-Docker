module Api
  module V1
    class UsuariosController < ApplicationController
      before_action :set_usuario, only: %i[show update destroy]

      # GET /api/v1/usuarios
      def index
        render json: Base::Usuario.all
      end

      # GET /api/v1/usuarios/:id
      def show
        render json: @usuario
      end

      # POST /api/v1/usuarios
      def create
        @usuario = Base::Usuario.new(usuario_params)

        if @usuario.save
          render json: @usuario, status: :created
        else
          render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/usuarios/:id
      def update
        if @usuario.update(usuario_params)
          render json: @usuario
        else
          render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/usuarios/:id
      def destroy
        @usuario.destroy!
        head :no_content
      end

      private

      def set_usuario
        @usuario = Base::Usuario.find(params[:id])
      end

      def usuario_params
        params.require(:usuario).permit(:nome, :email, :password, :password_confirmation)
      end
    end
  end
end
