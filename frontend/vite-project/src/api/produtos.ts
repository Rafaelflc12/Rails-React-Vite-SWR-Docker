import type { Produto, AnimalFilter, BrandFilter } from '../types/produto'

// Base URL da API (configurável via VITE_API_BASE_URL no .env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

// Cliente HTTP com tratamento de erros padronizado
async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// GET /api/v1/produtos
export async function fetchProdutos(): Promise<Produto[]> {
  return apiClient<Produto[]>('/produtos')
}

// GET /api/v1/produtos/:id
export async function fetchProdutoById(id: number): Promise<Produto | null> {
  try {
    return await apiClient<Produto>(`/produtos/${id}`)
  } catch {
    return null
  }
}

// GET /api/v1/produtos?animal=dog&brand=...
export async function fetchFilteredProdutos(
  animal?: AnimalFilter,
  brand?: BrandFilter,
  q?: string,
): Promise<Produto[]> {
  const params = new URLSearchParams()
  if (animal && animal !== 'all') params.set('animal', animal)
  if (brand && brand !== 'all') params.set('brand', brand)
  if (q && q.trim()) params.set('q', q.trim())
  const query = params.toString()
  return apiClient<Produto[]>(`/produtos${query ? `?${query}` : ''}`)
}

// GET /api/v1/produtos/brands
export async function fetchBrands(): Promise<string[]> {
  return apiClient<string[]>('/produtos/brands')
}

type CreateProdutoDTO = Omit<Produto, 'id'>

export async function createProduto(data: CreateProdutoDTO): Promise<Produto> {
  return apiClient<Produto>('/produtos', {
    method: 'POST',
    body: JSON.stringify({ produto: data }),
  })
}
