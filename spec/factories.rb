# Factories do FactoryBot. Os models são namespaced, então cada factory aponta
# explicitamente para a classe correta.
FactoryBot.define do
  factory :categoria, class: "Produto::Categoria" do
    nome { "Ração" }
  end

  factory :produto, class: "Produto::Produto" do
    nome { "Ração Premium" }
    preco { 120.0 }
    animal { "dog" }
    categoria
  end

  factory :usuario, class: "Base::Usuario" do
    nome { "Rafael" }
    sequence(:email) { |n| "usuario#{n}@example.com" }
    password { "password123" }
  end

  factory :pedido, class: "Estoque::Pedido" do
    usuario
    status { "aberto" }
  end

  factory :pedido_item, class: "Estoque::PedidoItem" do
    pedido
    produto
    quantidade { 1 }
    preco { 120.0 }
  end
end
