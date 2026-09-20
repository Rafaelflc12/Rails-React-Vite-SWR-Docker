import { Star, ShoppingCart } from 'lucide-react'
import type { Produto } from '../../types/produto'
import { formatCurrency, getAnimalLabel, cn } from '../../lib/utils'
import { useCart } from '../../context/cart-context'

interface ProdutoCardProps {
  produto: Produto
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
  const { addItem } = useCart()

  const discount = produto.original_price
    ? Math.round(((produto.original_price - produto.preco) / produto.original_price) * 100)
    : 0

  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={produto.image}
          alt={produto.nome}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}
        {!produto.estoque && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">
              Indisponível
            </span>
          </div>
        )}
        <span className="absolute top-3 right-3 bg-card/90 backdrop-blur text-xs font-medium px-2 py-1 rounded-md text-muted-foreground">
          {getAnimalLabel(produto.animal)}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <span className="text-xs font-medium text-primary uppercase tracking-wide">
          {produto.brand}
        </span>

        {/* Name */}
        <h3 className="mt-1 font-semibold text-foreground line-clamp-2 leading-tight text-balance">
          {produto.nome}
        </h3>

        {/* Weight */}
        <span className="text-xs text-muted-foreground mt-1 block">
          {produto.weight}
        </span>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium text-foreground">{produto.rating}</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-end gap-2">
          <span className="text-xl font-bold text-foreground">
            {formatCurrency(produto.preco)}
          </span>
          {produto.original_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(produto.original_price)}
            </span>
          )}
        </div>

        {/* Button */}
        <button
          disabled={!produto.estoque}
          onClick={() => addItem(produto)}
          className={cn(
            'mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all',
            produto.estoque
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]'
              : 'bg-secondary text-muted-foreground cursor-not-allowed'
          )}
        >
          <ShoppingCart className="w-4 h-4" />
          {produto.estoque ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </button>
      </div>
    </article>
  )
}
