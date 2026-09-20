require "rails_helper"

RSpec.describe Estoque::Pedido, type: :model do
  it "é válido com um usuário" do
    expect(build(:pedido)).to be_valid
  end

  it "pertence a um usuário" do
    expect(described_class.reflect_on_association(:usuario).macro).to eq(:belongs_to)
  end
end
