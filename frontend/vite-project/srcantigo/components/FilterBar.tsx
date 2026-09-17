import { Dog, Cat, Bird, Fish, Loader2 } from 'lucide-react'
import type { AnimalFilter, BrandFilter } from '../types/product'
import { getAnimalLabel, cn } from '../lib/utils'

interface FilterBarProps {
  selectedAnimal: AnimalFilter
  selectedBrand: BrandFilter
  brands: string[]
  onAnimalChange: (animal: AnimalFilter) => void
  onBrandChange: (brand: BrandFilter) => void
  isFiltering?: boolean
}

const animalFilters: { value: AnimalFilter; icon: typeof Dog }[] = [
  { value: 'all', icon: Dog },
  { value: 'dog', icon: Dog },
  { value: 'cat', icon: Cat },
  { value: 'bird', icon: Bird },
  { value: 'fish', icon: Fish },
]

export default function FilterBar({
  selectedAnimal,
  selectedBrand,
  brands,
  onAnimalChange,
  onBrandChange,
  isFiltering = false,
}: FilterBarProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-8 relative">
      {/* Loading Overlay */}
      {isFiltering && (
        <div className="absolute inset-0 bg-card/50 backdrop-blur-[1px] rounded-xl flex items-center justify-center z-10">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        </div>
      )}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Animal Filter */}
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Tipo de Animal
          </label>
          <div className="flex flex-wrap gap-2">
            {animalFilters.map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onAnimalChange(value)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  selectedAnimal === value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                <Icon className="w-4 h-4" />
                {getAnimalLabel(value)}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="lg:w-64">
          <label
            htmlFor="brand-filter"
            className="text-sm font-medium text-foreground mb-2 block"
          >
            Marca
          </label>
          <select
            id="brand-filter"
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full px-4 py-2 bg-secondary border border-transparent rounded-lg text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="all">Todas as marcas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
