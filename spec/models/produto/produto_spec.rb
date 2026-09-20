require "rails_helper"

RSpec.describe Produto::Produto, type: :model do
  describe "validações" do
    it "é válido com os atributos padrão" do
      expect(build(:produto)).to be_valid
    end

    it "é inválido sem nome" do
      produto = build(:produto, nome: nil)
      expect(produto).not_to be_valid
      expect(produto.errors[:nome]).to be_present
    end

    it "valida animal dentro da lista permitida" do
      expect(build(:produto, animal: "dog")).to be_valid
      expect(build(:produto, animal: "dragon")).not_to be_valid
    end

    it "permite animal nulo" do
      expect(build(:produto, animal: nil)).to be_valid
    end
  end

  describe "associações" do
    it "pertence a uma categoria (opcional)" do
      assoc = described_class.reflect_on_association(:categoria)
      expect(assoc.macro).to eq(:belongs_to)
      expect(assoc.options[:optional]).to be true
    end
  end
end
