require "rails_helper"

RSpec.describe Base::Usuario, type: :model do
  describe "validações" do
    it "é válido com email e senha" do
      expect(build(:usuario)).to be_valid
    end

    it "é inválido sem email" do
      usuario = build(:usuario, email: nil)
      expect(usuario).not_to be_valid
      expect(usuario.errors[:email]).to be_present
    end

    it "não permite emails duplicados" do
      create(:usuario, email: "duplicado@example.com")
      expect(build(:usuario, email: "duplicado@example.com")).not_to be_valid
    end
  end

  describe "autenticação" do
    it "autentica com a senha correta" do
      usuario = create(:usuario, password: "secreta123")
      expect(usuario.authenticate("secreta123")).to eq(usuario)
    end

    it "rejeita senha incorreta" do
      usuario = create(:usuario, password: "secreta123")
      expect(usuario.authenticate("errada")).to be false
    end
  end
end
