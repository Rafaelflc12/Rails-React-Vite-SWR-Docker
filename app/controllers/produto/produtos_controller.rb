class Produto::ProdutosController < ApplicationController
  before_action :set_produto_produto, only: %i[ show update destroy ]

  # GET /produto/produtos
  # GET /produto/produtos.json
  def index
    @produto_produtos = Produto::Produto.all

    render json: @produto_produtos
  end

  # GET /produto/produtos/1
  # GET /produto/produtos/1.json
  def show
    render json: @produto_produto.to_json
  end

  # POST /produto/produtos
  # POST /produto/produtos.json
  def create
    @produto_produto = Produto::Produto.new(produto_produto_params)

    if @produto_produto.save
      render :show, status: :created, location: @produto_produto
    else
      render json: @produto_produto.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /produto/produtos/1
  # PATCH/PUT /produto/produtos/1.json
  def update
    if @produto_produto.update(produto_produto_params)
      render :show, status: :ok, location: @produto_produto
    else
      render json: @produto_produto.errors, status: :unprocessable_entity
    end
  end

  # DELETE /produto/produtos/1
  # DELETE /produto/produtos/1.json
  def destroy
    @produto_produto.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_produto_produto
      @produto_produto = Produto::Produto.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def produto_produto_params
      params.require(:produto_produto).permit(:nome, :descricao, :preco, :estoque, :produto_categoria_id)
    end
end
