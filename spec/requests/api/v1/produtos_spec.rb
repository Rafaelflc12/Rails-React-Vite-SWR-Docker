require "rails_helper"

RSpec.describe "Api::V1::Produtos", type: :request do
  describe "GET /api/v1/produtos" do
    it "retorna a lista de produtos" do
      create_list(:produto, 3)
      get "/api/v1/produtos"

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.size).to eq(3)
    end

    it "filtra por animal" do
      create(:produto, animal: "dog")
      create(:produto, animal: "cat")

      get "/api/v1/produtos", params: { animal: "dog" }

      expect(response.parsed_body.size).to eq(1)
      expect(response.parsed_body.first["animal"]).to eq("dog")
    end
  end

  describe "GET /api/v1/produtos/brands" do
    it "retorna as marcas distintas ordenadas" do
      create(:produto, brand: "Pedigree")
      create(:produto, brand: "Whiskas")

      get "/api/v1/produtos/brands"

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body).to eq(%w[Pedigree Whiskas])
    end
  end

  describe "GET /api/v1/produtos/:id" do
    it "retorna o produto" do
      produto = create(:produto)

      get "/api/v1/produtos/#{produto.id}"

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body["nome"]).to eq(produto.nome)
    end

    it "retorna 404 para produto inexistente" do
      get "/api/v1/produtos/999999"

      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /api/v1/produtos" do
    it "cria um produto com atributos válidos" do
      expect do
        post "/api/v1/produtos", params: { produto: { nome: "Ração", preco: 50.0 } }, as: :json
      end.to change(Produto::Produto, :count).by(1)

      expect(response).to have_http_status(:created)
    end

    it "retorna 422 com atributos inválidos" do
      post "/api/v1/produtos", params: { produto: { nome: nil } }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.parsed_body["errors"]).to be_present
    end
  end
end
