require "rails_helper"

RSpec.describe "Api::V1::Usuarios", type: :request do
  describe "POST /api/v1/usuarios" do
    it "cria um usuário com senha" do
      post "/api/v1/usuarios",
           params: { usuario: { nome: "Rafael", email: "rafael@example.com", password: "secreta" } },
           as: :json

      expect(response).to have_http_status(:created)
      expect(Base::Usuario.last.authenticate("secreta")).to be_truthy
    end

    it "retorna 422 sem email" do
      post "/api/v1/usuarios", params: { usuario: { email: nil } }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
