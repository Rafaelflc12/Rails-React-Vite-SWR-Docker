class Produto::CategoriaController < ApplicationController
  before_action :set_produto_categoria, only: %i[ show update destroy ]

  # GET /produto/categoria
  # GET /produto/categoria.json
  def index
    @produto_categoria = Produto::Categoria.all
    render json: @produto_categoria
  end

  # GET /produto/categoria/1
  # GET /produto/categoria/1.json
  def show
  end

  # POST /produto/categoria
  # POST /produto/categoria.json
  def create
    @produto_categoria = Produto::Categoria.new(produto_categoria_params)

    if @produto_categoria.save
      render :show, status: :created, location: @produto_categoria
    else
      render json: @produto_categoria.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /produto/categoria/1
  # PATCH/PUT /produto/categoria/1.json
  def update
    if @produto_categoria.update(produto_categoria_params)
      render :show, status: :ok, location: @produto_categoria
    else
      render json: @produto_categoria.errors, status: :unprocessable_entity
    end
  end

  # DELETE /produto/categoria/1
  # DELETE /produto/categoria/1.json
  def destroy
    @produto_categoria.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_produto_categoria
      @produto_categoria = Produto::Categoria.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def produto_categoria_params
      params.require(:produto_categoria).permit(:nome)
    end
end
