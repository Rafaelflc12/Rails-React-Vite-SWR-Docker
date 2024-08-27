// src/types/Categoria.ts
export interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    estoque: string;
    produto_categoria: string;
    created_at: string;
    updated_at: string;
}
// src/types/Pedido.ts
export interface Pedido {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    estoque: string;
    produto_categoria: string;
    created_at: string;
    updated_at: string;
}
// src/types/Produto.ts
export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    estoque: string;
    produto_categoria_id: string;
    created_at: string;
    updated_at: string;
}
// src/types/Usuario.ts
export interface Usuario {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    estoque: string;
    produto_categoria: string;
    created_at: string;
    updated_at: string;
}