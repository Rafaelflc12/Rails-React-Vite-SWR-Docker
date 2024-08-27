-- Criar um banco de dados
CREATE DATABASE chiara_system;

-- Usar o banco de dados criado
\c chiara_system;

-- Criar tabelas e outras estruturas de banco de dados
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Verifica se o usuário 'rafael' já existe antes de criar
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'rafael') THEN
        CREATE USER rafael WITH SUPERUSER PASSWORD 'sua_senha';
    END IF;
END $$;

-- Conceder permissões ao usuário
GRANT ALL PRIVILEGES ON DATABASE chiara_system TO rafael;