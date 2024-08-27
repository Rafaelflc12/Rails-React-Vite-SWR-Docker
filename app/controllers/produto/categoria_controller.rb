class Produto::CategoriaController < ApplicationController
  before_action :set_produto_categorium, only: %i[ show update destroy ]

  # GET /produto/categoria
  # GET /produto/categoria.json
  def index
    @produto_categoria = Produto::Categorium.all
  end

  # GET /produto/categoria/1
  # GET /produto/categoria/1.json
  def show
  end

  # POST /produto/categoria
  # POST /produto/categoria.json
  def create
    @produto_categorium = Produto::Categorium.new(produto_categorium_params)

    if @produto_categorium.save
      render :show, status: :created, location: @produto_categorium
    else
      render json: @produto_categorium.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /produto/categoria/1
  # PATCH/PUT /produto/categoria/1.json
  def update
    if @produto_categorium.update(produto_categorium_params)
      render :show, status: :ok, location: @produto_categorium
    else
      render json: @produto_categorium.errors, status: :unprocessable_entity
    end
  end

  # DELETE /produto/categoria/1
  # DELETE /produto/categoria/1.json
  def destroy
    @produto_categorium.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_produto_categorium
      @produto_categorium = Produto::Categorium.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def produto_categorium_params
      params.require(:produto_categorium).permit(:nome)
    end
end
