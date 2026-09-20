import { useState } from 'react'
import { Produto } from '@/types/produto'

interface Props {
  onSubmit: (data: Omit<Produto, 'id'>) => void
}

export function ProductForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Omit<Produto, 'id'>>({
    nome: '',
    brand: '',
    animal: 'dog',
    preco: 0,
    originalPrice: undefined,
    weight: '',
    image: '',
    descricao: '',
    rating: 0,
    estoque: 0
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: name === 'preco' || name === 'rating' || name === 'estoque'
        ? Number(value)
        : value
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome" onChange={handleChange} />
      <input name="brand" placeholder="Marca" onChange={handleChange} />

      <select name="animal" onChange={handleChange}>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
        <option value="fish">Fish</option>
        <option value="rodent">Rodent</option>
      </select>

      <input name="preco" type="number" placeholder="Preço" onChange={handleChange} />
      <input name="weight" placeholder="Peso" onChange={handleChange} />
      <input name="image" placeholder="Imagem URL" onChange={handleChange} />
      <input name="descricao" placeholder="Descrição" onChange={handleChange} />
      <input name="rating" type="number" onChange={handleChange} />
      <input name="estoque" type="number" onChange={handleChange} />

      <button type="submit">Criar Produto</button>
    </form>
  )
}