import { ProductForm } from '@/components/produtos/ProdutoForm'
import ProdutoGrid from '@/components/produtos/ProdutoGrid'
import { useProdutos } from '@/hooks/useProdutos'
import { useTransition } from 'react'


export function ProductsPage() {
    const [isPending] = useTransition()

  const { produtos, isLoading, addProduto } = useProdutos()
  const showLoading = isLoading && !isPending

  return (
 <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-6xl mx-auto space-y-10">

      <h1 className="text-3xl font-bold text-gray-800">
        Produtos
      </h1>

      <ProductForm onSubmit={addProduto} />

      {/* LISTA DE PRODUTOS */}
      <ProdutoGrid produtos={produtos} isLoading={showLoading} />

    </div>
  </div>

  
  )
}