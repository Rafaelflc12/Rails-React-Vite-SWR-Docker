import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/cart-context'
import { formatCurrency } from '../lib/utils'

export default function CartPage() {
  const { items, totalItens, totalPreco, updateQuantidade, removeItem, clear } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-16">
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Seu carrinho está vazio
          </h1>
          <p className="text-muted-foreground mb-6">
            Adicione produtos do catálogo para começar.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Carrinho</h1>
        <button
          onClick={clear}
          className="text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          Limpar carrinho
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Itens */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ produto, quantidade }) => (
            <div
              key={produto.id}
              className="flex gap-4 bg-card border border-border rounded-xl p-4"
            >
              <img
                src={produto.image}
                alt={produto.nome}
                className="w-24 h-24 object-cover rounded-lg bg-secondary flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-primary uppercase">
                  {produto.brand}
                </span>
                <h3 className="font-semibold text-foreground line-clamp-1">{produto.nome}</h3>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(produto.preco)} / un.
                </span>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQuantidade(produto.id, quantidade - 1)}
                    aria-label="Diminuir quantidade"
                    className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium w-8 text-center">{quantidade}</span>
                  <button
                    onClick={() => updateQuantidade(produto.id, quantidade + 1)}
                    aria-label="Aumentar quantidade"
                    className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(produto.id)}
                  aria-label="Remover item"
                  className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className="font-semibold text-foreground">
                  {formatCurrency(produto.preco * quantidade)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="bg-card border border-border rounded-xl p-6 h-fit">
          <h2 className="font-semibold text-foreground mb-4">Resumo</h2>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Itens</span>
            <span>{totalItens}</span>
          </div>
          <div className="flex justify-between font-semibold text-foreground text-lg border-t border-border pt-4 mt-4">
            <span>Total</span>
            <span>{formatCurrency(totalPreco)}</span>
          </div>
          <button
            disabled
            className="mt-6 w-full py-3 rounded-lg bg-secondary text-muted-foreground cursor-not-allowed"
          >
            Finalizar compra
          </button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Checkout em breve.
          </p>
        </div>
      </div>
    </div>
  )
}
