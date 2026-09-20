require "rails_helper"

RSpec.describe Produto::Categoria, type: :model do
  describe "validações" do
    it "é válida com nome" do
      expect(build(:categoria, nome: "Ração")).to be_valid
    end

    it "é inválida sem nome" do
      categoria = build(:categoria, nome: nil)
      expect(categoria).not_to be_valid
      expect(categoria.errors[:nome]).to be_present
    end
  end

  describe "associações" do
    it "tem muitos produtos" do
      expect(described_class.reflect_on_association(:produtos).macro).to eq(:has_many)
    end
  end
end
