import useSWR, { preload } from 'swr'
import { fetchFilteredProdutos, fetchBrands, createProduto } from '../api/produtos'
import type { Produto, AnimalFilter, BrandFilter } from '../types/produto'

interface UseProdutosOptions {
  animal?: AnimalFilter
  brand?: BrandFilter
  q?: string
}

// Fetchers separados
const produtosFetcher = async ([, animal, brand, q]: [string, AnimalFilter, BrandFilter, string | undefined]) => {
  return fetchFilteredProdutos(animal, brand, q)
}

const brandsFetcher = () => Promise.resolve(fetchBrands())

// Preload
preload(['produtos', 'all', 'all', undefined], produtosFetcher)
preload('brands', brandsFetcher)

export function useProdutos(options: UseProdutosOptions = {}) {
  const { animal = 'all', brand = 'all', q } = options

  const key = ['produtos', animal, brand, q] as const

  const { data, error, isLoading, isValidating, mutate } = useSWR<Produto[]>(
    key,
    produtosFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
      keepPreviousData: true,
      fallbackData: [],
    }
  )

  async function addProduto(newProdutoData: Omit<Produto, 'id'>) {
    const created = await createProduto(newProdutoData)

    mutate((current) => {
      if (!current) return [created]

      const matchAnimal = animal === 'all' || created.animal === animal
      const matchBrand = brand === 'all' || created.brand === brand

      if (!matchAnimal || !matchBrand) {
        return current
      }

      return [created, ...current]
    }, false)

    // revalida para garantir consistência
    mutate()
  }

  return {
    produtos: data ?? [],
    isLoading,
    isValidating,
    isError: !!error,
    error,
    mutate,
    addProduto, // ✅ agora funciona
  }
}

export function useBrands() {
  const { data, error, isLoading } = useSWR<string[]>(
    'brands',
    brandsFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
    }
  )

  return {
    brands: data ?? [],
    isLoading,
    isError: !!error,
  }
}