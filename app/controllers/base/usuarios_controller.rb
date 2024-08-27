class Base::UsuariosController < ApplicationController
  before_action :set_base_usuario, only: %i[ show update destroy ]

  # GET /base/usuarios
  # GET /base/usuarios.json
  def index
    @base_usuarios = Base::Usuario.all
  end

  # GET /base/usuarios/1
  # GET /base/usuarios/1.json
  def show
  end

  # POST /base/usuarios
  # POST /base/usuarios.json
  def create
    @base_usuario = Base::Usuario.new(base_usuario_params)

    if @base_usuario.save
      render :show, status: :created, location: @base_usuario
    else
      render json: @base_usuario.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /base/usuarios/1
  # PATCH/PUT /base/usuarios/1.json
  def update
    if @base_usuario.update(base_usuario_params)
      render :show, status: :ok, location: @base_usuario
    else
      render json: @base_usuario.errors, status: :unprocessable_entity
    end
  end

  # DELETE /base/usuarios/1
  # DELETE /base/usuarios/1.json
  def destroy
    @base_usuario.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_base_usuario
      @base_usuario = Base::Usuario.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def base_usuario_params
      params.require(:base_usuario).permit(:nome, :email, :password_digest)
    end
end
