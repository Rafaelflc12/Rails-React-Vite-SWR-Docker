import ProdutoCard from './ProdutoCard'
import ProductSkeleton from './ProductSkeleton'
import type { Produto } from '../../types/produto'

interface ProdutoGridProps {
  produtos: Produto[]
  isLoading: boolean
}

export default function ProdutoGrid({ produtos, isLoading }: ProdutoGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (produtos.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-muted-foreground">
          Nenhum produto encontrado com os filtros selecionados.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {produtos.map((produto) => (
        <ProdutoCard key={produto.id} produto={produto} />
      ))}
    </div>
  )
}
