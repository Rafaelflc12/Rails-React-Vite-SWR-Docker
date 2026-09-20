require "rails_helper"

RSpec.describe "Api::V1::PedidoItems", type: :request do
  describe "POST /api/v1/pedido_items" do
    it "cria um item de pedido" do
      pedido = create(:pedido)
      produto = create(:produto)

      post "/api/v1/pedido_items",
           params: { pedido_item: { estoque_pedidos_id: pedido.id, produto_produtos_id: produto.id, quantidade: 2,
                                    preco: 10.0 } },
           as: :json

      expect(response).to have_http_status(:created)
    end
  end
end
