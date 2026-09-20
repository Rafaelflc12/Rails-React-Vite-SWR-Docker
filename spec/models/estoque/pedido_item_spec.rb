require "rails_helper"

RSpec.describe Estoque::PedidoItem, type: :model do
  it "é válido com pedido e produto" do
    expect(build(:pedido_item)).to be_valid
  end

  it "pertence a um pedido e a um produto" do
    expect(described_class.reflect_on_association(:pedido).macro).to eq(:belongs_to)
    expect(described_class.reflect_on_association(:produto).macro).to eq(:belongs_to)
  end
end
