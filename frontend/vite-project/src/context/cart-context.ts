import { createContext, useContext } from 'react'
import type { Produto } from '../types/produto'

export interface CartItem {
  produto: Produto
  quantidade: number
}

export interface CartContextValue {
  items: CartItem[]
  totalItens: number
  totalPreco: number
  addItem: (produto: Produto) => void
  removeItem: (produtoId: number) => void
  updateQuantidade: (produtoId: number, quantidade: number) => void
  clear: () => void
}

// Contexto separado do Provider para permitir Fast Refresh
// (arquivo só com constantes/tipos/hook, sem componente).
export const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart deve ser usado dentro de <CartProvider>')
  }
  return ctx
}
