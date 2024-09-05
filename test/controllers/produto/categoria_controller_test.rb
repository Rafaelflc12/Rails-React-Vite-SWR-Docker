require "test_helper"

class Produto::CategoriaControllerTest < ActionDispatch::IntegrationTest
  setup do
    @produto_categoria = produto_categoria(:one)
  end

  test "should get index" do
    get produto_categoria_url, as: :json
    assert_response :success
  end

  test "should create produto_categoria" do
    assert_difference("Produto::Categoria.count") do
      post produto_categoria_url, params: { produto_categoria: { nome: @produto_categoria.nome } }, as: :json
    end

    assert_response :created
  end

  test "should show produto_categoria" do
    get produto_categoria_url(@produto_categoria), as: :json
    assert_response :success
  end

  test "should update produto_categoria" do
    patch produto_categoria_url(@produto_categoria), params: { produto_categoria: { nome: @produto_categoria.nome } }, as: :json
    assert_response :success
  end

  test "should destroy produto_categoria" do
    assert_difference("Produto::Categoria.count", -1) do
      delete produto_categoria_url(@produto_categoria), as: :json
    end

    assert_response :no_content
  end
end
