import { Star, ShoppingCart } from 'lucide-react'
import type { Produto } from '../types/types'
import { formatCurrency, getAnimalLabel, cn } from '../lib/utils'

interface ProductCardProps {
  product: Produto
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.preco
    ? Math.round(((Number(product.preco) - Number(product.preco)) / Number(product.preco)) * 100)
    : 0

  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">
              Indisponível
            </span>
          </div>
        )}
        <span className="absolute top-3 right-3 bg-card/90 backdrop-blur text-xs font-medium px-2 py-1 rounded-md text-muted-foreground">
          {getAnimalLabel(product.animal)}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <span className="text-xs font-medium text-primary uppercase tracking-wide">
          {product.brand}
        </span>

        {/* Name */}
        <h3 className="mt-1 font-semibold text-foreground line-clamp-2 leading-tight text-balance">
          {product.name}
        </h3>

        {/* Weight */}
        <span className="text-xs text-muted-foreground mt-1 block">
          {product.weight}
        </span>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-end gap-2">
          <span className="text-xl font-bold text-foreground">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Button */}
        <button
          disabled={!product.inStock}
          className={cn(
            'mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all',
            product.inStock
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]'
              : 'bg-secondary text-muted-foreground cursor-not-allowed'
          )}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </button>
      </div>
    </article>
  )
}
