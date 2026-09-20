import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Produto } from '../types/produto'
import { CartContext } from './cart-context'
import type { CartItem } from './cart-context'

const STORAGE_KEY = 'petnutri:carrinho'

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as CartItem[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)

  // Persiste no localStorage a cada mudança, para o carrinho sobreviver ao reload.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage indisponível (ex.: modo privado) — o carrinho segue só em memória
    }
  }, [items])

  function addItem(produto: Produto) {
    setItems((current) => {
      const existing = current.find((item) => item.produto.id === produto.id)
      if (existing) {
        return current.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        )
      }
      return [...current, { produto, quantidade: 1 }]
    })
  }

  function removeItem(produtoId: number) {
    setItems((current) => current.filter((item) => item.produto.id !== produtoId))
  }

  function updateQuantidade(produtoId: number, quantidade: number) {
    if (quantidade <= 0) {
      removeItem(produtoId)
      return
    }
    setItems((current) =>
      current.map((item) =>
        item.produto.id === produtoId ? { ...item, quantidade } : item,
      ),
    )
  }

  function clear() {
    setItems([])
  }

  const totalItens = items.reduce((acc, item) => acc + item.quantidade, 0)
  const totalPreco = items.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0,
  )

  return (
    <CartContext.Provider
      value={{ items, totalItens, totalPreco, addItem, removeItem, updateQuantidade, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}
