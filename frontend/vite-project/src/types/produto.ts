export interface Produto {
  id: number
  nome: string
  brand: string
  animal: 'dog' | 'cat' | 'bird' | 'fish' | 'rodent'
  preco: number
  originalPrice?: number
  weight: string
  image: string
  descricao: string
  rating: number
  estoque: number
}

export type AnimalFilter = 'all' | Produto['animal']
export type BrandFilter = string | 'all'
