import type { Produto, AnimalFilter, BrandFilter } from '../types/produto'

// =============================================================================
// API CLIENT - Configuração para comunicação com Rails via Nginx
// =============================================================================

const API_BASE_URL =  '/api/produto'

// Cliente HTTP com tratamento de erros padronizado
async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}


// =============================================================================
// API FUNCTIONS - Use em produção com Rails real
// =============================================================================


/**
 * GET /api/v1/products
 * Retorna todos os produtos
 */
export async function fetchProdutos(): Promise<Produto[]> {

  return apiClient<Produto[]>('/produtos')

  
}

/**
 * GET /api/v1/products/:id
 * Retorna um produto por ID
 */
export async function fetchProdutoById(id: number): Promise<Produto | null> {

  try {
    return await apiClient<Produto>(`/produtos/${id}`)
  } catch {
    return null
  }
  

}

/**
 * GET /api/v1/products?animal=dog&brand=Royal%20Canin
 * Retorna produtos filtrados
 */
export async function fetchFilteredProdutos(
  animal?: AnimalFilter,
  brand?: BrandFilter
): Promise<Produto[]> {

  const params = new URLSearchParams()
  if (animal && animal !== 'all') params.set('animal', animal)
  if (brand && brand !== 'all') params.set('brand', brand)
  const query = params.toString()
  return apiClient<Produto[]>(`/produtos${query ? `?${query}` : ''}`)



}

/**
 * Extrai marcas únicas para o filtro
 * Em produção: GET /api/v1/brands
 */
export async function fetchBrands(): Promise<string[]> {

  return apiClient<string[]>('/brands') 

}


type CreateProdutoDTO = Omit<Produto, 'id'>

export async function createProduto(data: CreateProdutoDTO): Promise<Produto> {
  return apiClient<Produto>('/produtos', {
    method: 'POST',
    body: JSON.stringify({
      produto: data // 🔥 importante para Rails
    })
  })
}
