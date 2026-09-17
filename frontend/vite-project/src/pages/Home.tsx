import { useState, useTransition } from 'react'
import { Link } from 'react-router-dom'
import { useProdutos, useBrands } from '../hooks/useProdutos'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/produtos/ProdutoGrid'
import type { AnimalFilter, BrandFilter } from '../types/produto'
import { Check, Truck, Headphones } from 'lucide-react'

export default function Home() {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalFilter>('all')
  const [selectedBrand, setSelectedBrand] = useState<BrandFilter>('all')
  const [isPending, startTransition] = useTransition()

  const { produtos, isLoading, isValidating } = useProdutos({
    animal: selectedAnimal,
    brand: selectedBrand,
  })
  const { brands } = useBrands()

  // Handlers com useTransition para filtros mais fluidos
  const handleAnimalChange = (animal: AnimalFilter) => {
    startTransition(() => {
      setSelectedAnimal(animal)
    })
  }

  const handleBrandChange = (brand: BrandFilter) => {
    startTransition(() => {
      setSelectedBrand(brand)
    })
  }

  // Mostrar loading apenas no carregamento inicial, não durante transições
  const showLoading = isLoading && !isPending

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-medium text-primary mb-3 tracking-wide uppercase">
              Bem-vindo à PetNutri
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
              Nutrição Premium para o seu Melhor Amigo
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Descubra nossa seleção de rações de alta qualidade, 
              formuladas para proporcionar saúde e vitalidade ao seu pet.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">Gerenciar Produtos</Link>
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ver Catálogo
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-accent/10 to-transparent hidden lg:block" />
      </section>

      {/* Catalog Section */}
      <section id="catalogo" className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Nosso Catálogo
            </h2>
            <p className="mt-2 text-muted-foreground">
              {produtos.length} produtos disponíveis
            </p>
          </div>

          <FilterBar
            selectedAnimal={selectedAnimal}
            selectedBrand={selectedBrand}
            brands={brands}
            onAnimalChange={handleAnimalChange}
            onBrandChange={handleBrandChange}
            isFiltering={isPending || isValidating}
          />

          <ProductGrid produtos={produtos} isLoading={showLoading} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Check className="w-6 h-6" />}
              title="Qualidade Garantida"
              description="Trabalhamos apenas com as melhores marcas do mercado pet."
            />
            <FeatureCard
              icon={<Truck className="w-6 h-6" />}
              title="Entrega Rápida"
              description="Receba seus produtos em até 24h para a região metropolitana."
            />
            <FeatureCard
              icon={<Headphones className="w-6 h-6" />}
              title="Suporte Especializado"
              description="Nossa equipe está pronta para ajudar na escolha ideal."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

// Componente auxiliar para features
function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
