require "test_helper"

class Produto::ProdutosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @produto_produto = produto_produtos(:one)
  end

  test "should get index" do
    get produto_produtos_url, as: :json
    assert_response :success
  end

  test "should create produto_produto" do
    assert_difference("Produto::Produto.count") do
      post produto_produtos_url, params: { produto_produto: { descricao: @produto_produto.descricao, estoque: @produto_produto.estoque, nome: @produto_produto.nome, preco: @produto_produto.preco, produto_categoria_id: @produto_produto.produto_categoria_id } }, as: :json
    end

    assert_response :created
  end

  test "should show produto_produto" do
    get produto_produto_url(@produto_produto), as: :json
    assert_response :success
  end

  test "should update produto_produto" do
    patch produto_produto_url(@produto_produto), params: { produto_produto: { descricao: @produto_produto.descricao, estoque: @produto_produto.estoque, nome: @produto_produto.nome, preco: @produto_produto.preco, produto_categoria_id: @produto_produto.produto_categoria_id } }, as: :json
    assert_response :success
  end

  test "should destroy produto_produto" do
    assert_difference("Produto::Produto.count", -1) do
      delete produto_produto_url(@produto_produto), as: :json
    end

    assert_response :no_content
  end
end
