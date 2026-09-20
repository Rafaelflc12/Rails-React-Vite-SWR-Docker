require "rails_helper"

RSpec.describe "Api::V1::Categorias", type: :request do
  describe "GET /api/v1/categorias" do
    it "retorna a lista de categorias" do
      create(:categoria)

      get "/api/v1/categorias"

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.size).to eq(1)
    end
  end

  describe "POST /api/v1/categorias" do
    it "cria uma categoria" do
      post "/api/v1/categorias", params: { categoria: { nome: "Ração" } }, as: :json

      expect(response).to have_http_status(:created)
    end

    it "retorna 422 sem nome" do
      post "/api/v1/categorias", params: { categoria: { nome: nil } }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
