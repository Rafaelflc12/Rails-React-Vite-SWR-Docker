require "test_helper"

class Base::UsuariosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @base_usuario = base_usuarios(:one)
  end

  test "should get index" do
    get base_usuarios_url, as: :json
    assert_response :success
  end

  test "should create base_usuario" do
    assert_difference("Base::Usuario.count") do
      post base_usuarios_url, params: { base_usuario: { email: @base_usuario.email, nome: @base_usuario.nome, password_digest: @base_usuario.password_digest } }, as: :json
    end

    assert_response :created
  end

  test "should show base_usuario" do
    get base_usuario_url(@base_usuario), as: :json
    assert_response :success
  end

  test "should update base_usuario" do
    patch base_usuario_url(@base_usuario), params: { base_usuario: { email: @base_usuario.email, nome: @base_usuario.nome, password_digest: @base_usuario.password_digest } }, as: :json
    assert_response :success
  end

  test "should destroy base_usuario" do
    assert_difference("Base::Usuario.count", -1) do
      delete base_usuario_url(@base_usuario), as: :json
    end

    assert_response :no_content
  end
end
