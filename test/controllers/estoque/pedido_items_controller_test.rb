require "test_helper"

class Estoque::PedidoItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @estoque_pedido_item = estoque_pedido_items(:one)
  end

  test "should get index" do
    get estoque_pedido_items_url, as: :json
    assert_response :success
  end

  test "should create estoque_pedido_item" do
    assert_difference("Estoque::PedidoItem.count") do
      post estoque_pedido_items_url, params: { estoque_pedido_item: { estoque_pedidos_id: @estoque_pedido_item.estoque_pedidos_id, preco: @estoque_pedido_item.preco, produto_produtos_id: @estoque_pedido_item.produto_produtos_id, quantidade: @estoque_pedido_item.quantidade } }, as: :json
    end

    assert_response :created
  end

  test "should show estoque_pedido_item" do
    get estoque_pedido_item_url(@estoque_pedido_item), as: :json
    assert_response :success
  end

  test "should update estoque_pedido_item" do
    patch estoque_pedido_item_url(@estoque_pedido_item), params: { estoque_pedido_item: { estoque_pedidos_id: @estoque_pedido_item.estoque_pedidos_id, preco: @estoque_pedido_item.preco, produto_produtos_id: @estoque_pedido_item.produto_produtos_id, quantidade: @estoque_pedido_item.quantidade } }, as: :json
    assert_response :success
  end

  test "should destroy estoque_pedido_item" do
    assert_difference("Estoque::PedidoItem.count", -1) do
      delete estoque_pedido_item_url(@estoque_pedido_item), as: :json
    end

    assert_response :no_content
  end
end
