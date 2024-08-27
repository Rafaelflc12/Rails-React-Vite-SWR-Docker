require "test_helper"

class Produto::CategoriaControllerTest < ActionDispatch::IntegrationTest
  setup do
    @produto_categorium = produto_categoria(:one)
  end

  test "should get index" do
    get produto_categoria_url, as: :json
    assert_response :success
  end

  test "should create produto_categorium" do
    assert_difference("Produto::Categorium.count") do
      post produto_categoria_url, params: { produto_categorium: { nome: @produto_categorium.nome } }, as: :json
    end

    assert_response :created
  end

  test "should show produto_categorium" do
    get produto_categorium_url(@produto_categorium), as: :json
    assert_response :success
  end

  test "should update produto_categorium" do
    patch produto_categorium_url(@produto_categorium), params: { produto_categorium: { nome: @produto_categorium.nome } }, as: :json
    assert_response :success
  end

  test "should destroy produto_categorium" do
    assert_difference("Produto::Categorium.count", -1) do
      delete produto_categorium_url(@produto_categorium), as: :json
    end

    assert_response :no_content
  end
end
