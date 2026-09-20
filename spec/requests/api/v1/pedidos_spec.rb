require "rails_helper"

RSpec.describe "Api::V1::Pedidos", type: :request do
  describe "POST /api/v1/pedidos" do
    it "cria um pedido" do
      usuario = create(:usuario)

      post "/api/v1/pedidos",
           params: { pedido: { base_usuarios_id: usuario.id, status: "aberto" } },
           as: :json

      expect(response).to have_http_status(:created)
    end
  end
end
