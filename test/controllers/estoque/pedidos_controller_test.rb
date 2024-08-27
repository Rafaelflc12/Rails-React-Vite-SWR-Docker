require "test_helper"

class Estoque::PedidosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @estoque_pedido = estoque_pedidos(:one)
  end

  test "should get index" do
    get estoque_pedidos_url, as: :json
    assert_response :success
  end

  test "should create estoque_pedido" do
    assert_difference("Estoque::Pedido.count") do
      post estoque_pedidos_url, params: { estoque_pedido: { base_usuarios_id: @estoque_pedido.base_usuarios_id, preco_total: @estoque_pedido.preco_total, status: @estoque_pedido.status } }, as: :json
    end

    assert_response :created
  end

  test "should show estoque_pedido" do
    get estoque_pedido_url(@estoque_pedido), as: :json
    assert_response :success
  end

  test "should update estoque_pedido" do
    patch estoque_pedido_url(@estoque_pedido), params: { estoque_pedido: { base_usuarios_id: @estoque_pedido.base_usuarios_id, preco_total: @estoque_pedido.preco_total, status: @estoque_pedido.status } }, as: :json
    assert_response :success
  end

  test "should destroy estoque_pedido" do
    assert_difference("Estoque::Pedido.count", -1) do
      delete estoque_pedido_url(@estoque_pedido), as: :json
    end

    assert_response :no_content
  end
end
